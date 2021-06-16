const express = require("express");
const { requireAuth } = require("./middleware");
const { MachineKey, Data } = require("../database/schemas");

const openpgp = require("openpgp");
const { json } = require("body-parser");
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

router.get("/data", requireAuth, (req, res) => {
  //console.log("yaayyashkasdbkfdsahbjfabkh");
  MachineKey.find(
    {
      user: req.user.id,
    },
    { __v: 0, user: 0 },
    (err, usersMachines) => {
      if (err) {
        res.status(400).send({
          message: "Failed to find machines that belong to user",
          err,
        });
      } else {
        let toReturn = new Array();
        let variable = 0;
        usersMachines.forEach((machine) => {
          //console.log("machine is: ");
          //console.log(machine);
          Data.find(
            { public_key: machine.public_key },
            {},
            (err, systemInfos) => {
              if (systemInfos.length > 1) {
                let toPush = {
                  _id: systemInfos[systemInfos.length - 1]._id,
                  user: systemInfos[systemInfos.length - 1].user,
                  public_key: systemInfos[systemInfos.length - 1].public_key,
                  name: systemInfos[systemInfos.length - 1].name,
                  system_information:
                    systemInfos[systemInfos.length - 1].system_information,
                  logged_at: systemInfos[systemInfos.length - 1].logged_at,
                  cpu_log: undefined,
                  ram_log: undefined,
                  timestamp_log: undefined,
                };
                //systemInfos[systemInfos.length - 1]; // if one doesn't fuck up last position will be newest
                //console.log(toPush);
                toPush.cpu_log = new Array();
                toPush.ram_log = new Array();
                toPush.timestamp_log = new Array();
                for (let i = systemInfos.length - 1; i >= 0; i--) {
                  if (
                    new Date(systemInfos[i].logged_at).getTime() + 7200000 >=
                    Date.now()
                  ) {
                    const jsonInfo = JSON.parse(
                      systemInfos[i].system_information
                    );
                    toPush.cpu_log.push(jsonInfo.specs.cpu.usage);
                    toPush.ram_log.push(jsonInfo.specs.ram.usage);
                    toPush.timestamp_log.push(systemInfos[i].logged_at);
                  }
                }
                console.log("to push");
                console.log(toPush);
                console.log(toPush.cpu_log);
                toReturn.push(toPush);
              }
              variable++;
              if (variable == usersMachines.length) {
                res.send({
                  message:
                    "Data about all users machine retrieved successfully",
                  systemInformations: toReturn,
                });
              }
            }
          );
        });
        //
      }
    }
  );

  //Data.find(
  //  { user: req.user.id },
  //  { __v: 0, user: 0 },
  //  (err, systemInformations) => {
  //    //console.log(systemInformations);
  //    if (err) {
  //      res.status(400).send({ message: "Failed to retrieve data ", err });
  //    } else {
  //      //const toReturn = new Array();
  //      //systemInformations.forEach((system) => {
  //      //  console.log("formating");
  //      //  const data = JSON.parse(system.system_information);
  //      //  system.system_information = { data };
  //      // console.log(system.system_information);
  //      //  toReturn.push(system);
  //      //});
  //      //console.log("sending");
  //      //console.log(toReturn);
  //      res.send({
  //        message: "Data about all users machine retrieved successfully",
  //        systemInformations: systemInformations,
  //      });
  //    }
  //  }
  //);
});

router.post("/data", (req, res) => {
  MachineKey.find(
    {
      public_key: req.body.publicKey.replace(/\s/g, ""),
    },
    { __v: 0 },
    (err, result) => {
      // check if already is data in databse, if more than 12 or whatever delete oldest
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
                const uwuwu = {
                  user: result[0].user,
                  public_key: result[0].public_key,
                  name: result[0].name,
                  system_information: verified.data,
                };
                const data = Data(uwuwu);

                data.save((err, savedData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(savedData);
                  }
                });
              }
            });
        });
      });
    }
  );
});
