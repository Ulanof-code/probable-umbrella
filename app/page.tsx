"use client";

import WebApp from "@twa-dev/sdk";
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
    // Расширяем приложение на весь экран
    WebApp.expand();
    console.log(WebApp);
    // Отключаем вертикальные свайпы
    WebApp.disableVerticalSwipes();
    // Опционально: скрыть основную кнопку, если она не нужна
    WebApp.MainButton.hide();
    // Опционально: установить заголовок
    WebApp.setHeaderColor("#000000");
    WebApp.setBackgroundColor("#FFFFFF");
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    };
  }, []);

  return (
    <main>
      <div>{JSON.stringify(WebApp)}</div>
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
