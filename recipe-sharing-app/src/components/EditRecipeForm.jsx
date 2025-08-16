import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore(state => state.recipes);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const recipeToEdit = recipes.find(r => r.id === parseInt(id) || r.id === id);

  const [title, setTitle] = useState(recipeToEdit?.title || '');
  const [description, setDescription] = useState(recipeToEdit?.description || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !description || !recipeToEdit) return;
    updateRecipe({ ...recipeToEdit, title, description });
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