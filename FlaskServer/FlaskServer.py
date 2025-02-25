from flask import Flask
from flask_cors import CORS


users = {"name":"shlomo","password":"1234"}
app = Flask(__name__)
CORS(app)

@app.route('/login')
def home():
    return users

app.run()