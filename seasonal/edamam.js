import { availableFruits } from './script.js';

export function getRecipes() {
    // Choose a fruit from availableFruits
    const shuffled = availableFruits.sort(() => 0.5 - Math.random());
    let ingredient = shuffled.slice(0, 2);
    console.log(ingredient)
    // console.log(ingredient)

    const app_id = sessionStorage.getItem("app_id");
    const app_key = sessionStorage.getItem("app_key");
    const endpoint = sessionStorage.getItem("endpoint");

    const url = new URL(endpoint);
    url.searchParams.append("q", ingredient);
    url.searchParams.append("app_id", app_id);
    url.searchParams.append("app_key", app_key);

    let recipedetails = "";
    const results = document.getElementById("results");

    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status code ${response.status}`);
            }
        })
        .then((data) => {

            data.hits.forEach((recipe) => {
                const label = recipe.recipe.label;
                const image = recipe.recipe.image;
                const uri = recipe.recipe.url;
                recipedetails += `
                <div style="width: 5rem;">
                    <img src="${image}" alt="image">
                    <div>
                        <h5>${label}</h5>
                        <button class="view-recipe" data-uri="${uri}">View Recipe</button>
                    </div>
                </div>`;
            });
            results.innerHTML = recipedetails;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function showRecipe(uri) {
    window.location.href = uri;
}

document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem("app_id", "85e9aa7c");
    sessionStorage.setItem("app_key", "c4053dedb3bc8cb5a51e5dd12e6f05fd");
    sessionStorage.setItem("endpoint", "https://api.edamam.com/search");
    
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener('click', getRecipes);
    }

    document.getElementById("results").addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('view-recipe')) {
            const uri = event.target.getAttribute('data-uri');
            showRecipe(uri);
        }
    });
});

