const { Router } = require("express");
const config = require("config");
const shortid = require('shortid');
const AuthMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: "Error with getting all links" });
        console.error(err.message);
    }
});

module.exports = router;