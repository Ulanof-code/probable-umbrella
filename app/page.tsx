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

  const webAppVersion = typeof window !== 'undefined' ? WebApp.version : null;
  const webApp = typeof window !== 'undefined' ? WebApp : null;

  return (
    <main>
      {webAppVersion && <div>{webAppVersion}</div>}
      {webApp && <div>{JSON.stringify(webApp)}</div>}
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
