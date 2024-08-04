export const getRecipes = async (ingredients) => {
    const shuffled = ingredients.sort(() => 0.5 - Math.random()).slice(0, 2);
    const url = new URL("https://api.edamam.com/search");
    url.searchParams.append("q", shuffled.join(","));
    url.searchParams.append("app_id", import.meta.env.VITE_FARMER_APPID);
    url.searchParams.append("app_key", import.meta.env.VITE_FARMER_APPKEY);
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
  
      const data = await response.json();
      const results = data.hits.map((recipe) => ({
        label: recipe.recipe.label,
        image: recipe.recipe.image,
        uri: recipe.recipe.url,
        ingredients: recipe.recipe.ingredients,
      }));
      return results;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  };
  