
📦 MERN Stack Project – [BlazeFix]

🚀 Tech Stack

LayerTech UsedFrontendReact, TypeScript, Tailwind CSS, ViteBackendNode.js, Express.jsDatabaseMongoDB, MongooseStylingTailwind CSSBuild ToolVite 

📁 Folder Structure Overview

project/ ├── server/ # Express backend │ ├── models/ # Mongoose schemas (Alert, Report, etc.) │ ├── routes/ # API endpoints │ └── server.js # Main backend entry point ├── src/ # React frontend │ ├── App.tsx # Main app component │ ├── main.tsx # React entry point │ ├── components/ # UI components │ └── index.css # TailwindCSS base styling ├── public/ # Static assets (if any) ├── .env # Environment variables (API keys, Mongo URI) ├── tailwind.config.js # Tailwind config ├── tsconfig.json # TypeScript config ├── vite.config.ts # Vite config ├── package.json # Project dependencies ├── .gitignore # Ignored files/folders 

🛠 How to Run Locally

📌 Prerequisites

Node.js (v18+ recommended)

MongoDB (local or MongoDB Atlas)

A .env file with your backend config (MongoDB URI, ports, etc.)

🖥 Frontend Setup

# Install frontend dependencies npm install # Start frontend (Vite) npm run dev 

🖥 Backend Setup

cd server # Install backend dependencies npm install # Start backend node server.js 

🌐 Environment Variables (.env)

Make sure to add a .env file in both root or server/ with contents like:
PORT=5000 MONGO_URI=your_mongo_connection_string EMAIL_USER=your_email@example.com EMAIL_PASS=your_email_password JWT_SECRET=your_jwt_secret TWILIO_SID=your_sid TWILIO_AUTH_TOKEN=your_token 

🎯 Features

✅ Single-page frontend with React + Vite

✅ Modern UI with Tailwind CSS

✅ Type-safe code using TypeScript

✅ REST API with Express

✅ MongoDB-based models for storing alerts, reports, predictions

✅ Clean code structure, easily extendable

✅ Full MERN integration

🧹 Clean Git Commit Structure

Recommended .gitignore includes:
node_modules/ dist/ .env .vscode/ .vite/ vite-env.d.ts *.log *.tsbuildinfo 

📦 Deployment

Can be deployed to:

Frontend: Vercel, Netlify

Backend: Render, Railway, Heroku

DB: MongoDB Atlas

📄 License

[Your License or MIT]
Let me know if you'd like:

A version customized for your resume line

Deployment guide with domains

README.md file to download and upload directly to GitHub

Just say the word!
