from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time

app = Flask(__name__)
CORS(app)

DATA_FOLDER = "data"
computers = ["Computer1", "Computer2", "Computer3"]
users = [
    {"name": "shlomo", "password": "123"},
    {"name": "asher", "password": "456"},
    {"name": "arie", "password": "789"}
]


def generate_log_filename():
    return "log_" + time.strftime("%Y-%m-%d_%H-%M-%S") + ".txt"


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or "name" not in data or "password" not in data:
        return jsonify({"error": "Invalid payload"}), 400

    for user in users:
        if data["name"] == user["name"] and data["password"] == user["password"]:
            return jsonify({"status": "success"}), 200

    return jsonify({"error": "Invalid credentials"}), 401


@app.route('/api/computerList', methods=['GET'])
def get_computer_list():
    return jsonify({"computers": computers}), 200


@app.route('/api/computerList', methods=['DELETE'])
def delete_computer():
    data = request.get_json()
    if not data or "computer" not in data:
        return jsonify({"error": "Invalid payload"}), 400

    computer = data["computer"]
    if computer in computers:
        computers.remove(computer)
        return jsonify({"status": "deleted", "computers": computers}), 200
    else:
        return jsonify({"error": "Computer not found"}), 404


@app.route('/api/upload', methods=['POST'])
def upload():
    data = request.get_json()
    if not data or "machine" not in data or "data" not in data:
        return jsonify({"error": "Invalid payload"}), 400

    machine = data["machine"]
    log_data = data["data"]

    machine_folder = os.path.join(DATA_FOLDER, machine)
    if not os.path.exists(machine_folder):
        os.makedirs(machine_folder)

    filename = generate_log_filename()
    file_path = os.path.join(machine_folder, filename)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(log_data)

    return jsonify({"status": "success", "file": file_path}), 200


if __name__ == "__main__":
    app.run(debug=True)