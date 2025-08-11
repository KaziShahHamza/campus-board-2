# 🎓 CampusBoard

CampusBoard is a full-stack web application where university students can anonymously report campus-related issues, upvote/downvote posts, and participate in discussions through comments. The platform empowers students to voice concerns, gain support, and collaborate on resolving problems—all while preserving their anonymity.

---

## 🚀 Features

- 📝 **Post Campus Issues** – Share problems about campus facilities, academics, administration, etc.
- 🔼🔽 **Upvote/Downvote** – Let students support or reject reported issues.
- 💬 **Comments System** – Join discussions anonymously to provide suggestions or feedback.
- 🕵️ **Anonymous Identity** – Student names are hidden from posts and comments to ensure privacy.
- 🧠 **AI-Powered Moderation** – Uses Google Gemini AI to detect slang or inappropriate language before posting.
- 🔐 **User Authentication** – Secure sign-up and login system with encrypted passwords.

---

## 🧱 Tech Stack

### Frontend
- **React** – Component-based frontend UI
- **React Router v6.4+** – Routing with loader/action pattern
- **Tailwind CSS** – Fast and responsive styling
- **Context API** – Global state management (authentication, user info)

### Backend
- **Node.js + Express** – RESTful API and server-side logic
- **MongoDB + Mongoose** – NoSQL database and object modeling
- **Bcrypt** – Secure password hashing
- **CORS, dotenv** – Middleware and environment variable support
- **Google Gemini API** – Detects and prevents slang/inappropriate text in posts/comments

---


## 🧠 How It Works

### 🔐 Authentication
- Students can register and login with a username and password.
- Passwords are hashed using `bcrypt` before being stored in MongoDB.
- A JWT-based or session-based authentication can be implemented to protect routes.

### ✍️ Creating a Post
- Authenticated users can submit a post by entering the issue title and description.
- The content is sent to the backend, where Google Gemini API scans for offensive/slang language.
- If the input is clean, the post is saved in MongoDB and appears on the homepage.

### 📣 Voting
- Logged-in users can upvote or downvote posts or comments.
- Vote data is stored in MongoDB per user per post to prevent multiple voting.

### 💬 Comments
- Users can comment on posts to provide suggestions or feedback.
- Like posts, comments are scanned by Gemini API before being saved.

### 🕵️ Anonymous Posting
- Student identities (name, email) are never shown on posts or comments.
- The backend handles ID anonymization for all public-facing data.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
https://github.com/KaziShahHamza/campus-board-2.git
cd campus-board-2
````

### 2. Setup Backend

```bash
cd server
npm install
touch .env
```

**`.env` file content:**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

## 📂 Folder Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
```

---

## 🔒 Security Features

* Passwords are encrypted using bcrypt.
* Google Gemini AI prevents inappropriate content from being posted.
* Protected API routes for authenticated users only.

---

## 🤖 Gemini API Use

Gemini API is used to detect slang or toxic language in both posts and comments. Before any content is saved:

1. A prompt is sent to Gemini.
2. If inappropriate language is detected, the post/comment is rejected with an error.

---

## 💡 Future Improvements

* Notification system for post interactions
* File/image uploads in posts
* Email verification during sign-up
* Tags and filters for post categories (e.g. hostel, academics, facilities)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License

---

## 🧑‍💻 Author

**Kazi Shah Hamza**
CS Student | MERN Stack Developer
Feel free to connect or give feedback!

---

