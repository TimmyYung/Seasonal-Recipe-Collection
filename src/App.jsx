import { useState } from 'react';
import Header from './Header';
import Recipes from './Recipes';
import ObjectDetect from './ObjectDetect';
import Timmy from './Timmy';


function App() {
  const [location, setText] = useState('');

  return (
    <div className="App">
      <Header setText={setText} />
      <Recipes location={location} />
      <ObjectDetect />
      <Timmy/>
    </div>
  );
}

export default App;
