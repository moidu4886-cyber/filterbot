import google.generativeai as genai
from bot_repo.config import Config

genai.configure(api_key=Config.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

async def ai_autofilter(user_query):
    """
    Translates natural language into database filters.
    Example: "Find 90s action movies" -> {"year": {"$gte": 1990, "$lte": 1999}, "genre": "Action"}
    """
    prompt = f"Convert this movie request into a JSON filter object for MongoDB: '{user_query}'"
    response = model.generate_content(prompt)
    try:
        # Simplified parsing logic for the repo example
        import json
        return json.loads(response.text)
    except:
        return {}
