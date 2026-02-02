import React, { useState, useEffect, useMemo } from 'react';
import { DiscordCard } from '../components/DiscordCard';
import { ChatPreview } from '../components/ChatPreview';
import { changelogData } from '../data/changelog';
import { MessageCircle, Shield, Zap, Download, History, ArrowRight, Terminal, Sparkles, Code, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Config---

const FEATURES = [
  {
    id: 'chat',
    icon: <MessageCircle size={32} className="text-green-500" />,
    title: "Real-time Chat",
    desc: "Instant messaging powered by WebSockets. Fast and reliable.",
    delay: 0
  },
  {
    id: 'gifs',
    icon: <Zap size={32} className="text-yellow-500" />,
    title: "GIFs & Emojis",
    desc: "Built-in Giphy integration and custom emoji picker.",
    delay: 0.1
  },
  {
    id: 'privacy',
    icon: <Shield size={32} className="text-discord-blurple" />,
    title: "Privacy Focused",
    desc: "Your data stays local. No external tracking or storage.",
    delay: 0.2
  },
  {
    id: 'opensource',
    icon: <Code size={32} className="text-pink-500" />,
    title: "Open Source",
    desc: "Built with React 19 & Vite. View the code on GitHub.",
    delay: 0.3
  },
  {
    id: 'lightweight',
    icon: <Cpu size={32} className="text-blue-400" />,
    title: "Lightweight",
    desc: "Optimized for performance and low memory usage.",
    delay: 0.4
  },
  {
    id: 'ui',
    icon: <Sparkles size={32} className="text-purple-500" />,
    title: "Modern UI",
    desc: "Clean dark mode interface with smooth animations.",
    delay: 0.5
  }
];

// generste git logs from changlog 
const getLatestLogs = () => {
  const logs = [];
  let count = 0;
  const MAX_LOGS = 5;

  // process data to flatten it into commits type thingy
  for (const version of changelogData) {
    if (count >= MAX_LOGS) break;
    
    for (const change of version.changes) {
      if (count >= MAX_LOGS) break;
      
      const prefix = change.type === 'added' ? 'feat' : change.type === 'fixed' ? 'fix' : 'chore';
      
      for (const item of change.items) {
        if (count >= MAX_LOGS) break;

        // cleanup
        let cleanMsg = item.replace(/\*\*/g, '').replace(/`/g, '');
        if (cleanMsg.length > 60) {
          cleanMsg = cleanMsg.substring(0, 57) + '...';
        }

        const hash = Math.abs(cleanMsg.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0)).toString(16).substring(0, 7);

        logs.push({
          hash,
          msg: `${prefix}: ${cleanMsg}`,
          color: 'text-discord-blurple'
        });
        count++;
      }
    }
  }
  return logs;
};

const GIT_LOGS = getLatestLogs();


const useMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

// --- Components-- -

export function Home() {
  const isMounted = useMounted();


  if (!isMounted) {
    return <div className="min-h-screen bg-[#313338]" />; 
  }

  return (
    <div className="min-h-screen bg-[#313338] text-discord-text selection:bg-discord-blurple selection:text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#2B2D31]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-noise"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-discord-blurple/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="relative">
                <div className="absolute -left-8 -top-8 w-32 h-32 bg-discord-blurple/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight flex flex-col gap-2">
                  <span>Meet-zZz</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-discord-blurple to-indigo-400 text-4xl md:text-6xl mt-2 font-bold">Discordify Your Meet</span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                The ultimate Chrome extension that brings the Discord experience directly into Google Meet. Chat, share GIFs, and react in style.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#contact" className="group bg-discord-blurple hover:bg-discord-blurple/90 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl hover:shadow-discord-blurple/25 flex items-center justify-center gap-3">
                  <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                  Get Extension
                </a>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-[#4E5058] hover:bg-[#5c5e66] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                  Features
                </a>
                <Link to="/changelog" className="group bg-[#4E5058] hover:bg-[#5c5e66] text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3">
                  <History size={20} className="group-hover:rotate-12 transition-transform" />
                  Changelog
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center lg:justify-end relative"
            >
              <div className="absolute -inset-4 bg-discord-blurple/20 rounded-full blur-3xl animate-pulse"></div>
              <ChatPreview />
            </motion.div>
          </div>
        </div>
      </div>

      <div id="features" className="py-32 bg-[#313338] relative overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-discord-blurple/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-pink-500/10 rounded-full blur-[128px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              Why you'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">actually use this</span>
            </motion.h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Essential features for a better meeting experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard 
                key={feature.id}
                {...feature}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-32 bg-[#2B2D31] border-y border-[#1E1F22] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-white">
                Always <span className="text-discord-blurple">Evolving</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Regular updates and improvements. Check the changelog for the latest features and fixes.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Active Development</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  
                </div>
              </div>

              <Link to="/changelog" className="inline-flex items-center gap-2 text-white bg-[#1E1F22] hover:bg-[#111214] px-6 py-3 rounded-lg font-mono border border-gray-700 transition-colors group">
                <Terminal size={18} />
                <span>view_changelog.sh</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-2" />
              </Link>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111214] rounded-xl overflow-hidden shadow-2xl border border-[#1E1F22] font-mono text-sm"
            >
              <div className="bg-[#1E1F22] px-4 py-3 flex items-center gap-2 border-b border-[#111214]">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-500">meet-zzz — -zsh — 80x24</div>
              </div>
              <div className="p-6 text-gray-300 space-y-4 font-mono">
                <div>
                  <span className="text-green-500">➜</span> <span className="text-blue-400">~/meet-zzz</span> <span className="text-yellow-500">git log --oneline -n 5</span>
                </div>
                <div className="space-y-2 pl-4 text-xs md:text-sm opacity-80">
                  {GIT_LOGS.map((log) => (
                    <div key={log.hash} className="flex gap-3">
                      <span className={log.color}>{log.hash}</span>
                      <span>{log.msg}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-green-500">➜</span> <span className="text-blue-400">~/meet-zzz</span> <span className="animate-pulse">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div id="contact" className="py-32 bg-[#1E1F22] relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-discord-blurple/20 via-transparent to-pink-500/20"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Ready to get <span className="text-transparent bg-clip-text bg-gradient-to-r from-discord-blurple to-white">Started?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              This extension is currently not on Chrome Web Store. To get access to the source code or the built extension, please reach out directly on Discord.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-discord-blurple to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <DiscordCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-12 bg-[#111214] border-t border-[#1E1F22]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/icon.png" alt="Footer Logo" className="w-10 h-10 rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-opacity" />
            <span className="font-bold text-white text-xl">Meet-zZz</span>
          </button>
          <div className="text-discord-muted text-sm text-center md:text-right">
            <p>© 2026 Meet-zZz Project.</p>
            <p className="mt-1">Built with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = React.memo(function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-[#2B2D31] p-8 rounded-2xl border border-[#1E1F22] hover:border-discord-blurple/50 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover:bg-discord-blurple/10 transition-colors"></div>
      
      <div className="mb-6 bg-[#313338] w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-[#1E1F22]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-discord-blurple transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
});
