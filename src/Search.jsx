import { useState } from 'react';
import PropTypes from 'prop-types';

function Search({ setText }) {
  // State to manage the input value    
  const [inputValue, setInputValue] = useState('');

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setText(inputValue); // Passes the input value to the parent component (App)
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Recipe Finder</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="location" className="mb-2 text-lg">Enter your location:</label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Updates state on input change
            className="p-3 rounded-lg shadow-md text-black w-64"
          />
          <button type="submit" className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
            Submit
          </button>
        </div>
      </form>
    </header>
  );
}

// Define the prop types for the Search component
Search.propTypes = {
  setText: PropTypes.func.isRequired,
};

export default Search;

