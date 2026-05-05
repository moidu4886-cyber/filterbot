import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Github, 
  FileCode, 
  Settings, 
  Play, 
  Database, 
  Cpu, 
  Search,
  Bot,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from './lib/utils';
import { processMovieQuery } from './services/geminiService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Telegram Bot Simulator Online. Send a movie request to test the Autofilter logic." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestBot = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput("");
    setIsLoading(true);

    const result = await processMovieQuery(msg, {
        genres: [],
        minRating: 0,
        minRottenTomatoes: 0,
        minImdb: 0,
        startYear: 1900,
        endYear: 2025,
        searchQuery: "",
        moods: [],
        director: "",
        actors: [],
        keywords: []
    });

    setMessages(prev => [...prev, { role: 'bot', text: `[BOT LOGIC] AI parsed query and found ${result.recommendations?.length || 0} results.\n\n${result.message}` }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#e0e0e0] font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* GitHub Header */}
      <nav className="border-b border-white/5 bg-[#0A0A0A] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Github className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Repository</span>
            <span className="text-sm font-semibold">CineMatch-AI / advanced-autofilter-telegram</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('preview')}
            className={cn(
              "px-3 py-1 rounded flex items-center gap-2 text-xs transition-colors",
              activeTab === 'preview' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            )}
          >
            <Play className="w-3 h-3" /> Runtime Preview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={cn(
              "px-3 py-1 rounded flex items-center gap-2 text-xs transition-colors",
              activeTab === 'code' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
            )}
          >
            <FileCode className="w-3 h-3" /> Source Code
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar: Repo Structure */}
        <aside className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-4">
            <h3 className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mb-4">File Explorer</h3>
            <div className="space-y-1">
              <FileItem name="bot_repo/" icon={<Database className="w-3 h-3 text-cyan-400" />} />
              <div className="ml-4 space-y-1">
                <FileItem name="plugins/" icon={<Settings className="w-3 h-3 text-amber-500" />} />
                <div className="ml-4 space-y-1">
                   <FileItem name="autofilter.py" />
                   <FileItem name="commands.py" />
                </div>
                <FileItem name="bot.py" active />
                <FileItem name="database.py" />
                <FileItem name="ai_engine.py" />
                <FileItem name="config.py" />
              </div>
              <FileItem name="requirements.txt" />
              <FileItem name=".env.example" />
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-lg p-4">
             <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400">AI STATUS</span>
             </div>
             <p className="text-[10px] text-cyan-400/60 leading-relaxed uppercase tracking-wider">
                Gemini-1.5-Flash integration active. Natural language filtering enabled for repo modules.
             </p>
          </div>
        </aside>

        {/* Main Content: Preview or Code */}
        <main className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[600px]">
          {activeTab === 'preview' ? (
            <div className="flex-1 flex flex-col">
               <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Autofilter Bot Simulation</h4>
                    <span className="text-[9px] text-green-400 uppercase font-bold tracking-widest flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full" /> Live Listener
                    </span>
                  </div>
               </div>

               <div className="flex-1 p-6 space-y-4 overflow-y-auto font-sans">
                  {messages.map((msg, i) => (
                    <div key={i} className={cn(
                      "flex flex-col gap-1 max-w-[80%] whitespace-pre-wrap",
                      msg.role === 'user' ? "ml-auto" : ""
                    )}>
                      <div className={cn(
                        "px-4 py-2 rounded-xl text-sm",
                        msg.role === 'user' 
                          ? "bg-cyan-600 text-white" 
                          : "bg-white/10 text-white/80"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="p-4 bg-white/5 rounded-xl text-xs text-white/40 italic">
                      AI is parsing query and checking database...
                    </div>
                  )}
               </div>

               <div className="p-4 bg-[#050505] border-t border-white/5 flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Type a message to simulate Telegram command..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTestBot()}
                  />
                  <button 
                    onClick={handleTestBot}
                    className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ) : (
            <div className="flex-1 bg-[#050505] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs font-bold text-white/40">bot_repo/bot.py</span>
                </div>
                <button className="text-[10px] text-white/20 hover:text-white flex items-center gap-1 uppercase tracking-widest">
                  Copy code <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <pre className="text-xs text-white/60 overflow-x-auto leading-relaxed">
                <code>{`from pyrogram import Client\nfrom bot_repo.config import Config\n\nclass AutofilterBot(Client):\n    def __init__(self):\n        super().__init__(\n            name="AutofilterBot",\n            api_id=Config.API_ID,\n            api_hash=Config.API_HASH,\n            bot_token=Config.BOT_TOKEN,\n            plugins=dict(root="bot_repo/plugins")\n        )\n\nif __name__ == "__main__":\n    bot = AutofilterBot()\n    bot.run()`}</code>
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FileItem({ name, icon, active = false }: { name: string, icon?: React.ReactNode, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors text-[11px]",
      active ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white/60"
    )}>
      {icon || <Terminal className="w-3 h-3" />}
      <span>{name}</span>
    </div>
  );
}


