import PropTypes from 'prop-types';

function RecipeCard({ label, image, url, ingredients }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 max-w-sm border border-gray-300 transition-transform transform hover:shadow-xl hover:scale-105 flex flex-col justify-between">
      <div>
        <div className="relative">
          <img src={image} alt='yummy food' className="w-full h-48 object-cover"/>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-2xl font-semibold text-white">{label}</h2>
          </div>
        </div>
        <div className="pt-3 px-6 flex-grow"> 
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient.food}</li>
            ))}
          </ul>

        </div>
      </div>
      <div className="p-6">
        <a href={url} className="block text-center">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
            View Recipe
          </button>
        </a>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  ingredients: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default RecipeCard;
