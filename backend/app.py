from flask import Flask, request, jsonify
from flask_cors import CORS
from foodnetworkScrape import process_recipe_link

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process', methods=['POST'])
def process():
    try:
        data = request.get_json()

        if not data or 'link' not in data:
            return jsonify({'error': 'No link provided'}), 400

        link = data['link']
        title_list, ingredients_list, instructions_list = process_recipe_link(link)

        result = {
            'title': title_list,
            'ingredients': ingredients_list,
            'instructions': instructions_list
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
