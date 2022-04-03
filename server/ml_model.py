from sklearn.feature_selection import SelectKBest, chi2, f_classif, mutual_info_classif
from sklearn.metrics import roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import roc_curve
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import plotly.express as px
import pandas as pd
import re
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
import nltk
from prettytable import PrettyTable
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from keras.preprocessing import sequence
from sklearn.model_selection import train_test_split
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from collections import defaultdict
from collections import Counter
from wordcloud import WordCloud, STOPWORDS
from nltk.corpus import stopwords
from textblob import Word
from bs4 import BeautifulSoup
import pickle
import warnings
warnings.filterwarnings("ignore")


df = pd.read_csv("amznreviews .csv", encoding='utf-8')
df = df.reindex(np.random.permutation(df.index))
df["reviews"] = df["reviews.title"] + "." + df["reviews.text"]
df = df.rename(columns={"reviews.title": "title"})
df['reviews'] = df['reviews'].astype(str)
df = df.rename(columns={"reviews.rating": "rating"})
df["rating"].value_counts()


# rating = df.rating.unique()
# sum_categorical_rating = [df[df.rating == i].size for i in rating]
# print(sum_categorical_rating)
# plt.bar(rating, sum_categorical_rating)
# plt.show()

df = df[df['rating'] != 3.0]
df['sentiment'] = df['rating'].apply(lambda rating: +1 if rating > 3 else -1)

positive = df[df['sentiment'] == 1]
negative = df[df['sentiment'] == -1]
frame = [negative, positive[:negative.shape[0]]]
df = pd.concat(frame)
df = df.sample(frac=1)
# print(df.shape)


# df['sentimentt'] = df['sentiment'].replace({-1: 'negative'})
# df['sentimentt'] = df['sentimentt'].replace({1: 'positive'})
# fig = px.histogram(df, x="sentimentt")
# fig.update_traces(marker_color="indianred", marker_line_color='rgb(8,48,107)',
#                   marker_line_width=1.5)
# fig.update_layout(title_text='Product Sentiment')
# fig.show()


def remove_html(text):
    bs = BeautifulSoup(text, "html.parser")
    return ' ' + bs.get_text() + ' '


def keep_only_letters(text):
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    return text


def convert_to_lowercase(text):
    return text.lower()


def clean_reviews(text):
    text = remove_html(text)
    text = keep_only_letters(text)
    text = convert_to_lowercase(text)
    return text


df['reviews'] = df['reviews'].apply(lambda review: clean_reviews(review))

vectorizer = TfidfVectorizer(min_df=3, analyzer='word', max_features=3000)
vectorizer.fit(df["reviews"])

# storing the vectorizer as a pkl file
pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))

x = vectorizer.transform(df['reviews'])
y = np.array(df["sentiment"])
X_train, X_test, Y_train, Y_test = train_test_split(x, y, random_state=42)

rf = RandomForestClassifier(n_estimators=12)
rf.fit(X_train, Y_train)

# storing the fitted RandomForestClassifier as a pkl file
pickle.dump(rf, open('model.pkl', 'wb'))


# # checking some random value
# val = vectorizer.transform(
#     ["good product", "i am good", "bad product. Such a worst thing"])
# val_pred = rf.predict(val)
# print(val_pred)
# vectorizer_ = pickle.load(open('vectorizer.pkl', 'rb'))
# model_ = pickle.load(open('model.pkl', 'rb'))
# x_ = vectorizer_.transform(
#     ["good product", "i am good", "bad product. Such a worst thing"])
# y_pred = model_.predict(x_)
# print(y_pred)


# y_train_pred = rf.predict(X_train)

# print(confusion_matrix(Y_train, y_train_pred))
# print(classification_report(Y_train, y_train_pred))
# print(accuracy_score(Y_train, y_train_pred))


# y_pred = rf.predict(X_test)
# print(confusion_matrix(Y_test, y_pred))
# print(classification_report(Y_test, y_pred))
# print(accuracy_score(Y_test, y_pred))


# # roc curve for models
# fpr, tpr, thresh = roc_curve(
#     Y_test, rf.predict_proba(X_test)[:, 1], pos_label=1)
# # roc curve for tpr = fpr
# random_probs = [0 for i in range(len(Y_test))]
# p_fpr, p_tpr, _ = roc_curve(Y_test, random_probs, pos_label=1)
# plt.figure(figsize=(12, 10))
# sns.lineplot(x=fpr, y=tpr,)

# plt.xlabel("False Positive Rate")
# plt.ylabel("Sensitivity (TPR)")


# roc_auc_score(Y_test, rf.predict_proba(X_test)[:, 1])
