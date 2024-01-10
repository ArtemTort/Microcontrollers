const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") return next();

    try {
        const token = req.body.token
        let isExpire = false;

        if (!token) {
            return res.status(401).json({ message: "User not authorized" });
        }

        jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    isExpire = true;
                }
            } else {
                req.user = decoded;
            }
        });
        if (isExpire) {
            return res.status(200).json({ isExpire });
        } 


        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "User not authorized" });
    }
};
