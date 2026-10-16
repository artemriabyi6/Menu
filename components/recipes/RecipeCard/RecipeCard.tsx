
import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import styles from "./RecipeCard.module.scss";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const recipeUrl = `/recipes/${recipe.slug}`;

  return (
    <article className={styles.card}>
      <Link
        href={recipeUrl}
        className={styles.imageLink}
        aria-label={`Переглянути рецепт: ${recipe.title}`}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, (max-width: 1499px) 33vw, 25vw"
            className={styles.image}
          />

          <span className={styles.category}>
            {recipe.category}
          </span>

          <span className={styles.imageArrow} aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden="true">
              ◷
            </span>
            {recipe.cookingTime} хв
          </span>

          <span className={styles.metaDivider} aria-hidden="true" />

          <span className={styles.metaItem}>
            <span className={styles.metaIcon} aria-hidden="true">
              ♧
            </span>
            {recipe.servings} порц.
          </span>
        </div>

        <Link href={recipeUrl} className={styles.titleLink}>
          <h3 className={styles.title}>{recipe.title}</h3>
        </Link>

        <p className={styles.description}>
          {recipe.description}
        </p>

        <Link href={recipeUrl} className={styles.readMore}>
          <span>Переглянути рецепт</span>
          <span className={styles.readMoreArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
