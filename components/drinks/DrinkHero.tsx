"use client";

import { Image } from "@nextui-org/react";

export function DrinkHero() {
  return (
    <div className="relative h-screen">
      <Image
        src="/images/drinks/hero-drink.jpg" // Обновленный путь к изображению
        alt="Featured drink"
        className="w-full h-full object-cover"
        removeWrapper
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <h1 className="text-white text-2xl font-bold">Латте</h1>
        <p className="text-white text-xl">200 ₽</p>
      </div>
    </div>
  );
}