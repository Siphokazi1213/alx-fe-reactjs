import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">For You ✨</h2>
        <button
          onClick={generateRecommendations}
          className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors"
        >
          Refresh
        </button>
      </div>
      {recommendations.length > 0 ? (
        recommendations.map(recipe => (
          <div key={recipe.id} className="p-4 bg-gray-100 rounded-lg transition-transform hover:scale-105">
            <Link to={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{recipe.description.substring(0, 75)}...</p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Favorite some recipes to get recommendations!</p>
      )}
    </div>
  );
};

export default RecommendationsList;