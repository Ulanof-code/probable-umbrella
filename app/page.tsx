"use client";

import WebApp from "@twa-dev/sdk";
import * as All from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import DrinkOrder from "../components/drinks/DrinkOrder";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (WebApp.initDataUnsafe.user) {
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function RecursiveWebApp({ data }: { data: any }) {
    // Сортируем ключи объекта по алфавиту
    const sortedEntries = Object.entries(data).sort((a, b) => 
      a[0].localeCompare(b[0], 'ru')
    );
  
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
            <div key={key} className="ml-4">
              <span className="font-bold">{key}:</span> {String(value)}
            </div>
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
      <h1 className="text-2xl font-bold mb-4">tgWebAppVersion</h1>
      {tgWebApp && <div>{tgWebApp.$version()}</div>}
      <h1 className="text-2xl font-bold mb-4">webAppVersion</h1>
      {webAppVersion && <div>{webAppVersion}</div>}
      <h1 className="text-2xl font-bold mb-4">webApp</h1>
      {webApp && <RecursiveWebApp data={webApp} />}
      <h1 className="text-2xl font-bold mb-4">tgWebApp</h1>
      {webApp && <RecursiveWebApp data={tgWebApp} />}
      {
        userData ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Hello, {userData.first_name}!</h1>
            <ul>
              <li>ID: {userData.id}</li>
              <li>First Name: {userData.first_name}</li>
              <li>Last Name: {userData.last_name}</li>
              <li>Username: {userData.username}</li>
              <li>Language Code: {userData.language_code}</li>
              <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
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
