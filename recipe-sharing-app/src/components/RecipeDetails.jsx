import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import ConfirmationModal from './ConfirmationModal';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(id) || r.id === id)
  );
  const isFavorite = useRecipeStore(state => state.favorites.includes(recipe?.id));
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [showModal, setShowModal] = useState(false);

  if (!recipe) {
    return <div className="text-center text-red-500 text-xl font-semibold">Recipe not found!</div>;
  }

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteRecipe(recipe.id);
    setShowModal(false);
    navigate('/');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
  };

  return (
    <>
      <div className="p-8 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {isFavorite ? 'Unfavorite ❤️' : 'Favorite ♡'}
          </button>
        </div>
        {recipe.ingredients && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Ingredients</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex space-x-4 mt-6">
          <Link
            to={`/recipes/${recipe.id}/edit`}
            className="flex-1 text-center bg-yellow-500 text-white p-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
          >
            Edit Recipe
          </Link>
          <button
            onClick={handleDeleteClick}
            className="flex-1 bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Delete Recipe
          </button>
          <Link
            to="/"
            className="flex-1 text-center bg-gray-300 text-gray-800 p-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
          >
            Back to List
          </Link>
        </div>
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

export default RecipeDetails;