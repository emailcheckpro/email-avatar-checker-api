import os
import requests

api_key = os.environ["EMAILCHECKPRO_API_KEY"]
base_url = os.getenv("API_BASE_URL", "https://emailcheckpro.com").rstrip("/")
identifier = os.getenv("IDENTIFIER", "user@example.com")
batch = os.getenv("MODE", "single") == "batch"
path = "/api/v1/batch-check" if batch else "/api/v1/check"
payload = {"service_type": "email_avatar", "identifiers": [identifier, "other@example.com"]} if batch else {"service_type": "email_avatar", "identifier": identifier}
timeout = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "330" if batch else "60"))
response = requests.post(f"{base_url}{path}", headers={"X-API-Key": api_key}, json=payload, timeout=timeout)
response.raise_for_status()
result = response.json()
if result.get("code") != 0:
    raise RuntimeError(f"API error: {result}")
print(result)
# In a batch, classify only exists=true items; exists=false is undetermined.
# A network timeout is uncertain: do not blindly repeat a potentially billed request.
