#!/usr/bin/env bash
# Deploys the new Next.js app (web/) on the server.
# Install once: cp this file to /opt/deploy-scripts/deploy-driving-web.sh && chmod +x
# Expects /opt/apps/drivingLicence to be the git checkout and web/.env.production.local
# to hold the production env (never in git).
set -euo pipefail

APP_DIR=/opt/apps/drivingLicence
PM2_NAME=driving-web
PORT=6002

cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main

cd web
npm ci --no-audit --no-fund
npm run build

if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME" --update-env
else
  pm2 start npm --name "$PM2_NAME" -- start -- -p "$PORT"
  pm2 save
fi

# Health check
sleep 3
curl -fsS "http://127.0.0.1:$PORT" >/dev/null && echo "driving-web is up on :$PORT"
