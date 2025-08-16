import React, { useState } from 'react';
import { create } from 'zustand';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- Recipe Data Store (Step 1) ---
// This store manages the state for our recipes, including adding, updating, and deleting.
// It has been extended with search and filtering logic.
const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: 'Classic Spaghetti Carbonara',
      description: 'A traditional Italian pasta dish made with eggs, hard cheese, cured pork, and black pepper.',
      ingredients: ['Pasta', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Black Pepper'],
    },
    {
      id: 2,
      title: 'Simple Tomato Soup',
      description: 'A quick and easy tomato soup, perfect for a light lunch or a cozy dinner.',
      ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth', 'Basil'],
    },
  ],
  searchTerm: '',
  filteredRecipes: [],

  // Action to set the search term and automatically filter recipes
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  // Action to filter the recipes based on the current search term
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    if (searchTerm === '') {
      set({ filteredRecipes: recipes });
    } else {
      set({
        filteredRecipes: recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      });
    }
  },

  addRecipe: (newRecipe) => set(state => {
    const newRecipes = [...state.recipes, { ...newRecipe, id: crypto.randomUUID() }];
    // Re-filter after adding a new recipe
    const filteredRecipes = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: newRecipes,
      filteredRecipes: filteredRecipes
    };
  }),

  updateRecipe: (updatedRecipe) =>
    set(state => {
      const newRecipes = state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      // Re-filter after updating a recipe
      const filteredRecipes = newRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return {
        recipes: newRecipes,
        filteredRecipes: filteredRecipes
      };
    }),
  deleteRecipe: (recipeId) =>
    set(state => {
      const newRecipes = state.recipes.filter(recipe => recipe.id !== recipeId);
      // Re-filter after deleting a recipe
      const filteredRecipes = newRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return {
        recipes: newRecipes,
        filteredRecipes: filteredRecipes
      };
    }),
}));

// Initialize filtered recipes on store creation
useRecipeStore.getState().filterRecipes();

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

// --- Helper Component: Confirmation Modal ---
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

// --- New Component: SearchBar ---
const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

// --- Recipe List Component (Step 2) ---
// Displays a list of recipes with links to view and edit.
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

// --- Recipe Details Component ---
const RecipeDetails = () => {
  const { id } = useParams();
  // We use parseInt(id) for number-based IDs, or fallback to the string ID if it's a UUID.
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

// --- Main App Component (Step 3) ---
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