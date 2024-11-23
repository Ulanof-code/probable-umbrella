'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  minimumLoadTimeMs?: number;
  onLoadingComplete: () => void;
}

export default function SplashScreen({ 
  minimumLoadTimeMs = 2000,
  onLoadingComplete 
}: SplashScreenProps) {
  const [isMinimumTimeElapsed, setIsMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumTimeElapsed(true);
    }, minimumLoadTimeMs);

    return () => clearTimeout(timer);
  }, [minimumLoadTimeMs]);

  useEffect(() => {
    if (isMinimumTimeElapsed) {
      onLoadingComplete();
    }
  }, [isMinimumTimeElapsed, onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        <div className="text-white text-2xl mt-4">Loading...</div>
      </div>
    </div>
  );
}