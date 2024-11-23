'use client';

import { useState, useEffect } from 'react';
import SplashScreen from '../spalashScreen/SplashScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          // Ваши промисы загрузки
        ]);
        setIsAppReady(true);
      } catch (error) {
        console.error('Ошибка инициализации:', error);
      }
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    if (isAppReady) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <>{children}</>;
}