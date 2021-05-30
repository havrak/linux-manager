import express from "express";
import SQLConnector from "./services/SQLConnector.js";
import OperationStatus from "./models/OperationStatus.js";
import cors from "cors";
import validator from "email-validator";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const emailRegexp = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://localhost:3000"],
    methods: ["GET", "POST"],
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "this is very secret secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600 * 48 * 1000,
    },
  })
);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

app.post("/users/register", (req, res) => {
  if (validator.validate(req.body.email)) {
    SQLConnector.addNewUserToDatabase(req.body.email, req.body.password).then(
      (result) => {
        res.status(result.statusCode).send({ message: result.status });
      }
    );
  } else {
    res.status(400).send({ message: "Email is not valid" });
  }
});

app.post("/users/login", (req, res) => {
  SQLConnector.loginUser(req.body.email, req.body.password).then((result) => {
    if (result.statusCode == 200) {
      req.session.user = result.data;
      console.log(req.session.user);
      res.status(result.statusCode).send({ message: result.status });
    } else {
      res.status(result.statusCode).send({ message: result.status });
    }
  });
});

app.get("/users/login", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
