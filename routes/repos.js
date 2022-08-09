var express = require('express');
var router = express.Router();
const axios = require('axios');
const { query, validationResult } = require('express-validator');

/* GET a repo's PRs */
router.get('/',
    query('owner').notEmpty(), // express-validator middleware
    query('repo').notEmpty(), // express-validator middleware
    async (req, res) => {
        try {
            // send error message if required query params are not present
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const config = {
                method: 'get',
                url: `https://api.github.com/repos/${req.query.owner}/${req.query.repo}/pulls`,
                headers: {
                    'Authorization': 'Basic bWFyY3VzZzYyOmdocF9BVEJJSk1IN29WbnZ2ZjZ4TFNvMWpLdWsyNGt1M2UyeXBTY28='
                }
            };
            let response = await axios(config);

            let promisesArray = []
            for (pr of response.data) {
                promisesArray.push(
                    axios({
                        method: "get",
                        url: pr.commits_url,
                        headers: {
                            'Authorization': 'Basic bWFyY3VzZzYyOmdocF9BVEJJSk1IN29WbnZ2ZjZ4TFNvMWpLdWsyNGt1M2UyeXBTY28=' // to do: set config vars
                        }
                    })
                )
            }
            let results = await Promise.allSettled(promisesArray)
            let pullRequests = []; // store final result
            for (let i = 0; i < response.data.length; i++) {
                pullRequests.push({
                    id: response.data[i].id,
                    number: response.data[i].number,
                    title: response.data[i].title,
                    author: response.data[i].user.login,
                    commit_count: results[i].value?.data?.length ? results[i].value?.data?.length : -1 // if value was lost, -1 signifies error
                })
            }
            return res.send(pullRequests) // TO DO: how to paginate? default length is 30
        }
        catch (error) {
            if (error.response.status == 404) {
                return res.status(404).send("Repo Not Found");
            }
            return res.status(500).send(error);
        }

    });

module.exports = router;
