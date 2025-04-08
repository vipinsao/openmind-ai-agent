import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Google API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
}
