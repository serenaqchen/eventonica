var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://localhost:5432/eventonica')


db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Our express app is working properly' });
});

module.exports = router;
