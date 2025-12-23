# 🌌 Project Apeiron

> *The Infinite Archive of Computer Science Knowledge*

**Your AI-powered companion for mastering Computer Science concepts.**

Project Apeiron is an interactive learning platform that makes exploring Computer Science topics engaging and accessible. Whether you're a student preparing for exams, a professional brushing up on fundamentals, or a curious mind diving into tech concepts, Apeiron provides instant, intelligent explanations powered by Google's Gemini AI.

### What You Can Learn

Explore core Computer Science domains including:
- 🧠 **Artificial Intelligence & Machine Learning** - Neural networks, algorithms, applications
- 💾 **Operating Systems** - Process management, memory, file systems
- 🗄️ **Databases** - SQL, NoSQL, design principles
- 🌐 **Computer Networks** - Protocols, architecture, security
- 🔐 **Cryptography** - Encryption, security fundamentals
- ...and many more topics!

Each topic comes with curated learning resources, roadmaps, and an interactive AI chat where you can ask follow-up questions and get personalized explanations.

---

## ✨ Features

- 🤖 **AI-Powered Chat** - Ask questions and get detailed explanations in real-time
- 📚 **Comprehensive Topics** - Cover major Computer Science domains
- 🎯 **Learning Roadmaps** - Structured paths from beginner to advanced
- 🔗 **Curated Resources** - Handpicked articles, videos, and documentation
- 💬 **Interactive Oracle** - Chat interface for deep-dive discussions
- 🌟 **Beautiful Interface** - Immersive cosmic theme with smooth animations
- 📱 **Mobile Friendly** - Learn anywhere, on any device

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- A free Google Gemini API key - [Get it here](https://ai.google.dev/)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   Create a file named `.env.local` in the project root and add:
   ```env
   VITE_GEMINI_API_KEY="your-api-key-here"
   ```
   Replace `your-api-key-here` with your actual Gemini API key.

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`

That's it! Start exploring Computer Science topics with AI assistance.

---

## 💡 How to Use

1. **Browse Topics** - Start on the home page to see all available Computer Science topics
2. **Select a Topic** - Click any card to view detailed information and learning resources
3. **Ask the Oracle** - Use the chat interface to ask questions about the topic
4. **Get Real-time Answers** - Watch as AI generates comprehensive explanations
5. **Follow Resources** - Explore recommended articles, videos, and documentation
6. **Go Deeper** - Ask follow-up questions to clarify concepts or explore related areas

### Tips for Better Learning

- 💭 **Ask specific questions** - "Explain binary search trees with an example"
- 🔄 **Request different explanations** - "Can you explain this more simply?"
- 🎯 **Explore use cases** - "Where is this used in real applications?"
- 📊 **Compare concepts** - "What's the difference between TCP and UDP?"

---

## 🎓 Learning Topics Covered

### Core Computer Science
- **Data Structures & Algorithms** - Arrays, linked lists, trees, graphs, sorting, searching
- **Operating Systems** - Processes, threads, memory management, file systems
- **Computer Architecture** - CPU, memory hierarchy, instruction sets
- **Databases** - Relational and NoSQL databases, SQL, normalization
- **Computer Networks** - OSI model, TCP/IP, HTTP, network security

### Advanced Topics
- **Artificial Intelligence** - Machine learning basics, neural networks, AI applications
- **Cryptography** - Encryption algorithms, public-key cryptography, security protocols
- **Distributed Systems** - Scalability, consistency, fault tolerance
- **Cloud Computing** - Virtualization, containers, cloud services
- **Software Engineering** - Design patterns, testing, agile methodologies

Each topic includes:
- 📖 **Comprehensive Explanations** - Clear, beginner-friendly content
- 🗺️ **Learning Roadmaps** - Step-by-step progression paths
- 🔗 **External Resources** - Articles, videos, and documentation
- 💬 **AI Chat** - Ask personalized questions and get instant answers

---

## 🛠️ Troubleshooting

### AI not responding?

1. **Check your API key** - Make sure `.env.local` has the correct `VITE_GEMINI_API_KEY`
2. **Restart the server** - Stop the app (Ctrl+C) and run `npm run dev` again
3. **Verify API key validity** - Go to [Google AI Studio](https://ai.google.dev/) and confirm your key is active
4. **Check browser console** - Open Developer Tools (F12) to see error messages

### Other common issues

- **Port already in use** - Vite will automatically use another port (check terminal output)
- **Installation errors** - Delete `node_modules` folder and run `npm install` again
- **Slow responses** - Free API tier has rate limits; wait a moment and try again

### Need more help?

Open an issue on GitHub or check the [Deployment Guide](./DEPLOYMENT.md) for additional setup information.

---

## 🌐 Deployment (Optional)

Want to share this with friends or access it anywhere? Deploy it for free!

### Quick Deploy to Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Fork this repository on GitHub
3. Import your fork to Vercel
4. Add environment variable: `VITE_GEMINI_API_KEY` with your API key
5. Click Deploy - done in 2 minutes!

You'll get a live URL like: `https://your-apeiron.vercel.app`

### Alternative: Netlify or GitHub Pages

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on other hosting platforms.

---

## 🤝 Contributing

This is an open learning resource! You can help improve it:

- 📝 **Add new topics** - Suggest CS subjects to cover
- 🐛 **Report issues** - Found a bug? Let us know
- 💡 **Share ideas** - Have suggestions? Open an issue
- ⭐ **Star the repo** - Show your support!

---

## 📚 Additional Resources

Want to learn more? Check out these resources:

- [Google Gemini API Documentation](https://ai.google.dev/)
- [Computer Science Study Guide](https://github.com/ossu/computer-science)
- [Interactive Coding Challenges](https://www.hackerrank.com/)
- [CS Visualization Tools](https://visualgo.net/)

---

## 📄 License

This project is open source and available for educational purposes. Feel free to use it for learning, teaching, or building upon it.

---

## 🙏 Acknowledgments

- Powered by **Google Gemini AI**
- Built with **React**, **Vite**, and **TypeScript**
- UI components styled with **Tailwind CSS**
- Icons from **Lucide React**

---

**Start your Computer Science learning journey today!** 🚀

Questions? Issues? Feel free to open an issue on GitHub or contribute to make this learning tool even better.
