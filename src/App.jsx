import { useState } from 'react';
import Header from './components/Header';
import Recipes from './components/Recipes';
import ObjectDetect from './components/ObjectDetect';
import ProcessRecipe from './components/ProcessRecipe';

function App() {
  const [allRecipes, setAllRecipes] = useState([]);

  return (
    <div className="App">
      <Header setRecipes={setAllRecipes} />
      <Recipes recipes={allRecipes} />
      <br></br>
      <br></br>
      <ObjectDetect />
      <br></br>
      <br></br>
      <ProcessRecipe />
    </div>
  );
}

export default App;
