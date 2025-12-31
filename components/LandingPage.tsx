
import React from 'react';

interface LandingPageProps {
  onPress: (e: React.MouseEvent | React.TouchEvent) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPress }) => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 h-full w-full">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      <div className="animate-fade-in-up flex flex-col items-center">
        <h2 className="text-white/30 text-xs md:text-sm tracking-[0.5em] uppercase mb-4 font-light">
          Midnight Whispers
        </h2>
        
        <h1 className="font-dancing text-4xl md:text-6xl text-white/90 mb-16 drop-shadow-lg">
          A Moment Just For You
        </h1>

        <button
          onClick={(e) => onPress(e)}
          className="group relative px-14 py-6 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] hover:border-white/20"
        >
          {/* Internal Shimmer Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          {/* Subtle button border glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

          <span className="relative z-10 text-white text-lg md:text-xl font-light tracking-[0.2em] transition-all duration-500 group-hover:tracking-[0.25em] group-hover:text-white">
            Press me
          </span>
          
          {/* Radial mouse glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />
        </button>

        <p className="mt-12 text-white/20 text-[10px] tracking-widest uppercase font-light animate-pulse">
          Step into 2026
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
