import { fetchRecipeById, fetchRecipes } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { memo } from 'react';

interface RecipePageProps {
  params: {
    id: string;
  };
}

const RecipePage = memo(async function RecipePage({ params }: RecipePageProps) {
  const recipeResponse = await fetchRecipeById(params.id);
  const recipe = recipeResponse.meals?.[0];

  if (!recipe) {
    notFound();
  }

  // Fetch related recipes from the same category
  const relatedRecipesResponse = await fetchRecipes({ c: recipe.strCategory });
  const relatedRecipes = relatedRecipesResponse.meals?.filter(
    (r) => r.idMeal !== recipe.idMeal
  ) || [];

  // Get ingredients with measures
  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((num) => {
      const ingredient = recipe[`strIngredient${num}` as keyof typeof recipe];
      const measure = recipe[`strMeasure${num}` as keyof typeof recipe];
      if (ingredient && ingredient.trim()) {
        return { ingredient, measure };
      }
      return null;
    })
    .filter((item): item is { ingredient: string; measure: string } => item !== null);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {recipe.strMeal}
          </h1>
          <div className="flex justify-center">
            <Link
              href={`/?a=${recipe.strArea}`}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {recipe.strArea} Cuisine
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden">
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Instructions</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Ingredients</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <Link
                    key={index}
                    href={`/?i=${ingredient}`}
                    className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">{measure}</span>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">{ingredient}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                More {recipe.strCategory} Recipes
              </h2>
              <div className="space-y-4">
                {relatedRecipes.slice(0, 5).map((relatedRecipe) => (
                  <Link
                    key={relatedRecipe.idMeal}
                    href={`/recipe/${relatedRecipe.idMeal}`}
                    className="block transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={relatedRecipe.strMealThumb}
                          alt={relatedRecipe.strMeal}
                          fill
                          className="object-cover"
                          sizes="64px"
                          priority
                        />
                      </div>
                      <span className="font-medium text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                        {relatedRecipe.strMeal}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RecipePage; 