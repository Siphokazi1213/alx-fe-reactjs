import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div className="App" style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Recipe Sharing Application</h1>
      <AddRecipeForm />
      <hr style={{ margin: '20px 0' }} />
      <RecipeList />
    </div>
  );
}

export default App;