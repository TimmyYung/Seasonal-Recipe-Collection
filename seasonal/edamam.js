// Define the getRecipes function globally
function getRecipes() {
    const ingredient = document.getElementById("ingredient").value;
    const app_id = sessionStorage.getItem("app_id");
    const app_key = sessionStorage.getItem("app_key");
    const endpoint = sessionStorage.getItem("endpoint");

    const url = new URL(endpoint);
    url.searchParams.append("q", ingredient);
    url.searchParams.append("app_id", app_id);
    url.searchParams.append("app_key", app_key);

    var recipedetails = "";
    var results = document.getElementById("results");
    let label = "";
    let image = "";
    let uri = "";

    fetch(url)
        .then((response) => {
            // Check if the request was successful
            if (response.status === 200) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error(`Request failed with status code ${response.status}`);
            }
        })
        .then((data) => {
            // Process the recipe data (it may contain multiple recipes)
            data.hits.forEach((recipe) => {
                label = recipe.recipe.label;
                image = recipe.recipe.image;
                uri = recipe.recipe.uri;
                recipedetails += `<div class="card m-3" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="image">
                <div class="card-body">
                <h5 class="card-title">${label}</h5>
                <button class="btn btn-warning" onclick="showRecipe('${uri}')">View Recipe</button>
                </div>
            </div>`;
            });
            results.innerHTML = recipedetails;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Define the showRecipe function
function showRecipe(uri) {

    console.log('Recipe URI:', uri);
    // Example: You might redirect to a detailed page or fetch more info about the recipe
    // window.location.href = `recipeDetails.html?uri=${encodeURIComponent(uri)}`;
}


// Set up event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem("app_id", "85e9aa7c");
    sessionStorage.setItem("app_key", "c4053dedb3bc8cb5a51e5dd12e6f05fd");
    sessionStorage.setItem("endpoint", "https://api.edamam.com/search");
    
    // Ensure the button has an onclick attribute
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener('click', getRecipes);
    }
});
