const apiKey = process.env.EMAILCHECKPRO_API_KEY;
if (!apiKey) throw new Error("Set EMAILCHECKPRO_API_KEY");

const baseUrl = process.env.API_BASE_URL || "https://emailcheckpro.com";
const identifier = process.env.IDENTIFIER || "alex.kim@gmail.com";
const batch = process.env.MODE === "batch";
const path = batch ? "/api/v1/batch-check" : "/api/v1/check";
const body = batch
  ? { service_type: "email_avatar", identifiers: [identifier, "user@yandex.ru"] }
  : { service_type: "email_avatar", identifier };

const response = await fetch(`${baseUrl}${path}`, {
  method: "POST",
  headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
