import { fetchRecipes } from '@/lib/api';
import RecipeCard from '@/components/RecipeCard';
import { memo } from 'react';

interface HomePageProps {
  searchParams: {
    s?: string;
    i?: string;
    c?: string;
    a?: string;
  };
}

const Home = memo(async function Home({ searchParams }: HomePageProps) {
  const params = await Promise.resolve(searchParams);
  const data = await fetchRecipes(params);
  const recipes = data.meals || [];

  // Generate title based on filters
  let title = 'All Recipes';
  if (params.s) title = `Search Results for "${params.s}"`;
  if (params.i) title = `Recipes with ${params.i}`;
  if (params.c) title = `${params.c} Recipes`;
  if (params.a) title = `${params.a} Cuisine`;

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {title}
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Discover amazing recipes from around the world
          </p>
        </div>
        
        {recipes.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-12 text-center">
            <p className="text-gray-500 text-xl">No recipes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                id={meal.idMeal}
                name={meal.strMeal}
                image={meal.strMealThumb}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
});

export default Home;