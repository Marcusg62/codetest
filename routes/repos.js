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
                url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
                headers: {}
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
        }
        catch (error) {
            return res.status(500);
        }
    });

module.exports = router;
