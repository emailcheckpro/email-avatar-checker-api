# Python 3 + requests

From the repository root:

    python3 -m pip install requests
    export EMAILCHECKPRO_API_KEY="YOUR_API_KEY"
    cd examples
    python3 python/email_avatar_checker.py

See [the main README](../../README.md) for request and response details.

## Synchronous batch timeout

Run one single check by default. Set `MODE=batch` for an ordered batch of up to 100 identifiers. Python and Node.js allow 330 seconds for a batch by default (60 seconds for one identifier); set `REQUEST_TIMEOUT_SECONDS` to configure the client. The server’s batch processing window is 300 seconds. `exists=false` means undetermined. A client timeout does not establish whether the server finished; do not blindly repeat a potentially billed request.
