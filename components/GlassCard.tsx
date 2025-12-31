
import React from 'react';

interface GlassCardProps {
  name: string;
  message: string | null;
  isLoading: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ name, message, isLoading }) => {
  return (
    <div className="animate-float w-full">
      <div className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700">
        
        {/* Animated Orbs Background */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="font-dancing text-5xl md:text-7xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00cc] via-[#ffffff] to-[#333399] drop-shadow-[0_0_15px_rgba(255,0,204,0.3)]">
            Happy New Year
          </h1>

          <span className="font-rhena text-[#ffd700] text-6xl md:text-8xl font-medium drop-shadow-[0_0_20px_rgba(253,215,0,0.4)] mb-8 tracking-tighter">
            {name}
          </span>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/40 italic text-sm font-light">Consulting the stars for your personalized message...</p>
            </div>
          ) : (
            <div className="space-y-6 max-w-lg">
              <p 
                key={message} 
                className="text-white/90 text-lg md:text-xl leading-relaxed font-light italic animate-fade-in-up"
              >
                {message || "Wishing you a year filled with endless possibilities, joy, and the strength to conquer all your dreams."}
              </p>
              
              <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold tracking-widest uppercase text-sm md:text-base animate-fade-in-up [animation-delay:0.3s]">
                <span className="w-4 h-[1px] bg-cyan-400/50"></span>
                <span>Top Position</span>
                <span className="w-4 h-[1px] bg-cyan-400/50"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
