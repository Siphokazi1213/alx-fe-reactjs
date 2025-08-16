import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import ConfirmationModal from './ConfirmationModal';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const handleDeleteClick = (recipeId) => {
    setRecipeToDelete(recipeId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      setRecipeToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center transition-transform hover:scale-105">
              <Link to={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{recipe.description.substring(0, 75)}...</p>
              </Link>
              <div className="space-x-2">
                <Link to={`/recipes/${recipe.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors">
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteClick(recipe.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No recipes found. Try a different search term or add a new recipe.</p>
        )}
      </div>
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this recipe?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default RecipeList;