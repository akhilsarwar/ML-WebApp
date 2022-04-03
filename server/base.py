from flask import Flask,render_template, request, redirect
import pandas as pd

app = Flask(__name__)

@app.route('/result', methods = ['GET', 'POST'])
def result():
    # data = []
    if request.method == 'POST':
        if request.files:
            uploaded_file = request.files['file'] 
            df= pd.read_csv(uploaded_file, nrows=100)


            # mydata =df.values
            return render_template('index.html', tables=[df.to_html()], titles=[''])
            
            
        else:
            return "Error1"
    else:
        return "Error2"


if __name__ == '__main__':
    app.run(debug = True)