
import PropTypes from 'prop-types';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm border border-gray-300 transition-transform transform hover:shadow-xl hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{recipe.name}</h2>
      <p className="text-gray-600 mb-4">{recipe.description}</p>
      <ul className="list-disc pl-5 mb-4">
      {/* Maps over the ingredients array in the recipe object and returns a list item for each ingredient. */}
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
}

// Define the prop types for the RecipeCard component
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired, // Add if you're using this prop
  }).isRequired,
};

export default RecipeCard;
