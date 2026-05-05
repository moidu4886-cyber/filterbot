from pyrogram import Client, filters
from pyrogram.types import InlineKeyboardMarkup, InlineKeyboardButton, CallbackQuery
from bot_repo.database import db
from bot_repo.config import Config
from bot_repo.script import Script
from bot_repo.ai_engine import ai_autofilter

@Client.on_message(filters.text & filters.group)
async def group_filter(client, message):
    if message.text.startswith("/"): return
    
    query = message.text
    # Pre-process with AI if enabled
    search_query = await ai_autofilter(query) if Config.ENABLE_AI else query
    
    files, total = await db.get_search_results(search_query or query, offset=0)
    
    if not files:
        # Check if AI has alternative suggestions
        return # Or send "Not Found" message
        
    btn = []
    for file in files:
        btn.append([InlineKeyboardButton(f"🎬 {file['file_name']}", url=f"https://t.me/{client.me.username}?start=file_{file['file_id']}")])
    
    if total > Config.RESULTS_COUNT:
        btn.append([
            InlineKeyboardButton("NEXT ⏩", callback_data=f"next_0_{query}"),
            InlineKeyboardButton(f"PAGE 1/{(total // Config.RESULTS_COUNT) + 1}", callback_data="pages")
        ])

    await message.reply_text(
        f"🔎 <b>Results for:</b> <code>{query}</code>\n"
        f"📊 <b>Total Files:</b> {total}",
        reply_markup=InlineKeyboardMarkup(btn)
    )

@Client.on_callback_query(filters.regex(r"^next"))
async def next_page(client, query: CallbackQuery):
    # Handle pagination logic here (similar to high-end bots)
    _, offset, search = query.data.split("_")
    new_offset = int(offset) + Config.RESULTS_COUNT
    # Update message logic...
    pass
