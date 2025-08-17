// src/components/RecipeDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the recipe by its ID
    const foundRecipe = recipesData.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto p-8 text-center text-xl font-bold">
        Recipe not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;