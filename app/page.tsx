
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { recipes } from "@/data/recipes";
import type { RecipeCategory } from "@/types/recipe";
import RecipeCard from "@/components/recipes/RecipeCard/RecipeCard";
import styles from "./page.module.scss";

const categories: RecipeCategory[] = [
  "Усі",
  "Сніданки",
  "Супи",
  "Основні страви",
  "Десерти",
  "Салати"
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] =
    useState<RecipeCategory>("Усі");
  const [search, setSearch] = useState("");

  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<
    Partial<Record<RecipeCategory, HTMLButtonElement | null>>
  >({});

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("uk");

    return recipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === "Усі" ||
        recipe.category === activeCategory;

      const matchesSearch =
        !query ||
        `${recipe.title} ${recipe.description} ${recipe.category}`
          .toLocaleLowerCase("uk")
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const featuredRecipes = recipes.filter(
    (recipe) => recipe.featured,
  );

  useEffect(() => {
    const container = categoriesRef.current;
    const activeButton = categoryButtonRefs.current[activeCategory];

    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const isOutsideLeft = buttonRect.left < containerRect.left;
    const isOutsideRight = buttonRect.right > containerRect.right;

    if (isOutsideLeft || isOutsideRight) {
      const targetLeft =
        activeButton.offsetLeft -
        (container.clientWidth - activeButton.offsetWidth) / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
          ? "auto"
          : "smooth",
      });
    }
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <main className={styles.main} id="top">
      {/* <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Home Menu — на початок">
          <span className={styles.logoIcon}>h.</span>
          <span>home menu</span>
        </Link>

        <nav className={styles.nav} aria-label="Головна навігація">
          <a href="#recipes">Рецепти</a>
          <a href="#categories">Категорії</a>
        </nav>

        <a href="#recipes" className={styles.headerButton}>
          Знайти страву <span aria-hidden="true">↗</span>
        </a>
      </header> */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Твоя домашня кулінарна книга
          </span>

          <h1>
            Смачні моменти
            <br />
            починаються <em>вдома.</em>
          </h1>

          <p className={styles.heroDescription}>
            Улюблені рецепти, прості інгредієнти
            та натхнення для кожного дня.
          </p>

          <form
            className={styles.search}
            onSubmit={(event) => {
              event.preventDefault();
              scrollToSection("recipes");
            }}
          >
            <span className={styles.searchIcon} aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Знайти улюблену страву..."
              aria-label="Пошук рецептів"
            />

            {search && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearch("")}
                aria-label="Очистити пошук"
              >
                ×
              </button>
            )}

            <button type="submit" className={styles.searchButton}>
              Шукати
            </button>
          </form>

          <div className={styles.heroNote}>
            <span>✳</span>
            Перевірені ідеї для твого столу
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div
            className={styles.heroImage}
            role="img"
            aria-label="Апетитна домашня страва"
          />

          <div className={styles.floatingCard}>
            <span className={styles.floatingIcon}>✳</span>
            <div>
              <strong>З любов’ю до їжі</strong>
              <p>Щось смачне завжди поруч</p>
            </div>
          </div>

          <div className={styles.heroLabel}>
            <span>01 / 08</span>
            <span>Everyday cooking</span>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              НАШ ВИБІР
            </span>
            <h2>Спробуй сьогодні</h2>
          </div>

          <a href="#recipes" className={styles.textLink}>
            Усі рецепти <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.featuredGrid}>
          {featuredRecipes.map((recipe) => (
            <Link
              href={`/recipes/${recipe.slug}`}
              key={recipe.id}
              className={styles.featuredCard}
            >
              <div
                className={styles.featuredImage}
                style={{ backgroundImage: `url("${recipe.image}")` }}
              />
              <div className={styles.featuredInfo}>
                <span>{recipe.category}</span>
                <h3>{recipe.title}</h3>
                <p>
                  {recipe.cookingTime} хвилин · {recipe.servings} порцій
                </p>
              </div>
              <span className={styles.featuredArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.recipesSection} id="recipes">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              НАТХНЕННЯ НА КОЖЕН ДЕНЬ
            </span>
            <h2>Що приготуємо?</h2>
          </div>

          <span className={styles.recipeCount}>
            {filteredRecipes.length} рецептів
          </span>
        </div>

        <div
          className={styles.categories}
          id="categories"
          ref={categoriesRef}
          role="group"
          aria-label="Фільтр рецептів за категорією"
        >
          {categories.map((category) => (
            <button
              key={category}
              ref={(element) => {
                categoryButtonRefs.current[category] = element;
              }}
              type="button"
              className={`${styles.categoryButton} ${
                activeCategory === category
                  ? styles.categoryActive
                  : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className={styles.recipeGrid}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span>⌕</span>
            <h3>Нічого не знайшлося</h3>
            <p>Спробуй іншу назву або вибери іншу категорію.</p>
            <button
              type="button"
              className={styles.resetButton}
              onClick={() => {
                setSearch("");
                setActiveCategory("Усі");
              }}
            >
              Показати всі рецепти
            </button>
          </div>
        )}
      </section>

      {/* <footer className={styles.footer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>h.</span>
          <span>home menu</span>
        </Link>

        <p>Створено вдома, з любов’ю до їжі.</p>

        <a href="#top" className={styles.backToTop}>
          На початок ↑
        </a>
      </footer> */}
    </main>
  );
}
