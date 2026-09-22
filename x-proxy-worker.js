// Cloudflare Worker: 𝕏 search proxy for the launch screener.
//
// Why this exists: twitterapi.io rejects browser (CORS) calls, and an API key
// embedded in a public page would be stolen instantly. This worker holds the
// key as a server-side secret and only answers the screener's own origins.
//
// Deploy (free, ~5 minutes):
//   1. Sign up / log in at dash.cloudflare.com
//   2. Workers & Pages -> Create -> Worker -> name it (e.g. "x-proxy") -> Deploy
//   3. Edit code -> replace everything with this file -> Deploy
//   4. Settings -> Variables and Secrets -> Add:
//        type: Secret, name: TWITTERAPI_KEY, value: <your twitterapi.io key>
//   5. Copy the worker URL (https://x-proxy.<your-subdomain>.workers.dev)
//      and paste it into the screener's "X proxy URL" field.

const ALLOWED_ORIGINS = [
  "https://mattkim0002.github.io",
  "http://localhost:8756",
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      "Content-Type": "application/json",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const q = (new URL(request.url).searchParams.get("q") || "").trim();
    // contract addresses only — keeps the key from being used as a general search proxy
    if (!/^(0x[0-9a-fA-F]{40}|[1-9A-HJ-NP-Za-km-z]{32,44})$/.test(q)) {
      return new Response(JSON.stringify({ error: "q must be a contract address" }), { status: 400, headers: cors });
    }

    const upstream = await fetch(
      "https://api.twitterapi.io/twitter/tweet/advanced_search?queryType=Latest&query=" + encodeURIComponent(q),
      { headers: { "X-API-Key": env.TWITTERAPI_KEY } }
    );
    return new Response(await upstream.text(), { status: upstream.status, headers: cors });
  },
};
