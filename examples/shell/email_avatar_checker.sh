#!/usr/bin/env bash
set -euo pipefail
: "${EMAILCHECKPRO_API_KEY:?Set EMAILCHECKPRO_API_KEY}"
curl -fsS -X POST 'https://emailcheckpro.com/api/v1/check' -H "X-API-Key: $EMAILCHECKPRO_API_KEY" -H 'Content-Type: application/json' -d '{"service_type":"email_avatar","identifier":"alex.kim@gmail.com"}'
