const express = require("express");
const {signup, login, refreshToken} = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-Token", refreshToken)

module.exports = router;