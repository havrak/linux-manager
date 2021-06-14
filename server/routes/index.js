const express = require("express");
const path = require("path");

const auth = require("./auth");
const user = require("./user");
const users = require("./users");
const machines = require("./machines");

const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/users", users);
router.use("/api/machines", machines);

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

module.exports = router;
