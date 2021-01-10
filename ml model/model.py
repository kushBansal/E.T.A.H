import pandas as pd, numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import pickle

train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')
subm = pd.read_csv('sample_submission.csv')

label_cols = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
train['none'] = 1-train[label_cols].max(axis=1)
train.describe()

COMMENT = 'comment_text'
train[COMMENT].fillna("unknown", inplace=True)
test[COMMENT].fillna("unknown", inplace=True)

import re, string
re_tok = re.compile(f'([{string.punctuation}“”¨«»®´·º½¾¿¡§£₤‘’])')
def tokenize(s): return re_tok.sub(r' \1 ', s).split()

n = train.shape[0]
vec = TfidfVectorizer(ngram_range=(1,2), tokenizer=tokenize,
               min_df=3, max_df=0.9, strip_accents='unicode', use_idf=1,
               smooth_idf=1, sublinear_tf=1 )
trn_term_doc = vec.fit_transform(train[COMMENT])
test_term_doc = vec.transform(test[COMMENT])
pickle.dump(vec,open('tokenizor.pkl','wb'))

def pr(y_i, y):
    p = x[y==y_i].sum(0)
    return (p+1) / ((y==y_i).sum()+1)
x = trn_term_doc
test_x = test_term_doc

def get_mdl(y):
    y = y.values
    r = np.log(pr(1,y) / pr(0,y))
    m = LogisticRegression(C=4, dual=True,solver='liblinear')
    x_nb = x.multiply(r)
    return m.fit(x_nb, y), r

pd_r = np.zeros((6,426005))

preds = np.zeros((len(test), len(label_cols)))

for i, j in enumerate(label_cols):
    
    m,r = get_mdl(train[j])
    # print('fit', j,r)
    pd_r[i] = r
    if i==0:
        name='predict0.pkl'
    if i==1:
        name='predict1.pkl'
    if i==2:
        name='predict2.pkl'
    if i==3:
        name='predict3.pkl'
    if i==4:
        name='predict4.pkl'
    if i==5:
        name='predict5.pkl'
    pickle.dump(m,open(name,'wb'))
    preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]

pd_r = pd.DataFrame(data = pd_r)

pd_r.to_csv('r.csv', index=False)


submid = pd.DataFrame({'id': subm["id"]})
submission = pd.concat([submid, pd.DataFrame(preds, columns = label_cols)], axis=1)
submission.to_csv('submission.csv', index=False)