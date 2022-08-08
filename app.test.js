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

describe("/repos Get Pull Requests", () => {
    describe("given an owner and repo", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/repos").query({ owner: "twbs", "repo": "bootstrap" })
            expect(response.statusCode).toBe(200)
        })
        test("response should contain array of objects with the following properties", async () => {
            const response = await request(app).get("/repos").query({ owner: "twbs", "repo": "bootstrap" })
            expect(response.body[0]).toMatchSnapshot({
                id: expect.any(Number),
                number: expect.any(Number),
                title: expect.any(String),
                author: expect.any(String),
                commit_count: expect.any(Number)
            })

        })
    })
    // 


    // should have json content type header


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