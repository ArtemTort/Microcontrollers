const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator"); 
const config = require("config");
const User = require("../models/User");

const router = Router();

// api/auth/register
router.post(
    "/register",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Too short password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid user data",
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: "User with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ message: "User successfully created" });
        } catch (err) {
            res.status(500).json({ message: "Error with registration" });
            console.error(err.message);
        }
    }
);

// api/auth/login
router.post(
    "/login",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Enter password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid user data",
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({
                        message:
                            "User with this email or password does not exist",
                    });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({
                        message:
                            "User with this email or password does not exist",
                    });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '6h' } // TODO: МОЖно убрать потом
            );

            res.status(200).json({ token, userId: user.id });
        } catch (err) {
            res.status(500).json({ message: "Error with login" });
            console.error(err.message);
        }
    }
);

module.exports = router;
