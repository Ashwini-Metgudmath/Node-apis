const express = require("express");


const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const { MYSQL_URL } = process.env;
//const connection = mysql.createConnection(MYSQL_URL);
const connection = require('../database');

const serviceRouter = express.Router();

serviceRouter.get('/', (req, res) =>{
    connection.query('SELECT * from services', (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})



serviceRouter.post('/', (req, res) =>{
    const service = req.body;
    //console.log(`service : ${service}`);
    
        connection.query(`SELECT * from services where name = "${service.name}" AND city_id <> ${service.city_id}`, service, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
             if(results.length > 0){
                 res.send(`Con't add, service is already available in diffrent the city`);
             }
             else
             addService('INSERT into services set ? ', service);
        });
    

    const addService = (queryType, queryParameter) => {
        connection.query(queryType,queryParameter, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
             res.json(results);
        });
    } 
    
})

serviceRouter.put('/:id', (req, res) =>{
  const service = req.body;
	const id = parseInt(req.params.id);
	connection.query(`UPDATE services SET ? WHERE id=${id}`, service, (err, results, fields) =>{
    if(err)
        return res.send(err);
        else
        res.json(results);
  });
})

module.exports = serviceRouter;


