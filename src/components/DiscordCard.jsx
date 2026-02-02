import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Code2, Gamepad2, Moon, Sun, Monitor } from 'lucide-react';

const DISCORD_ID = "1408045901745885225";

export function DiscordCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        if (!response.ok) throw new Error('Failed to fetch status');
        
        const json = await response.json();
        if (json.success && json.data) {
          setUser(json.data);
          setError(null);
        } else {
          throw new Error('Invalid response from Lanyard');
        }
      } catch (err) {
        console.error("Lanyard Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) return null;

  if (loading || !user || !user.discord_user) {
    return (
      <div className="w-72 h-24 bg-[#1a1b1e]/50 rounded-3xl animate-pulse border border-white/5 flex items-center p-4 gap-4 backdrop-blur-sm">
         <div className="w-14 h-14 rounded-2xl bg-white/5"></div>
         <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-white/5 rounded-full"></div>
            <div className="h-2 w-12 bg-white/5 rounded-full"></div>
         </div>
      </div>
    );
  }

  const { discord_user, discord_status, activities, spotify } = user;
  
  const statusConfig = {
    online: { color: 'bg-emerald-400', shadow: 'shadow-emerald-400/20' },
    idle: { color: 'bg-amber-400', shadow: 'shadow-amber-400/20' },
    dnd: { color: 'bg-rose-400', shadow: 'shadow-rose-400/20' },
    offline: { color: 'bg-zinc-500', shadow: 'shadow-zinc-500/20' }
  };

  const status = statusConfig[discord_status] || statusConfig.offline;
  
  // priotiy
  const currentActivity = spotify || activities.find(a => a.name === 'Visual Studio Code') || activities[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-80 bg-[#111214]/80 backdrop-blur-xl rounded-[32px] p-5 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
    >
    
      <div className={`absolute -top-24 -right-24 w-64 h-64 ${status.color} opacity-[0.07] blur-[80px] rounded-full pointer-events-none`}></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-discord-blurple opacity-[0.05] blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="relative shrink-0">
          <img 
            src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`} 
            alt={discord_user.username}
            className="w-16 h-16 rounded-2xl shadow-lg object-cover ring-2 ring-white/5 bg-[#1a1b1e]"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[3px] border-[#111214] ${status.color} ${status.shadow} flex items-center justify-center`}>
            {discord_status === 'dnd' && <div className="w-2 h-0.5 bg-white/80 rounded-full" />}
            {discord_status === 'idle' && <div className="w-2 h-2 bg-[#111214] rounded-full -mt-1 -ml-1" />}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate tracking-tight">
            {discord_user.global_name || discord_user.username}
          </h3>
          <p className="text-gray-500 text-xs font-medium font-mono">
            @{discord_user.username}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentActivity && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 pt-4 border-t border-white/5"
          >
            <div className="flex items-center gap-3">
              {spotify ? (
                 <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                   <Music size={18} />
                   <div className="absolute inset-0 bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
              ) : currentActivity.name === 'Visual Studio Code' ? (
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                  <Code2 size={18} />
                  <div className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ) : (
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                  <Gamepad2 size={18} />
                  <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  {spotify ? 'Listening to' : currentActivity.name === 'Visual Studio Code' ? 'Coding' : 'Playing'}
                </p>
                <p className="text-sm font-medium text-gray-200 truncate">
                  {spotify ? spotify.song : currentActivity.name}
                </p>
                {(spotify || currentActivity.details) && (
                  <p className="text-xs text-gray-500 truncate">
                    {spotify ? spotify.artist : currentActivity.details}
                  </p>
                )}
              </div>
            </div>
            
            {spotify && (
              <div className="mt-3 flex gap-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-green-500/50 rounded-full h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: (spotify.timestamps.end - spotify.timestamps.start) / 1000, 
                    ease: "linear",
                    repeat: Infinity 
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
