from pyrogram import Client, filters
from bot_repo.config import Config
from bot_repo.database import db

@Client.on_message(filters.document | filters.video)
async def auto_index_handler(client, message):
    if message.chat.id not in Config.CHANNELS:
        return
        
    file = message.document or message.video
    file_name = getattr(file, 'file_name', 'Untitled')
    
    await db.save_file({
        "file_name": file_name,
        "file_id": file.file_id,
        "file_size": file.file_size,
        "chat_id": message.chat.id,
        "msg_id": message.id
    })
    
    # Log to secondary channel if needed
    if Config.LOG_CHANNEL != 0:
        await client.send_message(Config.LOG_CHANNEL, f"📝 Indexed: {file_name}")
