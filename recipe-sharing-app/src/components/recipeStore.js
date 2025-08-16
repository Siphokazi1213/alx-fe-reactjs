import { create } from 'zustand';

// This store now manages the search term and filters the recipes automatically.
export const useRecipeStore = create((set, get) => ({
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