import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { changelogData } from '../data/changelog';
import { ArrowLeft, GitCommit, CheckCircle, PlusCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// hardcoded color
const TYPE_ICONS = {
  added: { 
    icon: PlusCircle, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10', 
    borderColor: 'border-green-500/20' 
  },
  fixed: { 
    icon: CheckCircle, 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/10', 
    borderColor: 'border-orange-500/20' 
  },
  changed: { 
    icon: GitCommit, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    borderColor: 'border-blue-500/20' 
  }
};

// smple parser 
const formatText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-[#1E1F22] px-1 rounded text-xs font-mono text-discord-text border border-[#3F4147]">$1</code>');
};

export function ChangelogPage() {
  // incase somehow shipped without data
  const hasData = changelogData && changelogData.length > 0;

  return (
    <div className="min-h-screen bg-[#313338] text-discord-text selection:bg-discord-blurple selection:text-white pb-20">
      
   
      <div className="bg-[#2B2D31] border-b border-[#1E1F22] sticky top-0 z-50 shadow-xl">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="bg-discord-blurple w-3 h-3 rounded-full animate-pulse"></span>
            Changelog
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {!hasData ? (
          <div className="text-center py-20 text-gray-500">
            <p>No changelogs found. Did thunderzz forget to push the file?</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#4E5058]/50 md:left-1/2 md:-ml-px"></div>

            {changelogData.map((version, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={version.version || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-16 md:flex ${isEven ? 'md:flex-row-reverse' : ''} items-center justify-between`}
                >
                  
                  {/* timeline Dot */}
                  <div className="absolute left-8 -translate-x-1/2 md:left-1/2 md:translate-x-[-50%] w-6 h-6 rounded-full bg-[#2B2D31] border-4 border-discord-blurple shadow-[0_0_15px_rgba(88,101,242,0.5)] z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>

                  <div className={`hidden md:block w-[45%] text-center ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="inline-flex items-center gap-2 text-discord-muted font-mono text-sm bg-[#1E1F22] px-3 py-1 rounded-full border border-[#2B2D31]">
                      <Clock size={14} />
                      {version.date}
                    </div>
                  </div>


                  <div className="ml-20 md:ml-0 w-[calc(100%-5rem)] md:w-[45%]">
                    <div className="bg-[#2B2D31] rounded-2xl p-6 border border-[#1E1F22] shadow-xl hover:border-discord-blurple/30 transition-all hover:-translate-y-1">
                      
                      <div className="flex items-center justify-between mb-6 border-b border-[#3F4147] pb-4">
                        <h2 className="text-2xl font-black text-white">v{version.version}</h2>
                        {/* Mobile Date vieww */}
                        <div className="md:hidden text-discord-muted text-xs font-mono bg-[#1E1F22] px-2 py-1 rounded-md">
                          {version.date}
                        </div>
                      </div>

                      <div className="space-y-6"> 
                        {version.changes.map((change, i) => {
                          const config = TYPE_ICONS[change.type] || TYPE_ICONS.changed; // fallback to 'changed' if type is unknown
                          const TypeIcon = config.icon;
                          
                          return (
                            <div key={i} className="group">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`p-1 rounded ${config.bg} ${config.color}`}>
                                  <TypeIcon size={14} />
                                </span>
                                <h3 className={`font-bold text-sm uppercase tracking-wider ${config.color}`}>
                                  {change.title}
                                </h3>
                              </div>
                              <ul className="space-y-2 pl-7">
                                {change.items.map((item, j) => (
                                  <li key={j} className="text-gray-300 text-sm leading-relaxed list-disc marker:text-[#4E5058]">
                                    <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
        
        <div className="text-center pb-12">
           <div className="inline-block p-4 rounded-full bg-[#2B2D31] border border-[#1E1F22] text-discord-muted text-sm">
             🌱 Project Started on Jan 14, 2026
           </div>
        </div>
      </div>
    </div>
  );
}
