class Script:
    START_TXT = """<b>Hello {user}!</b>

I am an advanced Autofilter Bot. Send me a movie name or a complex request like 'Find dark psychological thrillers from the 90s' and my AI will find it for you!

<b>Main Features:</b>
• AI-Driven Query Correction
• Instant Search in Groups
• Advanced File Indexing
• Pagination Support
"""

    HELP_TXT = """<b>Autofilter Bot Help</b>

<b>Commands:</b>
• /start - Check if I'm alive
• /help - Show this message
• /index - (Admin Only) Index files from a channel
• /broadcast - (Admin Only) Send message to users

<b>How to use:</b>
Simply add me to your group and make me admin. When someone sends a movie name, I will provide the link instantly!
"""

    NOT_FOUND = "❌ Unfortunately, no files found for <b>'{}'</b>. Try checking the spelling or use different keywords."
    CAPTION = "🎬 <b>File:</b> <code>{}</code>\n\n✨ <i>Powered by AI Engine</i>"
