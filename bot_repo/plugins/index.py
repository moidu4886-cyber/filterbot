from pyrogram import Client, filters
from bot_repo.config import Config
from bot_repo.database import db

@Client.on_message(filters.command("index") & filters.user(Config.ADMINS))
async def index_files(client, message):
    if len(message.command) < 2:
        return await message.reply("Usage: /index -100xxxxx (Channel ID)")
    
    chat_id = message.command[1]
    msg = await message.reply("⏳ <b>Starting Indexing...</b>")
    
    count = 0
    async for user_msg in client.search_messages(chat_id, filter="document"):
        file = user_msg.document
        await db.save_file({
            "file_name": file.file_name,
            "file_id": file.file_id,
            "file_size": file.file_size,
            "chat_id": chat_id,
            "msg_id": user_msg.id
        })
        count += 1
        if count % 100 == 0:
            await msg.edit(f"✅ Indexed {count} files...")

    await msg.edit(f"🎊 **Indexing Completed!**\nTotal {count} files added to database.")
