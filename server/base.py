from flask import Flask, render_template, request, redirect, abort
import pandas as pd
import pickle

app = Flask(__name__)


@app.route('/result', methods=['GET', 'POST'])
def result():
    # data = []
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
            # return render_template('index.html', tables=[df.to_html()], titles=[''])

        else:
            return abort(404)
    else:
        return abort(400)


if __name__ == '__main__':
    app.run(debug=True)
