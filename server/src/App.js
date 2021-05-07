import express from "express";
import SQLConnector from "./services/SQLConnector.js";
import OperationStatus from "./models/OperationStatus.js";

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const app = express();

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

app.post("/users/register", (req, res) => {
  console.log("got request");
  if (emailRegexp.test(req.body.password)) {
    SQLConnector.addNewUserToDatabase(req.body.email, req.body.password).then(
      (result) => {
        res.status(result.statusCode).send();
      }
    );
  }
});

app.post("/users/login", (req, res) => {
  SQLConnector.loginUser(req.body.email, req.body.password).then((result) => {
    //
  });
});
