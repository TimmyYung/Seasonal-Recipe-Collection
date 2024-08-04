import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './components/RecipeCard';

function Recipes({ recipes }) {
  console.log({ recipes });
  return (
    <div >
      {recipes.length > 0 ? (
        <ul className='grid grid-cols-4'>
          {recipes.map((recipe, key) => (
            <RecipeCard
              key={key}
              label={recipe.label}
              image={recipe.image}
              url={recipe.uri}
              ingredients={recipe.ingredients}
            />
          ))}
        </ul>
      ) : (
        <p>No recipes available.</p>
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
