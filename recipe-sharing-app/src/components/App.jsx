import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { create } from 'zustand';

// --- Zustand Store ---
// This store now manages recipes, favorites, and recommendations.
export const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: 'Classic Spaghetti Carbonara',
      description: 'A traditional Italian pasta dish made with eggs, hard cheese, cured pork, and black pepper.',
      ingredients: ['Pasta', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Black Pepper'],
      category: 'Pasta',
    },
    {
      id: 2,
      title: 'Simple Tomato Soup',
      description: 'A quick and easy tomato soup, perfect for a light lunch or a cozy dinner.',
      ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth', 'Basil'],
      category: 'Soup',
    },
    {
      id: 3,
      title: 'Chicken and Rice Casserole',
      description: 'A hearty and comforting one-dish meal with chicken, rice, and creamy soup.',
      ingredients: ['Chicken Breast', 'White Rice', 'Cream of Chicken Soup', 'Onion Powder', 'Salt', 'Pepper'],
      category: 'Casserole',
    },
    {
      id: 4,
      title: 'Vegetarian Chili',
      description: 'A flavorful and filling chili with three types of beans and plenty of vegetables.',
      ingredients: ['Kidney Beans', 'Black Beans', 'Pinto Beans', 'Diced Tomatoes', 'Chili Powder', 'Cumin', 'Onion', 'Bell Pepper'],
      category: 'Main Dish',
    },
    {
      id: 5,
      title: 'Beef Tacos',
      description: 'Classic beef tacos with seasoned ground beef, lettuce, cheese, and salsa.',
      ingredients: ['Ground Beef', 'Taco Seasoning', 'Taco Shells', 'Lettuce', 'Cheddar Cheese', 'Salsa'],
      category: 'Mexican',
    },
  ],
  favorites: [],
  recommendations: [],
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
    // Re-filter the recipes after adding
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
      // Re-filter the recipes after updating
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
      // Remove the recipe from favorites if it was favorited
      const newFavorites = state.favorites.filter(id => id !== recipeId);
      // Re-filter the recipes after deleting
      const filteredRecipes = newRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      return {
        recipes: newRecipes,
        filteredRecipes: filteredRecipes,
        favorites: newFavorites
      };
    }),

  // Action to toggle a recipe's favorite status
  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId);
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),

  // Action to generate recommendations based on favorites
  generateRecommendations: () => set(state => {
    // Generate recommendations based on the category of the favorite recipes.
    const favoriteCategories = state.favorites.map(id => {
      const favoriteRecipe = state.recipes.find(recipe => recipe.id === id);
      return favoriteRecipe ? favoriteRecipe.category : null;
    }).filter(Boolean);

    // Get a set of unique categories to avoid duplicates
    const uniqueCategories = [...new Set(favoriteCategories)];

    // Filter recipes that match the favorite categories and are not already a favorite
    const recommendedRecipes = state.recipes.filter(recipe =>
      uniqueCategories.includes(recipe.category) && !state.favorites.includes(recipe.id)
    );

    return { recommendations: recommendedRecipes };
  }),
}));

// Initialize filtered recipes and recommendations on store creation
useRecipeStore.getState().filterRecipes();
useRecipeStore.getState().generateRecommendations();

// --- Confirmation Modal Component ---
// This component provides a confirmation pop-up for user actions.
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{message}</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-bold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Add Recipe Form Component ---
// This component handles adding new recipes.
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

// --- Recipe List Component ---
// This component displays a list of all recipes.
const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">All Recipes</h2>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} className="p-4 bg-gray-100 rounded-lg transition-transform hover:scale-105">
            <Link to={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{recipe.description.substring(0, 100)}...</p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No recipes found. Try adding a new one!</p>
      )}
    </div>
  );
};

// --- Search Bar Component ---
// This component provides a search input to filter recipes.
const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

// --- Favorites List Component ---
// This component displays a list of the user's favorite recipes.
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

// --- Recommendations List Component ---
// This component shows personalized recipe recommendations.
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

// --- Recipe Details Component ---
// This component displays the details of a single recipe and includes the Favorite button.
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

// --- Edit Recipe Form Component ---
// This component allows users to edit an existing recipe.
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FavoritesList />
                    <RecommendationsList />
                  </div>
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