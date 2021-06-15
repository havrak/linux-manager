const express = require("express");
const { requireAuth } = require("./middleware");
const { MachineKey } = require("../database/schemas");

const router = express.Router();

module.exports = router;

router.get("/key", requireAuth, (req, res) => {
  MachineKey.find(
    { user: req.user.id },
    { __v: 0, user: 0 },
    (err, machineKeys) => {
      if (err) {
        res.status(400).send({ message: "Get users failed", err });
      } else {
        res.send({
          message: "All public keys retrieved successfully",
          machineKeys,
        });
      }
    }
  );
});

router.post("/key", requireAuth, (req, res) => {
  req.body.user = req.user.id;
  const newMachineKey = MachineKey(req.body);

  newMachineKey.save((err, savedMachineKey) => {
    if (err) {
      res.status(400).send({ message: "Key couldn't be added", err });
    } else {
      res.send({
        message: "MachineKey create successfully",
        machineKey: savedMachineKey,
      });
    }
  });
});

router.delete("/key", requireAuth, (req, res) => {
  MachineKey.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Key removal failed", err });
    } else {
      res.send({ message: "Key successfully deleted" });
    }
  });
});
