import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import getCurrentSeason from './utils/getCurrentSeason';

// Sample recipes data
const sampleRecipes = [
  {
    name: "Spring Salad",
    description: "A refreshing salad with seasonal spring vegetables.",
    ingredients: ["Lettuce", "Radishes", "Asparagus", "Spring Onions", "Lemon Dressing"],
    locations: ["spring"]
  },
  {
    name: "Summer Berry Smoothie",
    description: "A cool smoothie made with fresh summer berries.",
    ingredients: ["Strawberries", "Blueberries", "Raspberries", "Yogurt", "Honey"],
    locations: ["summer"]
  },
  {
    name: "Autumn Pumpkin Soup",
    description: "A warm soup perfect for autumn evenings.",
    ingredients: ["Pumpkin", "Carrots", "Onions", "Vegetable Broth", "Cream"],
    locations: ["autumn"]
  },
  {
    name: "Winter Root Vegetable Stew",
    description: "A hearty stew with root vegetables to warm you up in winter.",
    ingredients: ["Potatoes", "Carrots", "Parsnips", "Turnips", "Beef Broth"],
    locations: ["winter"]
  }
];

function Recipes({ location }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (location) {
      const currentSeason = getCurrentSeason(); // Function to get the current season
      // Filter recipes based on the current season
      const filteredRecipes = sampleRecipes.filter(recipe => 
        recipe.locations.includes(currentSeason)
      );
      setRecipes(filteredRecipes); // Update state with the filtered recipes
    }
  }, [location]); // Re-run effect when location changes

  return (
    <div className="recipes p-4">
      {location ? (
        recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} /> // Render each recipe card
            ))}
          </div>
        ) : (
          <p>No seasonal dishes found for {location}.</p>
        )
      ) : (
        <p>Please enter your location to see seasonal dishes.</p>
      )}
    </div>
  );
}

// Define the prop types for the Recipes component
Recipes.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Recipes;
