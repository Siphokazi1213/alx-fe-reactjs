import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import ConfirmationModal from './ConfirmationModal';

// --- Helper Component: Add Recipe Form ---
const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !description) return;
    addRecipe({ title, description, ingredients: [] });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-inner space-y-2">
      <h2 className="text-xl font-bold text-gray-800">Add a New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
      >
        Add Recipe
      </button>
    </form>
  );
};

// --- Recipe Details Component ---
const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(id) || r.id === id)
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

// --- Edit Recipe Form Component ---
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

// --- Main App Component ---
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Recipe Sharing App</h1>
          <nav className="flex justify-center space-x-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">Home</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-4xl mx-auto space-y-8">
                  <AddRecipeForm />
                  <SearchBar />
                  <RecipeList />
                </div>
              }
            />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
