import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipesData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Link
                  to={`/recipe/${recipe.id}`} // Use Link for internal navigation
                  className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;