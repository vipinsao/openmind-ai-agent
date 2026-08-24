import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* There was no <title> at all, so the browser tab showed the bare URL
          and a bookmark saved under it had no name. Defaults live here rather
          than in the page so the 404 route gets them too. The favicon is an
          inline SVG data URI: the project has no public/ directory, and adding
          a binary asset for one glyph is not worth it. */}
      <Head>
        <title>OpenMind AI Agent</title>
        <meta
          name="description"
          content="A minimal chat client for Google's Gemini API. The API key stays on the server; the browser posts a prompt to a Next.js route."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%A7%A0%3C/text%3E%3C/svg%3E"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
