import mysql from "mysql";
import bcrypt from "bcrypt";
import sqlConfig from "./../../config/sqlconfig.js";
import OperationStatus from "./../models/OperationStatus.js";
import User from "./../models/User.js";

export default class SQLConnector {
  static connection = mysql.createConnection(sqlConfig);

  static getAllUsers() {
    con.query("SELECT * FROM users");
  }

  static addNewUserToDatabase(email, password) {
    return new Promise((resolve) => {
      bcrypt.genSalt().then((result) => {
        bcrypt.hash(password, result).then((pass) => {
          this.connection.query(
            "INSERT INTO users (pass_hash, email) VALUES(?,?)",
            [pass, email],
            (err, rows) => {
              if (err) {
                if (err.errno === 1062) {
                  resolve(
                    new OperationStatus(400, "user is already registered")
                  );
                } else {
                  resolve(
                    new OperationStatus(
                      400,
                      "user could not have been added to database"
                    )
                  );
                }
              } else {
                resolve(
                  new OperationStatus(200, "successfully registered new user")
                );
              }
            }
          );
        });
      });
    });
  }

  static loginUser(email, password) {
    console.log(email + " " + password);
    return new Promise((resolve) => {
      this.connection.query(
        "SELECT * FROM users WHERE email=?",
        email,
        (err, rows) => {
          if (err) throw err;
          if (rows.length == 0) {
            resolve(new OperationStatus(400, "user does not exist"));
          } else {
            bcrypt.compare(password, rows[0].pass_hash).then((result) => {
              if (result) {
                let toReturn = new OperationStatus(
                  200,
                  "login was successful",
                  new User(rows[0].id, rows[0].email)
                );
                resolve(toReturn);
              } else {
                resolve(new OperationStatus(401, "password does not match"));
              }
            });
          }
        }
      );
    });
  }
}
