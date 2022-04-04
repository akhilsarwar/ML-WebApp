from crypt import methods
from flask import Flask, render_template, request, redirect, abort, send_from_directory
import pandas as pd
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

app.config["CLIENT_CSV"] = "."


@app.route('/result', methods=['GET', 'POST'])
def result():
    if request.method == 'POST':
        if request.files:
            uploaded_file = request.files['file']
            df = pd.read_csv(uploaded_file)

            vectorizer_ = pickle.load(open('vectorizer.pkl', 'rb'))
            model_ = pickle.load(open('model.pkl', 'rb'))

            # the input column name
            col_inp = 'reviews'
            vec_x = vectorizer_.transform(df[col_inp])
            result = model_.predict(vec_x)
            print(result)

            pd.DataFrame({'sentiment': result}).to_csv('./output.csv')

            return "success"

        else:
            return abort(404)
    else:
        return abort(400)


@app.route('/getoutput', methods=['GET'])
def getoutput():
    if request.method == 'GET':
        try:
            return send_from_directory(directory=app.config["CLIENT_CSV"], path="output.csv", as_attachment=True)
        except FileNotFoundError:
            abort(404)
    else:
        abort(400)


if __name__ == '__main__':
    app.run(debug=True)
