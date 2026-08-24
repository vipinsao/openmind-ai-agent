import axios from "axios";

// Model ids on this endpoint get retired. 1.5 Flash (the original default here)
// and 2.0 Flash have both gone; 3.6 Flash is current. When the next one lapses,
// Google says so in the error body, which the catch block below now surfaces
// verbatim instead of flattening it into a 500 — that message is what identified
// this one.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

// Accept either name. The Vercel project was configured with GOOGLE_API_KEY,
// the Google docs call it GEMINI_API_KEY, and a mismatch between the two is
// indistinguishable from an outage once the error is swallowed.
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const prompt = req.body?.prompt;
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // A missing key is a deployment problem, not a model problem. Saying so is
  // the difference between a five-second fix and an afternoon.
  if (!API_KEY) {
    return res.status(503).json({
      error:
        "This deployment has no Gemini API key. Set GEMINI_API_KEY (or GOOGLE_API_KEY) in the hosting environment.",
    });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        timeout: 30000,
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // A 200 with no candidate means the model refused or the response was
    // filtered. Returning it as success renders an empty box and looks broken.
    if (!reply) {
      return res.status(502).json({
        error: "The model returned no text.",
        detail: response.data?.promptFeedback?.blockReason || "no candidates",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    const upstream = error?.response;
    const detail =
      upstream?.data?.error?.message || error?.code || error.message;

    console.error("Gemini API error:", upstream?.status, detail);

    // Pass the upstream status through instead of flattening everything to
    // 500. A retired model, a bad key and a rate limit are different problems
    // and used to be reported identically.
    return res.status(upstream?.status && upstream.status >= 400 ? upstream.status : 502).json({
      error: "Failed to get response from Gemini API",
      detail,
      model: MODEL,
    });
  }
}
