import mysql from "mysql";

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_express-pretest",
});

connection.connect((err) => {
  if (!!err) {
    console.log(err);
  } else {
    console.log("Connection Success");
  }
});

export default connection;
