
export const getRecipes = (ingredients) => {
    const shuffled = ingredients.sort(() => 0.5 - Math.random()).slice(0,2)
    const url = new URL("https://api.edamam.com/search")
    url.searchParams.append("q", shuffled)
    url.searchParams.append("app_id", import.meta.env.VITE_FARMER_APPID)
    url.searchParams.append("app_key", import.meta.env.VITE_FARMER_APPKEY)

    fetch(url).then((response) => {
        if (response.status === 200) {
            console.log(response.json)
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    }).then((data) => data.hits.forEach((recipe) => {
        console.log(recipe)
    }))
};
