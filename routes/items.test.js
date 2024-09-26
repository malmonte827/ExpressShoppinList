process.env.Node_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "DS", price: 200 };

beforeEach(function () {
    items.push(item);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", function () {
    test("Get list of all itmes", async function () {
        const res = await request(app).get("/items");
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [item] });
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", function () {
    test("Get a single item", async function () {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });

    test("404 response when item not found", async function () {
        const res = await request(app).get(`/items/nothere`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("Add item to shopping list", async function () {
        const res = await request(app)
            .post(`/items`)
            .send({ name: "Switch", price: 300 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: { name: "Switch", price: 300 } });
    });
});

describe("PATCH /items/:name", function () {
    test("Update a single item", async function () {
        const res = await request(app)
            .patch(`/items/${item.name}`)
            .send({ name: "GameBoy" });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({ name: "GameBoy", price: 200 });
    });
    test("404 response when item not found", async function () {
        const res = await request(app).patch(`/items/nothere`);
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", function () {
    test("Deletes a single item", async function () {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
    test("404 response when item not found", async function () {
        const res = await request(app).delete(`/items/nothere`);
        expect(res.statusCode).toBe(404);
    });
});
