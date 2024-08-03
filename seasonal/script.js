document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('stateSelect');
    const fruitSelect = document.getElementById('fruitSelect');
    const resultsDiv = document.getElementById('results');
    const findNearestStateButton = document.getElementById('findNearestState');
    let jsonData = {}; 

    // Coordinates taken from https://www.latlong.net/category/states-236-14.html
    const stateCoordinates = [
        { name: 'Wisconsin', lat: 44.500000, lon: -89.500000 },
        { name: 'West Virginia', lat: 39.000000, lon: -80.500000 },
        { name: 'Vermont', lat: 44.000000, lon: -72.699997 },
        { name: 'Texas', lat: 31.000000, lon: -100.000000 },
        { name: 'South Dakota', lat: 44.500000, lon: -100.000000 },
        { name: 'Rhode Island', lat: 41.742325, lon: -71.742332 },
        { name: 'Oregon', lat: 44.000000, lon: -120.500000 },
        { name: 'New York', lat: 43.000000, lon: -75.000000 },
        { name: 'New Hampshire', lat: 44.000000, lon: -71.500000 },
        { name: 'Nebraska', lat: 41.500000, lon: -100.000000 },
        { name: 'Kansas', lat: 38.500000, lon: -98.000000 },
        { name: 'Mississippi', lat: 33.000000, lon: -90.000000 },
        { name: 'Illinois', lat: 40.000000, lon: -89.000000 },
        { name: 'Delaware', lat: 39.000000, lon: -75.500000 },
        { name: 'Connecticut', lat: 41.599998, lon: -72.699997 },
        { name: 'Arkansas', lat: 34.799999, lon: -92.199997 },
        { name: 'Indiana', lat: 40.273502, lon: -86.126976 },
        { name: 'Missouri', lat: 38.573936, lon: -92.603760 },
        { name: 'Florida', lat: 27.994402, lon: -81.760254 },
        { name: 'Nevada', lat: 39.876019, lon: -117.224121 },
        { name: 'Maine', lat: 45.367584, lon: -68.972168 },
        { name: 'Michigan', lat: 44.182205, lon: -84.506836 },
        { name: 'Georgia', lat: 33.247875, lon: -83.441162 },
        { name: 'Hawaii', lat: 19.741755, lon: -155.844437 },
        { name: 'Alaska', lat: 66.160507, lon: -153.369141 },
        { name: 'Tennessee', lat: 35.860119, lon: -86.660156 },
        { name: 'Virginia', lat: 37.926868, lon: -78.024902 },
        { name: 'New Jersey', lat: 39.833851, lon: -74.871826 },
        { name: 'Kentucky', lat: 37.839333, lon: -84.270020 },
        { name: 'North Dakota', lat: 47.650589, lon: -100.437012 },
        { name: 'Minnesota', lat: 46.392410, lon: -94.636230 },
        { name: 'Oklahoma', lat: 36.084621, lon: -96.921387 },
        { name: 'Montana', lat: 46.965260, lon: -109.533691 },
        { name: 'Washington', lat: 47.751076, lon: -120.740135 },
        { name: 'Utah', lat: 39.419220, lon: -111.950684 },
        { name: 'Colorado', lat: 39.113014, lon: -105.358887 },
        { name: 'Ohio', lat: 40.367474, lon: -82.996216 },
        { name: 'Alabama', lat: 32.318230, lon: -86.902298 },
        { name: 'Iowa', lat: 42.032974, lon: -93.581543 },
        { name: 'New Mexico', lat: 34.307144, lon: -106.018066 },
        { name: 'South Carolina', lat: 33.836082, lon: -81.163727 },
        { name: 'Pennsylvania', lat: 41.203323, lon: -77.194527 },
        { name: 'Arizona', lat: 34.048927, lon: -111.093735 },
        { name: 'Maryland', lat: 39.045753, lon: -76.641273 },
        { name: 'Massachusetts', lat: 42.407211, lon: -71.382439 },
        { name: 'California', lat: 36.778259, lon: -119.417931 },
        { name: 'Idaho', lat: 44.068203, lon: -114.742043 },
        { name: 'Wyoming', lat: 43.075970, lon: -107.290283 },
        { name: 'North Carolina', lat: 35.782169, lon: -80.793457 },
        { name: 'Louisiana', lat: 30.391830, lon: -92.329102 }
    ];

    
    fetch('US_Seasonal.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            populateStateDropdown(Object.keys(data));
            stateSelect.addEventListener('change', handleStateChange);
            fruitSelect.addEventListener('change', handleFruitChange);
            findNearestStateButton.addEventListener('click', findNearestState);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            resultsDiv.innerHTML = 'Failed to load data.';
        });


    function populateStateDropdown(states) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

 
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
            displayResults(selectedState, selectedFruit, months);
        } else {
            resultsDiv.innerHTML = ''; 
        }
    }

    function displayResults(state, fruit, months) {
        if (months.length === 0) {
            resultsDiv.innerHTML = `
                <h1>${state}</h1>
                <p>This ingredient is not in season during this month.</p>
            `;
        } else {
            const html = `
                <h1>${state}</h1>
                <h2>${fruit}</h2>
                <p>${months.join(', ')}</p>
            `;
            resultsDiv.innerHTML = html;
        }
    }

    function findNearestState() {
        if (!navigator.geolocation) {
            resultsDiv.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
            return;
        }

        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Find the nearest state
            let nearestState = '';
            let minDistance = Infinity;

            stateCoordinates.forEach(state => {
                const { name, lat, lon } = state;
                const distance = getDistance(userLat, userLon, lat, lon);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestState = name;
                }
            });

            if (nearestState) {
                const currentMonth = new Date().toLocaleString('default', { month: 'long' });
                const fruits = jsonData[nearestState] || {};
                const availableFruits = Object.keys(fruits).filter(fruit => fruits[fruit].includes(currentMonth));

                if (availableFruits.length > 0) {
                    displayFruits(nearestState, availableFruits);
                } else {
                    resultsDiv.innerHTML = `<h1>${nearestState}</h1><p>No fruits are in season in ${nearestState} this month.</p>`;
                }
            } else {
                resultsDiv.innerHTML = '<p>Unable to determine the nearest state.</p>';
            }
        }, error => {
            resultsDiv.innerHTML = `<p>Geolocation error: ${error.message}</p>`;
        });
    }

    function displayFruits(state, fruits) {
        if (fruits.length === 0) {
            resultsDiv.innerHTML = `<h1>${state}</h1><p>No fruits are in season during this month.</p>`;
        } else {
            const html = `<h1>${state}</h1><h2>Fruits in Season</h2><p>${fruits.join(', ')}</p>`;
            resultsDiv.innerHTML = html;
        }
    }

    // Calculate the distance between two geographical points using Haversine formula
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
});