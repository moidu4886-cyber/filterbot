from pyrogram import Client, filters
from pyrogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from bot_repo.config import Config

@Client.on_message(filters.command("start") & filters.private)
async def start_handler(client, message):
    await message.reply_text(
        text=Config.START_MSG.format(user=message.from_user.mention),
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("➕ Add Me to Your Group", url=f"https://t.me/{client.me.username}?startgroup=true")],
            [InlineKeyboardButton("🛠️ Support", url="https://t.me/your_support_chat")]
        ])
    )

@Client.on_message(filters.command("help"))
async def help_handler(client, message):
    await message.reply_text("Just add me to your group and I will automatically filter your indexed files!")
