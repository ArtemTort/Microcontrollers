const { Router } = require("express");
const path = require('path');
const AuthMiddleware = require("../middleware/auth.middleware");

const router = Router();

router.post("/", AuthMiddleware, async (req, res) => {

    try {
        res.sendFile('../client/view/index.html'); 
    } catch (err) {
        res.status(500).json({ message: "Error with user" });
        console.error(err.message);
    }
});

module.exports = router;