# 🤖 OpenMind AI Agent

An AI-powered conversational assistant built with **Next.js**, **TailwindCSS**, and the **Google Gemini Model (via Vertex AI API)**. This project allows users to interact with a smart agent capable of generating meaningful and context-aware responses in real time.

## 🚀 Live Demo

🔗 [openmind-ai-agent.vercel.app](https://openmind-ai-agent.vercel.app)

---

## ✨ Features

- 🌐 **Built with Next.js 14+** – Server-side rendering and optimized routing.
- 🎨 **TailwindCSS** – Fast UI design with responsive styling.
- 🧠 **Google Gemini API** – Powerful, free-tier conversational model.
- 🔄 **Stateless interaction pattern** – Clean and simple agent message handling.

---

## 📦 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Google Gemini API (via Vertex AI or REST)
- **Deployment**: Vercel / Netlify (recommended)

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/vipinsao/openmind-ai-agent.git

# 2. Navigate into the project folder
cd openmind-ai-agent

# 3. Install dependencies
npm install

# 4. Add your API Key
# Create a .env.local file and add your Google AI key:
GOOGLE_API_KEY=your_google_api_key_here

# 5. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Model Configuration

The app uses the free-tier **Gemini 1.5 Flash** or **Pro** model. You must:

- Create a project in [Google AI Studio](https://makersuite.google.com/app)
- Enable the **Generative Language API**
- Use the `GOOGLE_API_KEY` in your environment

---

## 📁 Project Structure

```
/pages
  └── index.tsx         # Main UI Page
/api
  └── chat.ts           # Serverless function for chat handling
/styles
  └── globals.css       # Tailwind base styles
```

---

## 🧪 Example Prompts

```
Q: How can I contribute to open-source?
Q: Explain Binary Search in simple terms.
Q: Suggest 3 startup ideas for a CSE graduate.
```

---

## 👨‍💻 Author

**Vipin Chandra Sao**  
GitHub: [@vipinsao](https://github.com/vipinsao)

---

## 🙌 Support

If you find this project helpful, consider giving it a ⭐️ on GitHub!

