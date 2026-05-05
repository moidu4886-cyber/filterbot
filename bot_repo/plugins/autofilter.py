from pyrogram import Client, filters
from pyrogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from bot_repo.database import db
from bot_repo.ai_engine import ai_autofilter
from bot_repo.config import Config

@Client.on_message(filters.text & filters.group)
async def group_filter_handler(client, message):
    if message.text.startswith("/"): return # Ignore commands
    
    query = message.text
    
    # 1. AI Intent Analysis (Optional)
    # If the query is complex, we use Gemini to fix spelling or find related terms
    processed_query = await ai_autofilter(query) if Config.ENABLE_AI else query
    
    # 2. Database Lookup
    files, total = await db.get_search_results(processed_query or query)
    
    if not files:
        return # Optionally send a "Not Found" message or buttons
    
    # 3. Build Results UI
    btn = []
    for file in files:
        btn.append([InlineKeyboardButton(f"🎬 {file['file_name']}", url=f"https://t.me/{client.me.username}?start=file_{file['file_id']}")])
    
    await message.reply_text(
        f"🔎 **Results for:** `{query}`\n"
        f"📊 **Total found:** {total}\n\n"
        "Select a result to get the file via PM.",
        reply_markup=InlineKeyboardMarkup(btn)
    )
