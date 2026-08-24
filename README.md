# OpenMind AI Agent

A single-page chat client for Google's Gemini API. The API key stays on the
server: the browser posts a prompt to a Next.js API route, the route calls
Google, and the answer comes back rendered as Markdown.

**Live:** [openmind-ai-agent.vercel.app](https://openmind-ai-agent.vercel.app)

It is deliberately small — one page, one route, no database, no session. What
it is worth reading for is the failure handling, which is where the first
version of this project was wrong.

## What was wrong, and what it does now

The original client did `setReply(data.reply)` on every response. When the
request failed, `data.reply` was `undefined`, so the reply block never
rendered: no spinner, no message, no error. Pressing **Send** looked like it
did nothing at all, and the server had already flattened every distinct
failure into one `500`.

Both sides now report what actually happened:

- **Missing API key** → `503` naming the environment variable to set. A
  deployment problem is not a model problem and should not read like one.
- **Upstream error** → the status Google returned, passed through rather than
  rewritten to `500`, with the upstream message and the model id attached. A
  retired model, a rejected key and a rate limit are three different problems.
- **`200` with no candidate** → `502` carrying `promptFeedback.blockReason`.
  A filtered response is not an empty answer.
- The client renders every one of these in an `alert` region, disables the
  button while a request is in flight, and shows `Thinking…`.

The model default is `gemini-2.0-flash`. The previous default,
`gemini-1.5-flash-latest`, has been retired from the public endpoint.

## Running it

```bash
git clone https://github.com/vipinsao/openmind-ai-agent.git
cd openmind-ai-agent
npm install
cp .env.example .env.local     # then add your key
npm run dev
```

A key comes from [Google AI Studio](https://aistudio.google.com/app/apikey) —
free tier, no card. Set `GEMINI_API_KEY`; `GOOGLE_API_KEY` is also accepted,
because that is the name this project's hosting environment already used, and
a silent mismatch between the two is indistinguishable from an outage.

`GEMINI_MODEL` overrides the model if you want a different one.

## Layout

```
pages/index.js        the page — input, loading and error states
pages/api/agent.js    server route; holds the key, calls Gemini
styles/globals.css    Tailwind base
```

Next.js 13 (pages router) · React 18 · Tailwind CSS · axios

## Author

**Vipin Chandra Sao** — [@vipinsao](https://github.com/vipinsao)
