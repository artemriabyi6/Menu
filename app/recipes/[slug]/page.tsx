
import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";
import RecipeView from "./RecipeView";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({
  params,
}: RecipePageProps) {
  const { slug } = await params;
  const recipe = recipes.find((item) => item.slug === slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeView recipe={recipe} />;
}
