var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello World'); // just for a quick check
});

module.exports = router;
