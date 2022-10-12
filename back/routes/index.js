const express = require("express");
const router = express.Router();

const ctrl = require("./index.ctrl");

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/write", ctrl.process.write);
router.post("/listview", ctrl.process.listview);

module.exports = router;
