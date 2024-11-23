"use client";

import WebApp from "@twa-dev/sdk";
import * as All from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import DrinkOrder from "../components/drinks/DrinkOrder";
import { useTelegram } from "./hooks/useTelegram";
import SplashScreen from "../components/spalashScreen/SplashScreen";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

/**
 * хук useTelegram не работает, предстоит выяснить почему
 * используем window.Telegram?.WebApp
 */

export default function Home() {

  const { isFullscreen, isActive, isLoaded, showPopup, user } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.Telegram?.WebApp?.showPopup({
          message: "Hello, world!",
        });
      WebApp.ready();
    }
  }, []);

  useEffect(() => {
    // Здесь инициализируем все необходимые ресурсы
    const initializeApp = async () => {
      if (typeof window !== 'undefined') {
        // Инициализация WebApp
        WebApp.ready();
        setIsAppReady(true);
      }
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    if (isAppReady) {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function RecursiveWebApp({ data }: { data: any }) {
    // Сортируем ключи объекта по алфавиту
    const sortedEntries = Object.entries(data).sort((a, b) => 
      a[0].localeCompare(b[0], 'ru')
    );

    if (isLoading) {
      return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
    }
  
    return (
      <div>
        {sortedEntries.map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return (
              <li key={key} className="ml-4">
                <h3 className="font-bold">{key}:</h3>
                <RecursiveWebApp data={value} />
              </li>
            );
          }
          return (
            <li key={key} className="ml-4">
              <span className="font-bold">{key}:</span> {String(value)}
            </li>
          );
        })}
      </div>
    );
  }
  

  const webAppVersion = typeof window !== 'undefined' ? WebApp.version : null;
  const webApp = typeof window !== 'undefined' ? WebApp : null;
  const tgWebApp = typeof window !== 'undefined' ? All : null;


  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">isActive</h1>
      {typeof window !== 'undefined' && <div>{isLoaded ? "Yes" : "No"}</div>}
      <h1 className="text-2xl font-bold mb-4">tgWebAppVersion</h1>
      {tgWebApp && <div>{tgWebApp.$version()}</div>}
      <h1 className="text-2xl font-bold mb-4">webAppVersion</h1>
      {webAppVersion && <div>{webAppVersion}</div>}
      <h1 className="text-2xl font-bold mb-4">webApp</h1>
      {webApp && <RecursiveWebApp data={webApp} />}
      <h1 className="text-2xl font-bold mb-4">tgWebApp</h1>
      {webApp && <RecursiveWebApp data={tgWebApp} />}
      {
        user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Hello, {user.first_name}!</h1>
            <ul>
              <li>ID: {user.id}</li>
              <li>First Name: {user.first_name}</li>
              <li>Last Name: {user.last_name}</li>
              <li>Username: {user.username}</li>
              <li>Language Code: {user.language_code}</li>
              <li>Is Premium: {user.is_premium ? "Yes" : "No"}</li>
            </ul>
          </div>
        ) : (
          <div>Loading...</div>
        )
      }
      <Button>Click me</Button>
      <DrinkOrder />
    </main>
  );
}
