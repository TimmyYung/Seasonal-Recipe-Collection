import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Add this line

import RecipeCard from './components/RecipeCard';
import getCurrentSeason from './utils/getCurrentSeason';
import { sampleRecipes } from './constants/recipes';

function Recipes({allRecipes}) {
  // Add prop validation for 'allRecipes'
  Recipes.propTypes = {
      allRecipes: PropTypes.array.isRequired
    };
  
  

  return (
    <div className="recipes p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Seasonal Recipes for</h2>
      {allRecipes ? (<div>Hello</div>) : (<div>Goodbye!</div>)}

        <p>No seasonal dishes found.</p>
    </div>
  );
}

export default Recipes;
