"use client";

import React, { useState } from "react";
import { DrinkHero } from "./DrinkHero";
import { DrinkCategories } from "./DrinkCategories";
import { DrinksList } from "./DrinksList";

interface Drink {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

function DrinkOrder() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Здесь будут ваши реальные данные
  const categories: Category[] = [
    { id: 1, name: "Кофе" },
    { id: 2, name: "Чай" },
    { id: 3, name: "Фреши" },
  ];

  const drinks: Drink[] = [
    { id: 1, name: "Латте", price: 200, image: "/drinks/latte.jpg", categoryId: 1 },
    // ... другие напитки
  ];

  return (
    <div className="flex flex-col w-full">
      <DrinkHero />
      <div className="px-4 py-6">
        <DrinkCategories 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <DrinksList 
          drinks={drinks.filter(drink => 
            selectedCategory ? drink.categoryId === selectedCategory : true
          )} 
        />
      </div>
    </div>
  );
}

export default DrinkOrder;