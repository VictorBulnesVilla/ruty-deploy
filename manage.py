import json
import requests
from flask import  jsonify, request, Flask,render_template
#from forms import contact

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("dashboard.html")


if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)