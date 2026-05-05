# Advanced AI Autofilter Bot
This is a professional-grade Telegram Autofilter Bot with Gemini AI integration.

## 🚀 Deployment

### Option 1: Koyeb (Recommended)
1. Fork this repository to your GitHub account.
2. Go to [Koyeb](https://app.koyeb.com/) and create a new **Service**.
3. Connect your GitHub and select this repository.
4. Set the following **Environment Variables**:
   - `API_ID`, `API_HASH`, `BOT_TOKEN`, `DATABASE_URI`, `GEMINI_API_KEY`.
5. Koyeb will automatically detect the `Procfile` and start the `worker` process.

### Option 2: Local / VPS
1. Clone this repo.
2. Create a `.env` file with your credentials.
3. Run `pip install -r requirements.txt`.
4. Start with `python3 -m bot_repo.bot`.

## ✨ Features
- AI-Driven query parsing (Understands mood, theme, and errors).
- Modular plugin system.
- Fast MongoDB indexing.
- Multi-admin support.
