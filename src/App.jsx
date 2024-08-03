import { useState } from 'react';
import Search from './Search';
import Recipes from './Recipes';
import Result from './Result';
import ObjectDetect from './ObjectDetect';
import Timmy from './Timmy';


function App() {
  const [location, setText] = useState('');

  return (
    <div className="App">
      <Search setText={setText} />
      <Result location={location} />
      <Recipes location={location} />
      <ObjectDetect />
      <Timmy/>
    </div>
  );
}

export default App;
