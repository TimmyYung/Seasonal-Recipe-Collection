from bs4 import BeautifulSoup
import pandas as pd
import requests

def scrape_recipe(url):
    if not url.startswith("https://www.foodnetwork.ca/"):
        print(f"Skipping non-Food Network link: {url}")
        return url
              
    print(f"Scraping Recipe: {url}")
    response = requests.get(url)
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    title_tag = soup.find('h1', class_='article-title')
    title = title_tag.text.strip() if title_tag else 'Title not found'
    print(title)
    
    ingredients_div =  soup.find_all('div', class_='subrecipe-ingredients')
    if not ingredients_div:
        print("No Ingredients div found")
        return [],[],[]
    
    ingredients = []
    for div in ingredients_div:
        for ingredient in div.find_all('div'):
            ingredients.append(ingredient.get_text (strip=True))
       
    
    steps = soup.find_all('div', class_='recipe-step')
    instructions = []
    for step in steps:
        step_title = step.find('div', class_='recipe-step-title').text
        step_content = step.find('div', class_='recipe-step-content').text
        instructions.append(f"{step_title}: {step_content}")
                            
    return{
        'Title': title,
        'Ingredients': ingredients,
        'Instructions': instructions
    }
                            
                            
def process_recipe_link(link):
    recipe_data = scrape_recipe(link)
                            
    if recipe_data:
        title_list = [recipe_data['Title']]
        ingredients_list = recipe_data['Ingredients']
        instructions_list = recipe_data['Instructions']
                            
        return title_list, ingredients_list, instructions_list
    else:
        return [],[],[]
                            
# link = 'https://www.foodnetwork.ca/recipe/cheese-manakish-middle-eastern-flatbread/'

link=""
title_list, ingredients_list, instructions_list = process_recipe_link(link)

# Create a list to store grouped ingredients
grouped_ingredients = []

# Pair every two elements in the ingredients list
for i in range(0, len(ingredients_list), 2):
    pair = ingredients_list[i:i + 2]
    grouped_ingredients.append(pair)

print("Title List:", title_list)
print("Ingredients List:", grouped_ingredients)
print("Instructions List:", instructions_list)