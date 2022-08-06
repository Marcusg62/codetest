var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET a repo */
router.get('/', async (req, res, next) => {
    const config = {
        method: 'get',
        url: 'https://api.github.com/repos/twbs/bootstrap' + '/pulls', // TO DO: make dyanmic with query string 
        headers: {} // TO DO: implement authenticated users PRs
    };
    let response = await axios(config);
    response.data = response.data.map(pr => {
        return {
            id: pr.id,
            number: pr.number,
            title: pr.title,
            author: pr.author,
            commit_count: pr.commit_count
        };
    });
    res.send(response.data) // TO DO: how to paginate? default length is 30
});

module.exports = router;
