const app = require("./app")
const request = require('supertest');
const assert = require('assert');

describe("Test Hello World", () => {
    test("should send 200 status code", async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
    })
    test("payload should be 'Hello World'", async () => {
        const response = await request(app).get("/")
        expect(response.text).toBe("Hello World")
    })
})

describe("get repos", () => {
    describe("given an owner and repo", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/")
            expect(response.statusCode).toBe(200)
        })
        // should respond with array of pull requests for that repository
        // response should contain array of objects with the following properties
        //     id: 1,
        //     number: 100,
        //     title: "Tile of Pull Request 1",
        //     author: "Author of Pull Request 1",
        //     commit_count: 8

        // should have json content type header

    })

    // describe("when the owner is missing", () => {
    //     // should respond with 400 status code

    // })

    // describe("when the repo is missing", () => {
    //     // should respond with 400 status code
    // })

    // describe("When the repo is not found", () => {
    //     // should respond with 404? status code 

    // })

})