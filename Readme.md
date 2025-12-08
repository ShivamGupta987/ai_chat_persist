# 🚀 AI Chat Backend (Node.js + Express + MongoDB + Gemini AI)

This is the backend service for the **AI Chat Application**.  
It handles:
- Storing chat history in MongoDB
- Communicating with Google Gemini AI
- Serving REST APIs to the frontend

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Google Gemini AI**
- **dotenv**
- **CORS**

---

## 📁 Folder Structure

backend/
├── config/
│ └── db.js # MongoDB connection
├── models/
│ └── Message.js # Chat message schema
├── routes/
│ └── chat.js # Chat APIs
├── .env # Environment variables
├── server.js # Express entry point
├── package.json
└── README.md


---

## ✅ Prerequisites

- Node.js v18+
- MongoDB (Local or MongoDB Atlas)
- Google Gemini API Key

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

📦 Install Dependencies
cd backend
npm install

▶️ Run Server
Development Mode
npm run dev

Production Mode
npm start


✅ Server will run at:

http://localhost:5000

🔌 API Endpoints
✅ POST /api/chat

Send user message and receive AI reply.

Request:

{
  "message": "Hello AI"
}


Response:

{
  "reply": "Hello! How can I help you?"
}

✅ GET /api/chat/history

Fetch all stored chat messages.

✅ DELETE /api/chat/history

Clear complete chat history (optional admin feature).

✅ GET /health

Health check endpoint.

💾 Database Schema
{
  role: "user" | "ai",
  content: String,
  createdAt: Date
}

🤖 AI Behaviour

If GEMINI_API_KEY is present → real Gemini AI reply

If API key is missing → fallback demo reply is returned

This ensures the app never crashes

❗ Common Issues & Fixes
❌ Gemini API Error

✔ Check GEMINI_API_KEY
✔ Restart server after changing .env
✔ Ensure @google/generative-ai is installed:

npm install @google/generative-ai

❌ MongoDB Not Connecting

✔ Verify MONGO_URI
✔ Check IP whitelist in MongoDB Atlas
✔ Ensure internet is active

✅ Features

Real-time chat storage

Persistent history after refresh

Gemini AI auto replies

Safe error handling

Demo fallback mode

Production-ready API architecture

# ✅ ✅ ✅ **FRONTEND README.md (FINAL – PRO LEVEL)**

```md
# 🎨 AI Chat Frontend (React + Vite + Tailwind CSS)

This is the frontend for the **AI Chat Application**, built with **React + Vite + Tailwind CSS**.  
It provides:
- A modern glassmorphism UI
- Real-time chat updates
- Auto-scroll
- AI typing loader
- Persistent chat history

---

## 🛠 Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **JavaScript / TypeScript (optional)**

---

## 📁 Folder Structure

frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
├── main.jsx
├── App.jsx
├── index.css
├── api.js
└── components/
└── ChatUI.jsx

yaml
Copy code

---

## ✅ Prerequisites

- Node.js 18+
- Backend running on:
http://localhost:5000

yaml
Copy code

---

## 📦 Install Dependencies

```bash
cd frontend
npm install
▶️ Start Development Server
bash
Copy code
npm run dev
✅ App will run on:

arduino
Copy code
http://localhost:5173
(or 3000 based on your setup)

🔌 Backend API Usage
Method	Endpoint	Purpose
GET	/api/chat/history	Load chat history
POST	/api/chat	Send message
DELETE	/api/chat/history	Clear history

💡 Key Features
✅ Beautiful glassmorphism UI

✅ Real-time message rendering

✅ AI typing animation

✅ Auto-scroll to latest message

✅ Enter key to send message

✅ Backend error handling

✅ Mobile responsive

✅ Works with refresh (persistent history)


const API_BASE_URL = "http://localhost:5000";
❗ Common Issues & Fixes
❌ Backend Not Connecting
✔ Ensure backend is running
✔ Check API base URL
✔ Make sure CORS is enabled

❌ Styles Not Loading
✔ Run npm install
✔ Restart dev server
✔ Make sure index.css has Tailwind imports

✅ Production Build
bash
Copy code
npm run build
npm run preview
