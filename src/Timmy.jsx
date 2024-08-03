import React, { useState } from 'react';

export const Timmy = () => {
    const [output, setOutput] = useState('');

    const handleClick = async () => {
      try {
        const response = await fetch('http://localhost:5000/run-script');
        const data = await response.json();
        setOutput(data.message);
      } catch (error) {
        console.error('Error:', error);
        setOutput('Failed to run the script');
      }
    };

    return(
        <div>
            <h1>Run Python Script from React</h1>
            <button onClick={handleClick}>Run Script</button>
            <p>Output: {output}</p>
        </div>
    )
}
export default Timmy;