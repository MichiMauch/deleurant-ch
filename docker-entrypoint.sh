#!/bin/sh
set -e

if [ ! -f /app/messages/de.json ]; then
  echo "[entrypoint] /app/messages leer — seeding aus /app/messages-seed"
  cp -a /app/messages-seed/. /app/messages/
fi

exec "$@"
