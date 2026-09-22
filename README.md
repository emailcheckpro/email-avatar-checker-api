# Email Avatar Checker API — Single & Batch Checks | EmailCheckPro

The **EmailCheckPro Email Avatar Check API** returns registration status plus the public profile photo for Gmail, Yandex and Mail.ru addresses, for one address or a batch of up to 100. It returns synchronous JSON through `service_type=email_avatar`, and uses an `X-API-Key` header. This is the official EmailCheckPro example repository, with integrations in seven languages.

- **Product page:** https://emailcheckpro.com/products/email_avatar
- **API documentation:** https://emailcheckpro.com/api-docs
- **API base URL:** `https://emailcheckpro.com`
- **Authentication:** `X-API-Key`
- **Get an API key:** https://emailcheckpro.com/register

## What does the EmailCheckPro Email Avatar Check return?

The API returns `registered` together with `avatar` and `avatar_url`. Avatar coverage is limited to the Gmail, Yandex and Mail.ru families; addresses on other domains are rejected before any charge. A successful single check uses `code=0`. In batch results, `exists=true` means a determined result is present; `exists=false` means the item is undetermined and must not be read as a negative answer. This repository covers only the `email_avatar` product.

| API fact | Value |
|---|---|
| Product code | `email_avatar` |
| `service_type` | `email_avatar` |
| Input | email address |
| Single endpoint | `POST /api/v1/check` |
| Batch endpoint | `POST /api/v1/batch-check` |
| Batch size | 1–100 email addresses |
| Processing mode | Synchronous |

## How do I check one email address?

```bash
curl -X POST 'https://emailcheckpro.com/api/v1/check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"email_avatar","identifier":"alex.kim@gmail.com"}'
```

A determined response uses this envelope:

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "service_type": "email_avatar",
    "identifier": "alex.kim@gmail.com",
    "registered": true,
    "avatar": true,
    "avatar_url": "https://cdn.example.com/a.jpg",
    "provider": "gmail"
  }
}
```

Accept a negative result only when `code=0`. Error code `42200` represents an undetermined check and returns no result data; it is not charged.

## How do I check email addresses in a batch?

Submit 1–100 email addresses with one `service_type`. Results preserve input order.

```bash
curl -X POST 'https://emailcheckpro.com/api/v1/batch-check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"email_avatar","identifiers":["alex.kim@gmail.com","user@yandex.ru"]}'
```

The batch response contains `service_type`, `total`, `succeeded`, `failed`, and an ordered `results` array. Every item has `identifier` and `exists`; the result fields are present only when `exists=true`.

## What are the response fields?

| Field | Description |
|---|---|
| `service_type` | Product code used for the check. |
| `identifier` | Submitted email address echoed by the API. |
| `registered` | Whether the address is registered with its mailbox provider. |
| `avatar` | Whether a public profile photo is available. |
| `avatar_url` | URL of the public profile photo; empty string when none is available. |
| `provider` | Mailbox family resolved from the domain. |

## What are the limits and error codes?

- Five requests may be in flight per user. A batch counts as one request no matter how many email addresses it carries, and only one batch runs at a time per account.
- A batch has 300 seconds to finish, waiting time included. Exceeding it returns code `50400` with no partial results, and the full amount is refunded.
- Each email address in a batch is billed independently, and only successful items consume balance. The whole request is rejected before processing when the balance cannot cover every submitted item.
- `40000`/`40001`/`40002` are request, JSON, or input-format errors; `40100` is an invalid key; `40200` is insufficient balance; `42200` is undetermined and uncharged; `42900` is rate limited — honour `Retry-After`; `42901` means the concurrency slots are occupied; `50300` is temporary maintenance.
- `GET /api/v1/balance` returns the current balance in `data.balance_micros`.

Keep the key on a trusted server and read it from `EMAILCHECKPRO_API_KEY`. Never commit it or expose it in production browser code. Retry only rate-limited or transient failures.

## Runnable examples in seven languages

| Language | Example |
|---|---|
| Python | [`examples/python`](examples/python) |
| Node.js | [`examples/nodejs`](examples/nodejs) |
| Go | [`examples/go`](examples/go) |
| Java | [`examples/java`](examples/java) |
| C# | [`examples/csharp`](examples/csharp) |
| PHP | [`examples/php`](examples/php) |
| Shell / curl | [`examples/shell`](examples/shell) |

Python and Node.js also support `MODE=batch`.

## Frequently asked questions

### Does `exists=false` mean a negative result?

No. It means the batch item is undetermined. Read a negative answer only from a determined result.

### How many email addresses can one batch contain?

Between 1 and 100. Only one batch runs at a time per account.

### Where can I find current pricing?

See the [EmailCheckPro pricing page](https://emailcheckpro.com/pricing). This repository intentionally does not hard-code a price.

## Official resources and responsible use

- **Product:** https://emailcheckpro.com/products/email_avatar
- **Documentation:** https://emailcheckpro.com/api-docs
- **Registration:** https://emailcheckpro.com/register
- **Pricing:** https://emailcheckpro.com/pricing
- **OpenAPI contract:** [`openapi.yaml`](openapi.yaml)
- **License:** [MIT](LICENSE) for the sample code

Use this API only for identifiers you are authorized to process, and comply with applicable privacy laws and platform terms. Third-party trademarks belong to their respective owners; no affiliation or endorsement is implied.

---

*Last reviewed: 2026-09-22 · Maintained by EmailCheckPro. Canonical product page: https://emailcheckpro.com/products/email_avatar*
