import PropTypes from 'prop-types';
import RecipeCard from './components/RecipeCard';
import { fixedLink } from './Timmy';

function Recipes({ recipes }) {
  console.log({ recipes });
  return (
    <div >
      {recipes.length > 0 ? (
        <ul className='grid grid-cols-4 max-md:grid-cols-2 max-lg:grid-cols-3 xl:grid-cols-5'>
          {recipes.map((recipe, key) => (
            <RecipeCard
              key={key}
              label={recipe.label}
              image={recipe.image}
              url={recipe.uri}
              // url={fixedLink}
              ingredients={recipe.ingredients}
            />
          ))}
        </ul>
      ) : (
        <h1 className='italic px-8 text-xl'>No recipes available.</h1>
      )}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          measure: PropTypes.string,
          food: PropTypes.string.isRequired,
          weight: PropTypes.number.isRequired,
          foodCategory: PropTypes.string,
          foodId: PropTypes.string,
          image: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Recipes;
