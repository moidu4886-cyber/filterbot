import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # --- Telegram API Config ---
    API_ID = int(os.environ.get("API_ID", "12345"))
    API_HASH = os.environ.get("API_HASH", "")
    BOT_TOKEN = os.environ.get("BOT_TOKEN", "")
    
    # --- Database Config ---
    DATABASE_URI = os.environ.get("DATABASE_URI", "")
    DATABASE_NAME = os.environ.get("DATABASE_NAME", "AdvancedFilterBot")
    COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "TelegramFiles")
    
    # --- AI Integration ---
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
    ENABLE_AI = True
    
    # --- Customization ---
    START_MSG = os.environ.get("START_MSG", "👋 Hello {user}, I am the most advanced Autofilter Bot with AI capabilities!")
    PICS = os.environ.get("PICS", "https://telegra.ph/file/default.jpg").split()
    RESULTS_COUNT = 10 # Results per page
    
    # --- Admin & Security ---
    ADMINS = [int(admin) for admin in os.environ.get("ADMINS", "").split()]
    CHANNELS = [int(ch) for ch in os.environ.get("CHANNELS", "").split()]
    LOG_CHANNEL = int(os.environ.get("LOG_CHANNEL", "0"))
