from pyrogram import Client, filters
from bot_repo.config import Config
from bot_repo.database import db
import asyncio

@Client.on_message(filters.command("broadcast") & filters.user(Config.ADMINS) & filters.reply)
async def broadcast_handler(client, message):
    users, _ = await db.get_all_users()
    msg = await message.reply(f"🚀 **Broadcast Started!** Sending to {len(users)} users...")
    
    done = 0
    failed = 0
    for user in users:
        try:
            await message.reply_to_message.copy(user['user_id'])
            done += 1
        except:
            failed += 1
        await asyncio.sleep(0.3) # Prevent flood
        
    await msg.edit(f"✅ **Broadcast Completed!**\n\nSuccess: {done}\nFailed: {failed}")
