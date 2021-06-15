const express = require("express");
const { requireAuth } = require("./middleware");
const { MachineKey } = require("../database/schemas");

const openpgp = require("openpgp");
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
  MachineKey.find(
    {
      user: req.user.id,
      public_key: req.body.public_key,
    },
    { __v: 0, user: 0 },
    (err, result) => {
      if (result.length != 0) {
        res.status(400).send({ message: "This key is already stored" });
      } else {
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
      }
    }
  );
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
router.get("/collector", requireAuth, (req, res) => {
  res.download(path)("./server/config/collector.zip");
});

router.post("/data", (req, res) => {
  MachineKey.find(
    {
      public_key: req.body.publicKey.replace(/\s/g, ""),
    },
    { __v: 0 },
    (err, result) => {
      if (err) throw err;
      req.body.user = result[0].user;
      openpgp.readKey({ armoredKey: req.body.publicKey }).then((publicKey) => {
        const cleartextMessage = req.body.signedMessage;
        openpgp.readCleartextMessage({ cleartextMessage }).then((message) => {
          openpgp
            .verify({ message: message, verificationKeys: publicKey })
            .then((verified) => {
              console.log(verified);
              if (verified.signatures[0].valid) {
                const informationAboutMachine = JSON.parse(verified.data);
                console.log(informationAboutMachine);
                // woo ho we have confirmend signature
                const data = {
                  user: result[0].user,
                };
              }
            });
        });
      });
    }
  );
});
