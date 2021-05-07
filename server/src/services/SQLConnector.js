import mysql from "mysql";
import bcrypt from "bcrypt";
import sqlConfig from "./../../config/sqlconfig.js";
import OperationStatus from "./../models/OperationStatus.js";

export default class SQLConnector {
  con = mysql.createConnection(sqlConfig);

  static getAllUsers() {
    con.query("SELECT * FROM users");
  }
  static addNewUserToDatabase(email, password) {
    return new Promise((resolve) => {
      bcrypt.genSalt().then((result) => {
        bcrypt.hash(password, result).then((pass) => {
          con.query(
            "INSET INTO users (pass_hash, email) VALUES(?,?)",
            [pass, email],
            (err, rows) => {
              if (err) {
                resolve(
                  new OperationStatus(
                    500,
                    "user could not have been added to db"
                  )
                );
              } else {
                resolve(new OperationStatus(200));
              }
            }
          );
        });
      });
    });
  }
  static loginUser(email, password) {
    return new Promise((resolve) => {
      con.query("SELECT * FROM users WHERE email=?", email, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
          new OperationStatus(500, "user does not exist");
        } else {
          bcrypt.compare(password, rows[0].pass_hash).then((result) => {
            if (result) {
              resolve(new OperationStatus(200));
            } else {
              resolve(new OperationStatus(401, "password does not match"));
            }
          });
        }
      });
    });
  }
}
