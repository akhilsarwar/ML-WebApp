from crypt import methods

from numpy import vectorize
import numpy
from flask import Flask, render_template, request, redirect, abort, send_from_directory
import pandas as pd
from flask_cors import CORS
import pickle
import random
import json

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

            result_text = []

            for res in result:
                result_text.append(getReviewText(res))

            pd.DataFrame({'sentiment': result, 'input': df[col_inp], 'business suggestion': result_text}
                         ).to_csv('./output.csv')

            return "success"

        else:
            return abort(404)
    else:
        return abort(400)


@app.route('/result2', methods=['POST'])
def result2():
    print(request.method)
    if request.method == 'POST':

        data = json.loads(request.data)

        print(data)

        vectorizer_ = pickle.load(open('vectorizer.pkl', 'rb'))
        model_ = pickle.load(open('model.pkl', 'rb'))

        # the input column name
        input_str = [data['review']]
        input_str = numpy.array(input_str)
        vec_x = vectorizer_.transform(input_str)
        result = model_.predict(vec_x)

        response = {'result': int(result[0])}

        response['bussiness_suggestion'] = getReviewText(int(result[0]))
        res = json.dumps(response)
        return res

    else:
        abort(400)


@ app.route('/getoutput', methods=['GET'])
def getoutput():
    if request.method == 'GET':
        try:
            return send_from_directory(directory=app.config["CLIENT_CSV"], path="output.csv", as_attachment=True)
        except FileNotFoundError:
            abort(404)
    else:
        abort(400)


# get a random review message from
# server. there are a total of 10 reviews

def getReviewText(sentiment_res):

    file_name = "business_suggestions_neg.txt"

    if(sentiment_res == 1):
        file_name = "business_suggestions_pos.txt"

    reviews = []
    with open(file_name, 'r') as file:
        reviews = file.readlines()

    # print(reviews)

    return random.choice(reviews)


if __name__ == '__main__':
    app.run(debug=True)
