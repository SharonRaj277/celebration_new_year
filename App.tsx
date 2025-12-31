
import React, { useState, useEffect, useCallback } from 'react';
import FireworksCanvas from './components/FireworksCanvas';
import GlassCard from './components/GlassCard';
import LandingPage from './components/LandingPage';
import HeartBurst from './components/HeartBurst';
import { generateNewYearMessage } from './services/geminiService';

const App: React.FC = () => {
  const [recipientName] = useState('Smita💖');
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number, y: number } | null>(null);

  const fetchAiMessage = useCallback(async (name: string) => {
    setIsLoading(true);
    try {
      const message = await generateNewYearMessage(name);
      setAiMessage(message);
    } catch (error) {
      console.error("Failed to generate AI message:", error);
      setAiMessage(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAiMessage(recipientName);
  }, [recipientName, fetchAiMessage]);

  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'clientX' in e ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX;
    const y = 'clientY' in e ? (e as React.MouseEvent).clientY : (e as React.TouchEvent).touches[0].clientY;
    
    setBurstOrigin({ x, y });
    setIsTransitioning(true);

    // After the heart animation starts, wait a bit then show the card with a push-in effect
    setTimeout(() => {
      setShowGreeting(true);
    }, 800);

    // Clean up transition state after everything is settled
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020205] flex items-center justify-center">
      {/* Heart burst overlay */}
      {isTransitioning && burstOrigin && (
        <HeartBurst x={burstOrigin.x} y={burstOrigin.y} />
      )}

      {!showGreeting ? (
        <div className={`w-full h-full transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
          <LandingPage onPress={handlePress} />
        </div>
      ) : (
        <div className="w-full h-full animate-push-in flex items-center justify-center relative">
          <FireworksCanvas />
          
          <div className="relative z-10 w-full max-w-2xl px-4 flex flex-col items-center gap-6">
            <GlassCard 
              name={recipientName} 
              message={aiMessage} 
              isLoading={isLoading} 
            />

            <div className="flex flex-col items-center gap-2">
              <p className="text-white/30 text-[10px] tracking-widest uppercase mt-4 pointer-events-none select-none animate-pulse">
                Touch to release butterflies
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
