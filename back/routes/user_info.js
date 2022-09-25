const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
