document.addEventListener('DOMContentLoaded', () => {
    const stateSelect = document.getElementById('stateSelect');
    const fruitSelect = document.getElementById('fruitSelect');
    const resultsDiv = document.getElementById('results');
    const findNearestStateButton = document.getElementById('findNearestState');
    let jsonData = {}; 

    const stateCoordinates = [
        { name: 'Alabama', lat: 32.806671, lon: -86.791130 },
        { name: 'Alaska', lat: 61.370716, lon: -152.404419 },
        { name: 'Arizona', lat: 33.729759, lon: -111.431221 },
        { name: 'Arkansas', lat: 34.969704, lon: -92.373123 },
        { name: 'California', lat: 36.116203, lon: -119.681564 },
        { name: 'Colorado', lat: 39.059811, lon: -105.311104 },
        { name: 'Connecticut', lat: 41.597782, lon: -72.755371 },
        { name: 'Delaware', lat: 39.318523, lon: -75.507141 },
        { name: 'Florida', lat: 27.766279, lon: -81.686783 },
        { name: 'Georgia', lat: 33.040619, lon: -83.643074 },
        { name: 'Hawaii', lat: 21.094318, lon: -157.498337 },
        { name: 'Idaho', lat: 44.240459, lon: -114.478828 },
        { name: 'Illinois', lat: 40.349457, lon: -88.986137 },
        { name: 'Indiana', lat: 39.849426, lon: -86.258278 },
        { name: 'Iowa', lat: 42.011539, lon: -93.210526 },
        { name: 'Kansas', lat: 39.116203, lon: -98.290253 },
        { name: 'Kentucky', lat: 37.668140, lon: -84.670067 },
        { name: 'Louisiana', lat: 31.169546, lon: -91.867805 },
        { name: 'Maine', lat: 44.693947, lon: -69.381927 },
        { name: 'Maryland', lat: 39.063946, lon: -76.802101 },
        { name: 'Massachusetts', lat: 42.230171, lon: -71.530106 },
        { name: 'Michigan', lat: 43.326618, lon: -84.536095 },
        { name: 'Minnesota', lat: 45.694454, lon: -93.900192 },
        { name: 'Mississippi', lat: 32.741646, lon: -89.678696 },
        { name: 'Missouri', lat: 38.456085, lon: -92.288368 },
        { name: 'Montana', lat: 46.921925, lon: -110.454353 },
        { name: 'Nebraska', lat: 41.125370, lon: -98.268082 },
        { name: 'Nevada', lat: 38.313515, lon: -117.055374 },
        { name: 'New Hampshire', lat: 43.452492, lon: -71.563896 },
        { name: 'New Jersey', lat: 40.298904, lon: -74.521011 },
        { name: 'New Mexico', lat: 34.840515, lon: -106.248168 },
        { name: 'New York', lat: 42.165726, lon: -74.948051 },
        { name: 'North Carolina', lat: 35.630066, lon: -79.806419 },
        { name: 'North Dakota', lat: 47.528912, lon: -99.784012 },
        { name: 'Ohio', lat: 40.388783, lon: -82.764915 },
        { name: 'Oklahoma', lat: 35.565342, lon: -96.928917 },
        { name: 'Oregon', lat: 44.572021, lon: -122.070938 },
        { name: 'Pennsylvania', lat: 40.590752, lon: -77.209755 },
        { name: 'Rhode Island', lat: 41.680893, lon: -71.511780 },
        { name: 'South Carolina', lat: 33.856892, lon: -80.945007 },
        { name: 'South Dakota', lat: 44.299782, lon: -99.438828 },
        { name: 'Tennessee', lat: 35.747845, lon: -86.692345 },
        { name: 'Texas', lat: 31.054487, lon: -97.563461 },
        { name: 'Utah', lat: 40.150032, lon: -111.862434 },
        { name: 'Vermont', lat: 44.045876, lon: -72.710686 },
        { name: 'Virginia', lat: 37.769337, lon: -78.169968 },
        { name: 'Washington', lat: 47.400902, lon: -121.490494 },
        { name: 'West Virginia', lat: 38.491226, lon: -80.954201 },
        { name: 'Wisconsin', lat: 44.268543, lon: -89.616508 },
        { name: 'Wyoming', lat: 42.755966, lon: -107.302490 },
    ];

    
    fetch('output.json')
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