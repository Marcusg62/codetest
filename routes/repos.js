var express = require('express');
var router = express.Router();
const axios = require('axios');
const { query, validationResult } = require('express-validator');

/* GET a repo's PRs */
router.get('/',
    query('owner').notEmpty(), // express-validator middleware
    query('repo').notEmpty(), // express-validator middleware
    async (req, res, next) => {
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
                    'Authorization': 'Basic bWFyY3VzZzYyOmdocF9RVFRFT21hTVgxMHl5dGxrVkdwSDFBYlVWOHpvSVIxd1ZpekQ='
                }
            };
            let response = await axios(config);
            let pullRequests = [];

            for (pr of response.data) {
                try {
                    let commits = await axios({
                        method: "get",
                        url: pr.commits_url,
                        headers: {
                            'Authorization': 'Basic bWFyY3VzZzYyOmdocF9RVFRFT21hTVgxMHl5dGxrVkdwSDFBYlVWOHpvSVIxd1ZpekQ=' // to do: set config vars
                        }
                    })
                    pullRequests.push({
                        id: pr.id,
                        number: pr.number,
                        title: pr.title,
                        author: pr.user.login,
                        commit_count: commits.data.length
                    })
                } catch (error) {
                    pullRequests.push({
                        id: pr.id,
                        number: pr.number,
                        title: pr.title,
                        author: pr.user.login, 
                        commit_count: -1 // if error, just return -1
                    })
                }

            }

            res.send(pullRequests) // TO DO: how to paginate? default length is 30
        }
        catch (error) {
            console.log('error', error)
            return res.sendStatus(500).send(error);
        }

    });

module.exports = router;
