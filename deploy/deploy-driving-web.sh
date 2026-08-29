#!/usr/bin/env bash
# Deploys the Next.js app (web/) — this now serves PRODUCTION at
# https://driving.feyton.co.rw (nginx -> 127.0.0.1:6002).
#
# Install once: cp to /opt/deploy-scripts/deploy-driving-web.sh && chmod +x
# Production env lives at web/.env.production.local (never in git).
#
# ROLLBACK to the legacy app (still running on :6001):
#   sed -i 's|127.0.0.1:6002|127.0.0.1:6001|' /etc/nginx/sites-available/driving \
#     && nginx -t && systemctl reload nginx
# The legacy app also stays reachable at http://legacy-driving.feyton.co.rw
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

# Health check — fail loudly so a bad deploy is obvious while nginx still points here.
sleep 4
for i in 1 2 3 4 5; do
  if curl -fsS "http://127.0.0.1:$PORT" >/dev/null; then
    echo "driving-web is up on :$PORT (production)"
    exit 0
  fi
  echo "health check attempt $i failed, retrying..."
  sleep 3
done
echo "ERROR: driving-web failed health check on :$PORT"
exit 1
