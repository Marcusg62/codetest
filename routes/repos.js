var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET a repo */
router.get('/', async (req, res, next) => {
    const config = {
        method: 'get',
        url: 'https://api.github.com/repos/twbs/bootstrap/pulls',
        headers: {}
    };

    let response = await axios(config);
    res.send(response.data)
});

module.exports = router;
