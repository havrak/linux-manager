// currently cronjob needs to be setup to periodicaly update database of your package manager.

const openpgp = require("openpgp");
const sysinfo = require("systeminformation"); // method getFQDN uses command hostname, which for some reasons isn't present, thus library needs to be edited in oder to not call this function. FQDN is not necessary by this program in its current version.
const fs = require("fs");
const homedir = require("os").homedir();
var colors = require("colors");
var readline = require("readline");
const configPath = homedir + "/.config/linux-manager/config.json";
const { exec } = require("child_process");
const request = require("superagent");

class Disk {
  constructor(device, mount, size, used) {
    this.device = device;
    this.mount = mount;
    this.size = size;
    this.used = used;
  }
  device;
  mount;
  size;
  used;
}

const dataStructure = {
  specs: {
    cpu: {
      model: undefined,
      maxCPUSpeed: undefined,
      usage: undefined,
    },
    ram: {
      capacity: undefined,
      usage: undefined,
    },
    disk: undefined,
  },
  system: {
    os: {
      name: undefined,
      version: undefined,
      kernel: undefined,
    },
    packages: {
      nameOfPackageManager: undefined,
      installed: undefined,
      updatable: undefined,
    },
  },
};
let gotPassConfig = false;

function gatherData() {
  return new Promise((resolve) => {
    sysinfo
      .cpu()
      .then((result) => {
        dataStructure.specs.cpu.model = result.brand;
        dataStructure.specs.cpu.maxCPUSpeed = result.speedMax;
        dataStructure.specs.cpu.usage = result.speed;
        sysinfo
          .mem()
          .then((result) => {
            dataStructure.specs.ram.capacity = result.total;
            dataStructure.specs.ram.usage = result.used;
            sysinfo
              .osInfo()
              .then((result) => {
                dataStructure.system.os.name = result.distro;
                dataStructure.system.os.version = result.release;
                dataStructure.system.os.kernel = result.kernel;
                exec("getPackageManager.sh", (err, stdout, stderr) => {
                  const result = stdout.substr(0, stdout.length - 1).split(","); // command returns string with escape characted
                  dataStructure.system.packages.nameOfPackageManager =
                    result[0];
                  dataStructure.system.packages.installed = result[1];
                  dataStructure.system.packages.updatable = result[2];
                  sysinfo
                    .fsSize()
                    .then((sizes) => {
                      dataStructure.specs.disk = new Array(sizes.length);
                      for (let i = 0; i < sizes.length; i++) {
                        dataStructure.specs.disk[i] = new Disk(
                          sizes[i].fs,
                          sizes[i].mount,
                          sizes[i].size,
                          sizes[i].used
                        );
                      }
                      resolve(true);
                    })
                    .catch((error) => {
                      throw error;
                    });
                });
              })
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  });
}

async function sendData() {
  const config = require(configPath);
  const unsignedMessage = await openpgp.createCleartextMessage({
    text: JSON.stringify(dataStructure),
  });

  const privateKey = await openpgp.readKey({ armoredKey: config.privateKey });
  const signedMessage = await openpgp.sign({
    message: unsignedMessage,
    signingKeys: privateKey,
  });
  console.log(signedMessage);
  console.log(`${config.serverLocation}:${config.serverPort}/api/machines/`);
  request
    .put(`${config.serverLocation}:${config.serverPort}/api/machines/`)
    .send({ publicKey: config.publicKey, signedMessage: signedMessage })
    .then(() => {
      console.log("data has been sent to the server");
    });
  // const unsignedMessage = await openpgp.CleartextMessage.fromText(
  //   JSON.stringify(dataStructure)
  // );
  // const signedMessage = await openpgp.sign({
  //   message: unsignedMessage,
  //   signingKeys: config.privateKey,
  // });
  // console.log(signedMessage);
}

try {
  const config = require(configPath);
  gotPassConfig = true;
  gatherData().then(() => {
    console.log(dataStructure);
    sendData();
  });
} catch (e) {
  if (gotPassConfig) {
    console.log("Programm failed for unknown reasons".red);
    process.exit(1);
  }
  let config = {
    serverLocation: "localhost",
    serverPort: 3000,
    email: undefined,
    privateKey: undefined,
    publicKey: undefined,
    passphrase: undefined,
  };
  console.log("Config isn't created");
  console.log(
    "Warning for now your privatekey will be stored in clear file, please generate special pair for this program purpose"
      .red
  );
  console.log("New key can be generate with 'gpg --full-generate-key'");
  var interface = readline.createInterface(process.stdin, process.stdout);
  interface.question(
    "Enter mail adress to which key was generated: ",
    (answer) => {
      config.email = answer;
      interface.question("Enter passphrase: ", (answer) => {
        config.passphrase = answer;

        exec(
          `gpg --output /tmp/public.pgp --armor --export ${config.email}`,
          (err, stdout, stderr) => {
            let command;
            if (config.passphrase == undefined) {
              command = `echo ${config.passphrase} | gpg --output /tmp/private.pgp --armor --passphrase-df 0 --export-secret-key ${config.email}`;
            } else {
              command = `gpg --output /tmp/private.pgp --armor --export-secret-key ${config.email}`;
            }
            exec(command, (err, stdout, stderr) => {
              // now keyes need to be read
              fs.readFile("/tmp/public.pgp", "utf8", (err, data) => {
                config.publicKey = data;
                fs.readFile("/tmp/private.pgp", "utf8", (err, data) => {
                  config.privateKey = data;
                  fs.mkdir(
                    configPath.substr(0, configPath.lastIndexOf("/")),
                    (err) => {
                      fs.writeFile(
                        configPath,
                        JSON.stringify(config),
                        (err) => {
                          if (err) throw err;

                          console.log("Config created"); // Success
                          process.exit(0);
                        }
                      );
                    }
                  );
                  exec("rm /tmp/private.pgp");
                  exec("rm /tmp/public.pgp");
                });
              });
            });
          }
        );
      });
    }
  );
}
