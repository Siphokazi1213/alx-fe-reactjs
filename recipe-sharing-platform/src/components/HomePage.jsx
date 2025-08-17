import React, { useState, useEffect } from 'react';
import recipesData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch data from an API here.
    // For this activity, we import it directly.
    setRecipes(recipesData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Recipe Sharing Platform</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{recipe.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{recipe.summary}</p>
              <div className="mt-4">
                <a
                  href={`/recipe/${recipe.id}`} // Placeholder for detailed view link
                  className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;