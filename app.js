const path = require("path");
const express = require('express');
const queries = require("./controller/queries");
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/logged-tweets', (req, res) => {
  queries.returnAllTweets().then((tweets) =>{
    res.render('allTweets', { tweets });
  });
});

app.get('/logged-users', (req, res) => {
  queries.returnAllUsers().then((users) =>{
    res.render('logged-users', { users });
  });
});

app.delete('/tweets/:id_str', (req, res) =>{
  queries.removeTweetById(req.params.id_str)
    .catch(e => {
      throw e;
    });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
