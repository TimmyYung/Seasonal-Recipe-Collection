import { findNearestState } from "./GetFruits";
import { useState } from 'react';
import { getRecipes } from "./GetRecipes";
import PropTypes from 'prop-types';
import getCurrentSeason from "./utils/getCurrentSeason";

const Header = ({ setRecipes,  }) => {
Header.propTypes = {
  setRecipes: PropTypes.func.isRequired,
};
  const [result, setResult] = useState(null);
  const [season] = useState(getCurrentSeason())
  const [location, setLocation] = useState('');

  const recipeSearch = async () => {
    try {
      const data = await findNearestState();
      console.log(data)
      setLocation(data.title)
      if (data && data.context) {
        setResult(data.context);
        const recipes = await getRecipes(data.context);
        setRecipes(recipes)
      }
    } catch (error) {
      console.error("Error finding nearest state or retrieving fruits:", error);
    }
  };
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-b-lg shadow-xl mb-6">
      <div className="absolute top-4 left-4 flex space-x-4">
        <a href="/page2" className="text-white hover:underline">Computer Vision</a>
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
        🌟 Recipe Finder 🌟
      </h1>
      <div className="flex justify-center space-x-4">
        <button onClick={recipeSearch} className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          Search for {season} Recipes
        </button>
      </div>
      <div>
        {result && result.length > 0 ? (
          <div>
            <h2 className="font-bold text-xl">{season} Fruits in {location}:</h2>
            {result.join(', ')}
          </div>
        ) : (
          <p>No fruits in season found.</p>
        )}
      </div>
    </header>
  );
}

export default Header;
