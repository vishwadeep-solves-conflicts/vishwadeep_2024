#!/usr/bin/env bash
# One-time setup for a fresh Oracle Cloud VM (Ubuntu 22.04/24.04 or Oracle Linux 8/9).
# Installs Caddy, git and Node.js 20, opens ports 80 and 443 in the VM's own
# firewall, installs the Caddyfile, and runs the first deploy.
# Also installs a systemd timer that runs update.sh every 10 minutes, so pushes to
# any site's repo go live on their own.
#   usage: sudo ./setup.sh   (normally run by cloud-init.sh on first boot)
set -euo pipefail
KIT="$(cd "$(dirname "$0")" && pwd)"

# Small shapes (the 1 GB AMD micro) need swap for npm installs and Vite builds.
if [ "$(awk '/MemTotal/ {print $2}' /proc/meminfo)" -lt 3000000 ] && ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q /swapfile /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

if command -v apt-get >/dev/null; then
  export DEBIAN_FRONTEND=noninteractive
  echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
  echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections
  apt-get -o DPkg::Lock::Timeout=600 update -q
  apt-get -o DPkg::Lock::Timeout=600 install -yq debian-keyring debian-archive-keyring apt-transport-https curl gnupg git
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get -o DPkg::Lock::Timeout=600 install -yq caddy nodejs

  # Oracle's Ubuntu images ship iptables rules that reject everything except SSH.
  for port in 80 443; do
    iptables -C INPUT -p tcp --dport $port -j ACCEPT 2>/dev/null || \
      iptables -I INPUT 5 -m state --state NEW -p tcp --dport $port -j ACCEPT
  done
  apt-get -o DPkg::Lock::Timeout=600 install -yq iptables-persistent >/dev/null 2>&1 || true
  netfilter-persistent save || iptables-save > /etc/iptables/rules.v4
elif command -v dnf >/dev/null; then
  dnf install -yq 'dnf-command(copr)' git
  dnf copr enable -yq @caddy/caddy
  dnf module enable -yq nodejs:20 || true
  dnf install -yq caddy nodejs
  firewall-cmd --permanent --add-service=http --add-service=https
  firewall-cmd --reload
else
  echo "Unsupported OS: use Ubuntu or Oracle Linux." >&2; exit 1
fi

install -m 644 "$KIT/Caddyfile" /etc/caddy/Caddyfile
mkdir -p /srv/sites
"$KIT/deploy.sh"
systemctl enable --now caddy
systemctl reload caddy

if [ -d /opt/sites-kit/.git ]; then
  cat > /etc/systemd/system/sites-deploy.service <<UNIT
[Unit]
Description=Pull and deploy the hub and apps
After=network-online.target
[Service]
Type=oneshot
ExecStart=/bin/bash /opt/sites-kit/deploy/oracle/update.sh
UNIT
  cat > /etc/systemd/system/sites-deploy.timer <<UNIT
[Unit]
Description=Deploy the hub and apps every 10 minutes
[Timer]
OnBootSec=2min
OnUnitActiveSec=10min
[Install]
WantedBy=timers.target
UNIT
  systemctl daemon-reload
  systemctl enable --now sites-deploy.timer
fi
echo "Setup finished."
