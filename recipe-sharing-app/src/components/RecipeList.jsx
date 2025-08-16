import { useRecipeStore } from '../recipeStore';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
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
        {recipes.length > 0 ? (
          recipes.map(recipe => (
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
          <p className="text-center text-gray-500">No recipes added yet! Add one using the form above.</p>
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

// src/components/RecipeDetails.jsx
import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(id))
  );
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

  return (
    <>
      <div className="p-8 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
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

// src/components/EditRecipeForm.jsx
import React, { useState } from 'react';
import { useRecipeStore } from '../recipeStore';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const recipeToEdit = recipes.find(r => r.id === parseInt(id));

  const [title, setTitle] = useState(recipeToEdit?.title || '');
  const [description, setDescription] = useState(recipeToEdit?.description || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !description || !recipeToEdit) return;
    updateRecipe({ id: recipeToEdit.id, title, description });
    navigate(`/recipes/${recipeToEdit.id}`);
  };

  if (!recipeToEdit) {
    return <div className="text-center text-red-500 text-xl font-semibold">Recipe not found for editing.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-gray-100 rounded-xl shadow-2xl max-w-2xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[150px]"
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-yellow-500 text-white p-3 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors"
        >
          Save Changes
        </button>
        <Link
          to={`/recipes/${recipeToEdit.id}`}
          className="flex-1 text-center bg-gray-300 text-gray-800 p-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EditRecipeForm;

// src/components/ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <p className="text-center text-lg mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;