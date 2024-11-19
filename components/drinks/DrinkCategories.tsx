"use client";

import { Button } from "@nextui-org/button";

interface CategoryProps {
  categories: Array<{ id: number; name: string }>;
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export function DrinkCategories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          color={selectedCategory === category.id ? "primary" : "default"}
          variant={selectedCategory === category.id ? "solid" : "bordered"}
          onPress={() => onSelectCategory(
            selectedCategory === category.id ? null : category.id
          )}
          className="min-w-fit"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}