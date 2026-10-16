
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import styles from "./page.module.scss";

type RecipeViewProps = {
  recipe: Recipe;
};

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function RecipeView({ recipe }: RecipeViewProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Home Menu — на головну"
        >
          <span className={styles.logoIcon}>h.</span>
          <span>home menu</span>
        </Link>

        <Link href="/#recipes" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          Усі рецепти
        </Link>
      </header>

      <article className={styles.recipe}>
        <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
          <Link href="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#categories">{recipe.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{recipe.title}</span>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
              className={styles.image}
            />

            <span className={styles.category}>
              {recipe.category}
            </span>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              ДОМАШНЯ КУЛІНАРНА КНИГА
            </span>

            <h1>{recipe.title}</h1>

            <p className={styles.description}>
              {recipe.description}
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statIcon} aria-hidden="true">
                  ◷
                </span>

                <div>
                  <span className={styles.statLabel}>
                    Час приготування
                  </span>
                  <strong>{recipe.cookingTime} хв</strong>
                </div>
              </div>

              <div className={styles.stat}>
                <span className={styles.statIcon} aria-hidden="true">
                  ♧
                </span>

                <div>
                  <span className={styles.statLabel}>
                    Кількість порцій
                  </span>
                  <strong>{servings}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.recipeLayout}>
          <aside className={styles.ingredientsPanel}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.sectionEyebrow}>
                  ПІДГОТОВКА
                </span>
                <h2>Інгредієнти</h2>
              </div>

              <span className={styles.ingredientCount}>
                {checkedIngredients.length}/{recipe.ingredients.length}
              </span>
            </div>

            <p className={styles.panelDescription}>
              Позначай продукти, які вже підготував.
            </p>

            <div className={styles.servingsControl}>
              <span>Порції</span>

              <div className={styles.servingsButtons}>
                <button
                  type="button"
                  onClick={() =>
                    setServings((value) => Math.max(1, value - 1))
                  }
                  disabled={servings <= 1}
                  aria-label="Зменшити кількість порцій"
                >
                  −
                </button>

                <strong aria-live="polite">{servings}</strong>

                <button
                  type="button"
                  onClick={() => setServings((value) => value + 1)}
                  aria-label="Збільшити кількість порцій"
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.ingredientList}>
              {recipe.ingredients.map((ingredient, index) => {
                const checked = checkedIngredients.includes(index);

                const scaledAmount =
                  ingredient.amount === null
                    ? null
                    : (ingredient.amount * servings) / recipe.servings;

                const quantity =
                  scaledAmount === null
                    ? ingredient.unit ?? "за смаком"
                    : `${formatAmount(scaledAmount)}${
                        ingredient.unit ? ` ${ingredient.unit}` : ""
                      }`;

                return (
                  <label
                    key={`${ingredient.name}-${index}`}
                    className={`${styles.ingredient} ${
                      checked ? styles.ingredientChecked : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleIngredient(index)}
                    />

                    <span
                      className={styles.customCheckbox}
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    <span className={styles.ingredientName}>
                      {ingredient.name}
                    </span>

                    <span className={styles.ingredientAmount}>
                      {quantity}
                    </span>
                  </label>
                );
              })}
            </div>

            {checkedIngredients.length > 0 && (
              <button
                type="button"
                className={styles.resetIngredients}
                onClick={() => setCheckedIngredients([])}
              >
                Скинути позначки
              </button>
            )}
          </aside>

          <section className={styles.stepsSection}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.sectionEyebrow}>
                  ГОТУЄМО РАЗОМ
                </span>
                <h2>Приготування</h2>
              </div>

              <span className={styles.ingredientCount}>
                {completedSteps.length}/{recipe.steps.length}
              </span>
            </div>

            <p className={styles.panelDescription}>
              Виконуй кроки по черзі та позначай завершені.
            </p>

            <div className={styles.stepsList}>
              {recipe.steps.map((step, index) => {
                const completed = completedSteps.includes(index);

                return (
                  <button
                    type="button"
                    key={`${recipe.slug}-step-${index}`}
                    className={`${styles.step} ${
                      completed ? styles.stepCompleted : ""
                    }`}
                    onClick={() => toggleStep(index)}
                    aria-pressed={completed}
                  >
                    <span className={styles.stepNumber}>
                      {completed
                        ? "✓"
                        : String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.stepText}>
                      {step}
                    </span>
                  </button>
                );
              })}
            </div>

            {completedSteps.length === recipe.steps.length && (
              <div className={styles.successMessage} role="status">
                <span aria-hidden="true">✳</span>
                Чудова робота! Усі кроки виконано.
              </div>
            )}
          </section>
        </div>

        <footer className={styles.recipeFooter}>
          <span>Смачного!</span>

          <Link href="/#recipes">
            Повернутися до рецептів ↑
          </Link>
        </footer>
      </article>
    </main>
  );
}
