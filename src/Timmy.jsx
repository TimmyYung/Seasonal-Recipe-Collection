import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        setError('');
      } else {
        setError(data.error || 'Something went wrong');
        setResult(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data');
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Process Recipe Link</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="link">Recipe Link:</label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div>
          <h2>Recipe Details</h2>
          <p><strong>Title:</strong> {result.title.join(', ')}</p>
          <p><strong>Ingredients:</strong> {result.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {result.instructions.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
