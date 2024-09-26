const express = require("express");
const ExpressError = require("../expressError");
const items = require("../fakeDb");
const router = new express.Router();

router.get("/", function (req, res, next) {
    return res.json({ items });
});

router.get("/:name", function (req, res, next) {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    res.json({ item: foundItem });
});

router.post("/", function (req, res, next) {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
});

router.patch("/:name", function (req, res, next) {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    return res.json({ item: foundItem });
});

router.delete("/:name", function (req, res, next) {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    items.splice(foundItem, 1);
    return res.json({ message: "Deleted" });
});

module.exports = router;
