import React from 'react';

function Recipes({ recipes }) {
  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
}

export default Recipes;
