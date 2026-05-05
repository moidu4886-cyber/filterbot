import motor.motor_asyncio
from bot_repo.config import Config
import re

class Database:
    def __init__(self):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(Config.DATABASE_URI)
        self.db = self.client[Config.DATABASE_NAME]
        self.files = self.db[Config.COLLECTION_NAME]

    async def save_file(self, file_data):
        """Indexes a new file from channel"""
        return await self.files.update_one(
            {"file_id": file_data["file_id"]},
            {"$set": file_data},
            upsert=True
        )

    async def get_search_results(self, query, offset=0, limit=10):
        """Advanced Regex Search for Movies/Files"""
        # Multi-keyword matching logic
        keywords = query.split()
        regex_list = [re.compile(f".*{re.escape(k)}.*", re.IGNORECASE) for k in keywords]
        
        db_filter = {"file_name": {"$all": regex_list}}
        
        cursor = self.files.find(db_filter).skip(offset).limit(limit)
        results = await cursor.to_list(length=limit)
        total = await self.files.count_documents(db_filter)
        
        return results, total

db = Database()
