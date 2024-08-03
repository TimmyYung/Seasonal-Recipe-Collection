from flask import Flask, request, jsonify
from foodnetworkScrape import process_recipe_link

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    try:
        # Attempt to get JSON data from the request
        data = request.get_json()

        # Check if 'link' is in the received data
        if not data or 'link' not in data:
            return jsonify({'error': 'No link provided'}), 400
        
        # Extract the link from the data
        link = data['link']

        # Call the function from foodnetworkScrape.py
        title_list, ingredients_list, instructions_list = process_recipe_link(link)
        
        # Format the result into a dictionary or JSON
        result = {
            'title': title_list,
            'ingredients': ingredients_list,
            'instructions': instructions_list
        }
        
        return jsonify(result)
    except Exception as e:
        # Return detailed error message
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
