from pyrogram import Client
from bot_repo.config import Config

class AutofilterBot(Client):
    def __init__(self):
        super().__init__(
            name="AutofilterBot",
            api_id=Config.API_ID,
            api_hash=Config.API_HASH,
            bot_token=Config.BOT_TOKEN,
            plugins=dict(root="bot_repo/plugins")
        )

    async def start(self):
        await super().start()
        print("Bot Started! Powered by CineMatch AI Engine.")

    async def stop(self, *args):
        await super().stop()
        print("Bot Stopped.")

if __name__ == "__main__":
    bot = AutofilterBot()
    bot.run()
