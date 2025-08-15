import React from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">Recipe Sharing</h1>
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  );
};

export default App;