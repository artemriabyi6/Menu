
export type RecipeCategory =
  | "Усі"
  | "Сніданки"
  | "Обіди"
  | "Вечері"
  | "Десерти";

export type RecipeIngredient = {
  name: string;
  amount: number | null;
  unit?: string;
};

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: Exclude<RecipeCategory, "Усі">;
  cookingTime: number;
  servings: number;
  featured?: boolean;
  ingredients: RecipeIngredient[];
  steps: string[];
};
