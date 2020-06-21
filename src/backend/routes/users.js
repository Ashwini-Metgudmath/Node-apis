const express = require("express");

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const { MYSQL_URL } = process.env;
//const connection = mysql.createConnection(MYSQL_URL);

const connection = require('./../database');

const userRouter = express.Router();

userRouter.get('/', (req, res) =>{
    connection.query('SELECT * from users', (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})

userRouter.post('/', (req, res) =>{
    const user = req.body;
    //console.log(`user : ${user}`);
    connection.query('INSERT into users set ? ', user, (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})

userRouter.put('/:id', (req, res) =>{
    const user = req.body;
      const id = parseInt(req.params.id);
      connection.query(`UPDATE users SET ? WHERE id=${id}`, user, (err, results, fields) =>{
      if(err)
          return res.send(err);
          else
          res.json(results);
    });
  })

module.exports = userRouter;


