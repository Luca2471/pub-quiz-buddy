const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const quizRouter = require('./helpers/quiz_router.js')

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('quizBuddy');
    const pubQuizzesCollection = db.collection('pubQuizzes');
    const pubQuizzesRouter = quizRouter(pubQuizzesCollection);
    app.use('/api/pubQuizzes/', pubQuizzesRouter);
  })
  .catch(console.err);

  app.listen(3000, function () {
    console.log(`listening on port ${ this.address().port }`)
  })
