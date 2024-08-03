import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import RecipeCard from './components/RecipeCard';
import getCurrentSeason from './utils/getCurrentSeason';
import { sampleRecipes } from './components/recipes';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [season, setSeason] = useState('');

  useEffect(() => {
    const currentSeason = getCurrentSeason(); // Function to get the current season
    setSeason(currentSeason);
    // Filter recipes based on the current season
    const filteredRecipes = sampleRecipes.filter(recipe => 
      recipe.locations.includes(currentSeason)
    );
    setRecipes(filteredRecipes); // Update state with the filtered recipes
  }, []); // Run effect only once on component mount

  return (
    <div className="recipes p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Seasonal Recipes for {season.charAt(0).toUpperCase() + season.slice(1)}</h2>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   gap-4">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} /> // Render each recipe card
          ))}
        </div>
      ) : (
        <p>No seasonal dishes found.</p>
      )}
    </div>
  );
}

export default Recipes;
