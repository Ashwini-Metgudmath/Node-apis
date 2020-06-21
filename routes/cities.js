const express = require("express");

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const { MYSQL_URL } = process.env;
const connection = mysql.createConnection(MYSQL_URL);
//const connection = require('./../database');

const cityRouter = express.Router();


cityRouter.get('/', (req, res) =>{
    connection.query('SELECT * from cities', (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})

cityRouter.post('/', (req, res) =>{
    const city = req.body;
    //console.log(`city : ${city}`);
    connection.query('INSERT into cities set ? ', city, (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})


  module.exports = cityRouter;