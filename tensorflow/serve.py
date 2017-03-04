import json

import tensorflow as tf
from flask import Flask, request, Response

import test


app = Flask(__name__)


# Routing
@app.route('/', methods=['GET'])
def reply():
  content = json.dumps({'txt': test.decode_line(sess, model, enc_vocab,
    rev_dec_vocab, request.args['txt'])})
  res = Response(content)
  # Allow CORS
  res.headers['Access-Control-Allow-Origin'] = '*'
  res.headers['Access-Control-Expose-Headers'] = 'Access-Control-Allow-Origin'
  return res


# Seq2Seq model
sess = tf.Session()
sess, model, enc_vocab, rev_dec_vocab = test.init_session(sess,
  conf='seq2seq_serve.ini')


# Start app
if __name__ == '__main__':
    app.run(port=5000, debug=True)
