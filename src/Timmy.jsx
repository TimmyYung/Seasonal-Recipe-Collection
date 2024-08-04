import React, { useState } from 'react';

export const fixedLink = 'https://www.foodnetwork.ca/recipe/cheese-manakish-middle-eastern-flatbread/';


function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: toGo }),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (typeof data === 'object' && data !== null) {
          setResult(data);
          setError('');
        } else {
          throw new Error('Unexpected JSON format');
        }
      } else {
        const text = await response.text();
        throw new Error(`Response is not JSON: ${text}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`An error occurred: ${error.message}`);
      setResult(null);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Process Recipe POC</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div>
          <h2>Recipe Details</h2>
          <p><strong>Title:</strong> {result.title?.join(', ') || 'N/A'}</p>
          <p><strong>Ingredients:</strong> {result.ingredients?.join(', ') || 'N/A'}</p>
          <p><strong>Instructions:</strong> {result.instructions?.join(', ') || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
