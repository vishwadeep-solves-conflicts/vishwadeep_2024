#!/bin/bash
# Paste this into "Cloud-init script" when creating the Oracle VM.
# It downloads the hosting kit and runs setup.sh on first boot. Log: /var/log/sites-setup.log
exec > /var/log/sites-setup.log 2>&1
set -eux
export DEBIAN_FRONTEND=noninteractive
command -v git || (apt-get -o DPkg::Lock::Timeout=600 update -q && apt-get -o DPkg::Lock::Timeout=600 install -yq git) || dnf install -yq git
git clone -q --depth 1 -b apps-hub https://github.com/vishwadeep-solves-conflicts/vishwadeep_2024 /opt/sites-kit \
  || git clone -q --depth 1 https://github.com/vishwadeep-solves-conflicts/vishwadeep_2024 /opt/sites-kit
bash /opt/sites-kit/deploy/oracle/setup.sh
