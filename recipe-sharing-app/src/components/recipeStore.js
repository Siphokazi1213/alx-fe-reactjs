import { create } from 'zustand';

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