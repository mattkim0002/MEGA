# Memecoin Launch Screener

**Live app: https://mattkim0002.github.io/MEGA/** — free, no signup, works on any phone or browser.

A single-file, multi-chain memecoin screener that filters for **evidence**, not hype:

- **Security verdicts** — RugCheck (Solana) + GoPlus (EVM/Tron) on every coin; honest UNKNOWN where no checker exists
- **Deep research** — holder distribution, LP lock, insider wallet networks, serial-deployer history, Bubblemaps links
- **On-chain validation** — pump.fun bonding curves read directly from Solana (curve % sold, real SOL committed)
- **Evidence grades A–F** with hard caps: unlocked LP, duplicate tickers, serial deployers, and unverified coins can't grade above C
- **Strict mode** — only A/B-grade coins shown; an empty list means nothing met the bar today
- **Scan modes** — early hunt, low cap, fresh (minutes old), recovery — with sticky per-mode filters
- **Live reads** — heat (momentum), trend (crowd), lore (story depth), gap (attention vs priced-in), narrative radar, survival across scans
- **Outcome log** — every A/B coin ever shown, with what happened to it since. The honest scoreboard.
- Optional 𝕏 layer (bring your own [twitterapi.io](https://twitterapi.io) key via a [Cloudflare Worker](x-proxy-worker.js) — the key never touches this public code)

## The one rule

**Grades rank evidence, not winners.** A PASS means "no rug mechanics found," an A means "strongest evidence in this scan" — an A-grade memecoin is still a lottery ticket, just not a rigged one. Most memecoins go to zero regardless of grade. This tool exists to keep you out of rigged games; nothing can make the fair ones winnable.

Not financial advice.
