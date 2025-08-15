import { create } from 'zustand';

// Define the Zustand store
const useRecipeStore = create(set => ({
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
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] })),
  updateRecipe: (updatedRecipe) =>
    set(state => ({
      recipes: state.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),
  deleteRecipe: (recipeId) =>
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
    })),
}));

export { useRecipeStore };