const apiKey = process.env.EMAILCHECKPRO_API_KEY;
if (!apiKey) throw new Error("Set EMAILCHECKPRO_API_KEY");
const baseUrl = (process.env.API_BASE_URL || "https://emailcheckpro.com").replace(/\/$/, "");
const identifier = process.env.IDENTIFIER || "user@example.com";
const batch = process.env.MODE === "batch";
const path = batch ? "/api/v1/batch-check" : "/api/v1/check";
const body = batch
  ? { service_type: "email_avatar", identifiers: [identifier, "other@example.com"] }
  : { service_type: "email_avatar", identifier };
const timeout = Number(process.env.REQUEST_TIMEOUT_SECONDS || (batch ? "330" : "60")) * 1000;
if (!Number.isFinite(timeout) || timeout <= 0) throw new Error("Invalid REQUEST_TIMEOUT_SECONDS");
const response = await fetch(`${baseUrl}${path}`, {
  method: "POST", headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify(body), signal: AbortSignal.timeout(timeout),
});
if (!response.ok) throw new Error(await response.text());
const result = await response.json();
if (result.code !== 0) throw new Error(JSON.stringify(result));
console.log(result);
// Classify only exists=true batch items. Never blindly retry an uncertain network timeout.
