import app from './app.js';

describe("GET /repos", () => {
    describe("given an owner and repo", () => {
        // should respond with array of pull requests for that repository
        // response should contain array of objects with the following properties
        //     id: 1,
        //     number: 100,
        //     title: "Tile of Pull Request 1",
        //     author: "Author of Pull Request 1",
        //     commit_count: 8
        // should respond with a 200 status code
        // should have json content type header

    })

    describe("when the owner is missing", () => {
        // should respond with 400 status code

    })

    describe("when the repo is missing", () => {
        // should respond with 400 status code
    })

    describe("When the repo is not found", () => {
        // should respond with 404? status code 
        
    })

})