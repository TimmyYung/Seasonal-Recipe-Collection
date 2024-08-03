import PropTypes from 'prop-types';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 max-w-sm border border-gray-300 transition-transform transform hover:shadow-xl hover:scale-105 flex flex-col justify-between">
      <div>
        <div className="relative">
          <img src={recipe.image[0]} alt={recipe.image[1]} className="w-full h-48 object-cover"/>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-2xl font-semibold text-white">{recipe.name}</h2>
          </div>
        </div>
        <div className="pt-3 px-6 flex-grow">
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-6">
        <a href={recipe.link} className="block text-center">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
            View Recipe
          </button>
        </a>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
