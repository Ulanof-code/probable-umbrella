"use client";

import { Card } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

interface Drink {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface DrinksListProps {
  drinks: Drink[];
}

export function DrinksList({ drinks }: DrinksListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {drinks.map((drink) => (
        <Card key={drink.id} className="p-2">
          <Image
            src={drink.image}
            alt={drink.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="mt-2">
            <h3 className="text-sm font-semibold">{drink.name}</h3>
            <p className="text-sm text-default-500">{drink.price} ₽</p>
          </div>
        </Card>
      ))}
    </div>
  );
}