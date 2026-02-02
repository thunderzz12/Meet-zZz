import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, Hand, MoreVertical, 
  Info, MessageSquare, Users, Gift, Smile, PlusCircle, X 
} from 'lucide-react';

export function ChatPreview() {
  // global count
  const [reactionCount, setReactionCount] = useState(() => {
    const cached = localStorage.getItem('meet_zzz_cached_count');
    return cached ? parseInt(cached, 10) : 1;
  });

  // local
  const [hasLiked, setHasLiked] = useState(() => {
    return !!localStorage.getItem('meet_zzz_has_liked');
  });
  const [isReacting, setIsReacting] = useState(false);

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/meet-zzz/heart')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setReactionCount(prev => {
            const newVal = Math.max(prev, data.count);
            localStorage.setItem('meet_zzz_cached_count', newVal.toString());
            return newVal;
          });
        }
      })
      .catch(err => {
        // if errorr
        console.warn('Could not fetch heart count:', err);
      });
      
      // retry if fail
    if (hasLiked && reactionCount === 1) {
      setHasLiked(false);
      localStorage.removeItem('meet_zzz_has_liked');
    }
  }, []);

  const handleReactionClick = () => {
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 500); // reset animation

    if (hasLiked) {
      console.log("You already liked it! But thanks for the enthusiasm.");
      return;
    }

    const newCount = reactionCount + 1;
    setReactionCount(newCount);
    setHasLiked(true);
    

    localStorage.setItem('meet_zzz_has_liked', 'true');
    localStorage.setItem('meet_zzz_cached_count', newCount.toString());

    // Actually tell the server
    fetch('https://api.counterapi.dev/v1/meet-zzz/heart/up')
      .catch(err => {
        console.error('Failed to increment reaction:', err);
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl bg-[#202124] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px] relative border border-[#3C4043]"
    >

      <div className="flex-1 flex overflow-hidden relative">  
        

        <div className="flex-1 p-4 flex flex-col gap-4 bg-[#202124]">  

           <div className="flex-1 bg-[#3C4043] rounded-xl relative overflow-hidden flex items-center justify-center group">
              <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold text-white">Y</div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/40 px-2 py-1 rounded">You</div>
              <div className="absolute top-3 right-3 bg-[#202124]/80 p-1.5 rounded-full">
                <MicOff size={16} className="text-red-500" />
              </div>
           </div>

           <div className="flex-1 bg-[#3C4043] rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold text-white">E</div>
              <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/40 px-2 py-1 rounded">Eren</div>
           </div>
        </div>

        <div className="w-80 bg-[#313338] border-l border-[#202124] flex flex-col shrink-0 z-10 shadow-xl">

           <div className="h-14 border-b border-[#26272D] flex items-center px-4 justify-between bg-[#2B2D31] shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                 <span className="text-white font-bold tracking-wide">Meet-zZz</span>
                 <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
              </div>
              <div className="p-1 hover:bg-[#3F4147] rounded cursor-pointer transition-colors">
                <X size={18} className="text-[#B5BAC1]" />
              </div>
           </div>

           <div className="flex-1 overflow-hidden p-3 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="flex gap-3 group animate-fade-in-up">
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs text-white font-bold">E</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-sm font-medium hover:underline cursor-pointer">Eren</span>
                    <span className="text-[10px] text-[#949BA4]">10:42 AM</span>
                  </div>
                  <p className="text-[#DBDEE1] text-sm">yo this extension is cool lowkey! <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f601.svg" alt="😁" className="w-5 h-5 inline-block align-bottom ml-0.5" /></p>
                  <div className="mt-1 flex gap-1 relative">
                    <motion.div 
                      onClick={handleReactionClick}
                      whileTap={{ scale: 0.9 }}
                      // glow
                      className={`bg-[#2B2D31] px-1.5 py-0.5 rounded flex items-center gap-1 border transition-all select-none cursor-pointer
                        ${isReacting 
                          ? 'border-pink-500/50 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                          : !hasLiked 
                            ? 'border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.15)] hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:border-pink-500/50' 
                            : 'border-transparent hover:border-[#4E5058]'
                        }
                      `}
                    >
                      <span className={`text-sm ${!hasLiked && !isReacting ? 'animate-pulse' : ''}`}>❤️</span>
                      <span className={`text-[10px] font-bold ${isReacting || !hasLiked ? 'text-pink-300' : 'text-[#B5BAC1]'}`}>{reactionCount}</span>
                    </motion.div>
                    <AnimatePresence>
                      {isReacting && (
                        <motion.span
                          initial={{ opacity: 1, y: 0, scale: 0.5 }}
                          animate={{ opacity: 0, y: -20, scale: 1.2 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-4 left-2 text-sm pointer-events-none"
                        >
                          ❤️
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 group animate-fade-in-up delay-100">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs text-white font-bold">Y</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-sm font-medium hover:underline cursor-pointer">You</span>
                    <span className="text-[10px] text-[#949BA4]">10:43 AM</span>
                  </div>
                  <p className="text-[#DBDEE1] text-sm">IKRR i love this</p>
                </div>
              </div>

              <div className="flex gap-3 group animate-fade-in-up delay-200">
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs text-white font-bold">E</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-sm font-medium hover:underline cursor-pointer">Eren</span>
                    <span className="text-[10px] text-[#949BA4]">10:45 AM</span>
                  </div>
                  <div className="bg-[#2B2D31] max-w-[200px] rounded-lg overflow-hidden mt-1 border border-[#1E1F22] relative group cursor-pointer">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                      <div className="h-28 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" 
                            alt="GIF" 
                            className="w-full h-full object-cover scale-[1.35]"
                          />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded z-20 font-bold">GIF</div>
                  </div>
                </div>
              </div>
           </div>

           <div className="p-3 bg-[#313338] shrink-0">
              <div className="bg-[#383A40] rounded-lg p-2 flex items-center gap-2">
                <PlusCircle size={18} className="text-[#B5BAC1] cursor-pointer hover:text-[#DBDEE1]" />
                <div className="flex-1 text-[#949BA4] text-sm">Message #meet-chat</div>
                <div className="flex items-center gap-2 text-[#B5BAC1]">
                  <div className="cursor-pointer hover:bg-[#4E5058] rounded px-1 h-5 flex items-center justify-center border border-[#B5BAC1] text-[#B5BAC1] hover:text-[#DBDEE1] text-[10px] font-bold">
                    GIF
                  </div>
                  <Smile size={18} className="cursor-pointer hover:text-[#DBDEE1]" />
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="h-16 bg-[#202124] border-t border-[#3C4043] flex items-center justify-between px-4 shrink-0 z-20">
         <div className="hidden sm:flex text-white text-sm font-medium select-none">
            10:45 AM | abc-defg-hij
         </div>


         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3C4043] hover:bg-[#474A4D] flex items-center justify-center cursor-pointer transition-colors border border-transparent hover:border-[#5F6368]">
               <Mic size={20} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#3C4043] hover:bg-[#474A4D] flex items-center justify-center cursor-pointer transition-colors border border-transparent hover:border-[#5F6368]">
               <Video size={20} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#3C4043] hover:bg-[#474A4D] flex items-center justify-center cursor-pointer transition-colors border border-transparent hover:border-[#5F6368] hidden sm:flex">
               <Hand size={20} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#EA4335] hover:bg-[#D93025] flex items-center justify-center cursor-pointer transition-colors shadow-lg">
               <PhoneOff size={20} className="text-white" />
            </div>
         </div>


         <div className="flex items-center gap-3 text-[#E8EAED]">
            <div className="hidden sm:flex items-center gap-3">
                <Info size={20} className="cursor-pointer hover:bg-[#3C4043] p-2 box-content rounded-full" />
                <Users size={20} className="cursor-pointer hover:bg-[#3C4043] p-2 box-content rounded-full" />
            </div>
            <div className="relative">
                <MessageSquare size={20} className="cursor-pointer bg-[#8AB4F8] text-[#202124] p-2 box-content rounded-full" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#202124]"></span>
            </div>
            <div className="hidden sm:block">
               <MoreVertical size={20} className="cursor-pointer hover:bg-[#3C4043] p-2 box-content rounded-full" />
            </div>
         </div>
      </div>
    </motion.div>
  );
}
