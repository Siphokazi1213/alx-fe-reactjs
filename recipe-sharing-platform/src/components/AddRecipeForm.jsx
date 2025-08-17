import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState(''); // Corrected state name

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation checks
    if (!title.trim() || !summary.trim() || !ingredients.trim() || !steps.trim()) { // Corrected
      setValidationError('Please fill out all required fields.');
      return;
    }
    
    // Clear any previous validation errors
    setValidationError('');

    console.log('Form submitted:', { title, summary, image, ingredients, steps }); // Corrected
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Recipe Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Spaghetti Carbonara"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">Summary</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="e.g., A classic Italian dish with eggs, cheese, and bacon."
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., https://example.com/image.jpg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 font-bold mb-2">Ingredients</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="List each ingredient on a new line"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="steps" className="block text-gray-700 font-bold mb-2">Preparation Steps</label>
          <textarea
            id="steps" // Corrected
            value={steps} // Corrected
            onChange={(e) => setSteps(e.target.value)} // Corrected
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="7"
            placeholder="List each step on a new line"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;