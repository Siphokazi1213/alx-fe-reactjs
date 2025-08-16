import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites.map(id =>
    state.recipes.find(recipe => recipe.id === id)
  ).filter(Boolean)); // Filter out any undefined recipes

  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">My Favorites ❤️</h2>
      {favorites.length > 0 ? (
        favorites.map(recipe => (
          <div key={recipe.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center transition-transform hover:scale-105">
            <Link to={`/recipes/${recipe.id}`} className="flex-1 text-blue-600 hover:underline">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
            </Link>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You haven't favorited any recipes yet!</p>
      )}
    </div>
  );
};

export default FavoritesList;