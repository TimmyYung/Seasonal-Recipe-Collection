import { useState } from 'react';
import Header from './Header';
import Recipes from './Recipes';
import ObjectDetect from './ObjectDetect';
import Timmy from './Timmy';

function App() {
  const [allRecipes, setAllRecipes] = useState([]);

  return (
    <div className="App">
      <Header setRecipes={setAllRecipes} />
      <Recipes recipes={allRecipes} />
      {/* <ObjectDetect />*/}
      <Timmy />
    </div>
  );
}

export default App;
