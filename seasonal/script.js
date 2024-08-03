document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('stateSelect');
    const fruitSelect = document.getElementById('fruitSelect');
    const resultsDiv = document.getElementById('results');
    let jsonData = {}; 

    fetch('output.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            populateStateDropdown(Object.keys(data));
            stateSelect.addEventListener('change', handleStateChange);
            fruitSelect.addEventListener('change', handleFruitChange);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            resultsDiv.innerHTML = 'Failed to load data.';
        });

    // Populate the state dropdown menu
    function populateStateDropdown(states) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    // Populate the fruit dropdown menu based on selected state
    function populateFruitDropdown(fruits) {
        fruitSelect.innerHTML = '<option value="">Select a fruit</option>';
        fruits.forEach(fruit => {
            const option = document.createElement('option');
            option.value = fruit;
            option.textContent = fruit;
            fruitSelect.appendChild(option);
        });
    }

    function handleStateChange() {
        const selectedState = stateSelect.value;
        if (selectedState) {
            const fruits = Object.keys(jsonData[selectedState] || {});
            populateFruitDropdown(fruits);
            resultsDiv.innerHTML = ''; 
        } else {
            fruitSelect.innerHTML = '<option value="">Select a fruit</option>'; 
            resultsDiv.innerHTML = ''; 
        }
    }

    function handleFruitChange() {
        const selectedState = stateSelect.value;
        const selectedFruit = fruitSelect.value;
        if (selectedState && selectedFruit) {
            const months = jsonData[selectedState][selectedFruit] || [];
            displayResults(months);
        } else {
            resultsDiv.innerHTML = ''; 
        }
    }

    function displayResults(months) {
        if (months.length === 0) {
            resultsDiv.innerHTML = '<p>This ingredient is not in season during this month.</p>'; // WHEN NOT AVAILABLE
        } else {
            const html = `<h2>Available Months</h2><p>${months.join(', ')}</p>`;
            resultsDiv.innerHTML = html;
        }
    }
});
