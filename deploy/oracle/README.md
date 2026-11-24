# Hosting the hub and apps on Oracle Cloud

One Always Free VM serves everything over plain HTTP on the server's IP address:

| URL | What |
|---|---|
| `http://<ip>/` | Hub page (`hub/index.html`) |
| `http://<ip>/portfolio/` | Portfolio (`vishwadeep_2024`, built with Vite) |
| `http://<ip>/traffic-sandbox/` | Traffic Sandbox |
| `http://<ip>/private-commit-heatmap/` | Private Commit Heatmap |
| `http://<ip>/india-livability-index/` | India City Livability Index |
| `http://<ip>/group-wants-to-guess/` | The Group Wants to Guess |

## Files

- `cloud-init.sh`: paste it into the VM's cloud-init box. On first boot it clones this repo to `/opt/sites-kit` and runs `setup.sh`.
- `setup.sh`: one-time install (Caddy, git, Node 20, firewall), the first deploy, and a timer that runs `update.sh` every 10 minutes.
- `update.sh`: refreshes this kit from GitHub, then runs `deploy.sh`. **This means a push to any site's repo goes live within about 10 minutes, with no SSH needed.**
- `deploy.sh`: pulls every repo in `sites.conf`, rebuilds only the ones with new commits, and swaps them into `/srv/sites`.
- `sites.conf`: the list of sites. One line per app.
- `Caddyfile`: the web server config.
- `hub/index.html`: the hub page.

> Until the `apps-hub` PR is merged, the portfolio is served from `main`, whose internal links point at `/` instead of `/portfolio/`. Merging fixes it on the next timer run.

## 1. Create the VM

1. Sign in at cloud.oracle.com. Go to **Compute → Instances → Create instance**.
2. **Image:** Canonical Ubuntu 24.04. **Shape:** Ampere `VM.Standard.A1.Flex` with 1 OCPU and 6 GB RAM, which is Always Free. If A1 is out of capacity in your region, `VM.Standard.E2.1.Micro` (AMD) also works.
3. **Networking:** keep the default VCN and **assign a public IPv4 address**.
4. **SSH keys:** upload your public key, or download the generated private key.
5. Create the instance, then copy its **Public IP**.

## 2. Open ports 80 and 443 in Oracle's network

Ports are blocked in two places: the cloud network and the VM's own firewall. `setup.sh` handles the VM. This step handles the cloud.

1. On the instance page, open **Subnet → Security Lists → Default Security List**.
2. **Add Ingress Rules:** source CIDR `0.0.0.0/0`, IP protocol TCP, destination port range `80,443`.

## 3. Install and deploy

When creating the instance, open **Show advanced options → Management → Cloud-init script → Paste cloud-init script** and paste `cloud-init.sh`. Setup runs on first boot and takes about 5 minutes. Then open `http://<ip>/`. The log is at `/var/log/sites-setup.log`.

On a VM that already exists: `ssh ubuntu@<ip>`, then `curl -fsSL https://raw.githubusercontent.com/vishwadeep-solves-conflicts/vishwadeep_2024/main/deploy/oracle/cloud-init.sh | sudo bash`.

## Updating

Nothing to do: the timer redeploys changed sites every 10 minutes. To force it now: `sudo systemctl start sites-deploy`. To rebuild everything: `sudo FORCE=1 /opt/sites-kit/deploy/oracle/deploy.sh`.

To add an app: add a line to `sites.conf`, copy one card in `hub/index.html`, and push to `main`. It's live within 10 minutes.

## Later: a domain and HTTPS

Point an A record at the IP, then replace `:80` in the Caddyfile with the domain. Copy the file to `/etc/caddy/Caddyfile` and run `sudo systemctl reload caddy`. Caddy gets and renews the certificate on its own.

## Troubleshooting

- **Page doesn't load at all:** check the security list rule from step 2, then run `sudo iptables -L INPUT -n --line-numbers` and confirm ports 80 and 443 are ACCEPTed above the REJECT line.
- **Caddy errors:** `sudo journalctl -u caddy -n 50`.
- **A site didn't update:** `sudo journalctl -u sites-deploy -n 50`, and read the `==>` line for that site.
