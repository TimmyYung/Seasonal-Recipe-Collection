from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-script', methods=['GET'])
def run_script():
    try:
        # Run the Python script and capture the output
        result = subprocess.run(['python3', 'script.py'], capture_output=True, text=True)
        output = result.stdout
    except Exception as e:
        output = f"Error: {str(e)}"

    return jsonify({'message': output.strip()})

if __name__ == '__main__':
    app.run(debug=True)