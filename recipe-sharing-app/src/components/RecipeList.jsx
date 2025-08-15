import React from 'react';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500">No recipes added yet.</p>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;