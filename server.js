const express = require('express');
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const mongojs = require('mongojs');
const localhost = 8080;

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/game_results', (req, res) => {
  db.collection('game_results').find().toArray((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});


app.post('/game_results', (req, res) => {
  const result = {
    name: req.body.name,
    result: req.body.result,
  };

  db.collection('game_results').insert(result, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  });
});

MongoClient.connect('mongodb://Simaxa7:8agAXnXgs6cuy3b@ds121889.mlab.com:21889/rss_game', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(localhost, () => {
    console.log("server started on localhost:" localhost);
  });
});
