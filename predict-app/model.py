from sklearn import metrics
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer,TfidfTransformer
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.svm import LinearSVC
# from sklearn.linear_model import LogisticRegression
# from sklearn.neural_network import MLPClassifier
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.linear_model import SGDClassifier
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.ensemble import AdaBoostClassifier
# from sklearn.ensemble import RandomForestClassifier
import pandas as pd
from pyvi import ViTokenizer
import re
import string
import codecs
from joblib import dump, load

train_data = pd.read_csv('data/sample.csv',sep=',',keep_default_na=False)
X_train, X_test, y_train, y_test = train_test_split(train_data.review, train_data.label, test_size=0.05,random_state=42)

#Try some models
# classifiers = [
#             # MultinomialNB(),
#             # DecisionTreeClassifier(),
#             # LogisticRegression(),
#             # SGDClassifier(),
#             LinearSVC(fit_intercept = True,multi_class='crammer_singer', C=1),
#         ]

# svmClassifier = LinearSVC(fit_intercept = True,multi_class='crammer_singer', C=0.3, max_iter = 1000000)

svmClassifier = LinearSVC(C=1.0, class_weight=None, dual=True, fit_intercept=True,
     intercept_scaling=1, loss='squared_hinge', max_iter=100000,
     multi_class='ovr', penalty='l2', random_state=0, tol=1e-05, verbose=0)

# #THÊM STOPWORD LÀ NHỮNG TỪ KÉM QUAN TRỌNG
stop_ws = (u'rằng',u'thì',u'là',u'mà','rang', 'thi', 'la', 'ma')
steps = []
steps.append(('CountVectorizer', CountVectorizer(ngram_range=(1,5),stop_words=stop_ws,max_df=0.5, min_df=5)))
steps.append(('tfidf', TfidfTransformer(use_idf=False, sublinear_tf = True,norm='l2',smooth_idf=True)))
steps.append(('classifier', svmClassifier))
clf = Pipeline(steps)
clf.fit(X_train, y_train)

dump(clf, 'src/exe1/model.dat3') 

