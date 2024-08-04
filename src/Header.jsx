import { findNearestState } from "./GetFruits";
import { useState } from 'react';
import { getRecipes } from "./GetRecipes";

const Header = () => {
  const [result, setResult] = useState(null);

  const recipeSearch = async () => {
    try {
      const data = await findNearestState();
      console.log(data)
      if (data && data.context) {
        setResult(data.context);
        getRecipes(data.context);
      }
    } catch (error) {
      console.error("Error finding nearest state or retrieving fruits:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl mb-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
        🌟 Recipe Finder 🌟
      </h1>
      <div className="flex justify-center space-x-4">
        <button onClick={recipeSearch} className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          Search for Local Recipes
        </button>
      </div>
      <div>
        {result && result.length > 0 ? (
          <div>
            <h2 className="font-bold">Fruits in Season:</h2>
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
