// configure the connection to express
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
// read
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err, "ERROR");
      return res.json("Error");
    }
    return res.json(data);
  });
});
// create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
// update
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// delete
app.delete("/student/:id", (req, res) => {
  const sql = "Delete from student where ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});
/*
check if the server is running
to test , run these in terminal
- cd backend
- node server.js
 if you see Listening to port 8081 means its running
 then create new terminal 
 - cd backend
 - npm start
*/
app.listen(8081, () => {
  console.log("Listening to port 8081");
});
