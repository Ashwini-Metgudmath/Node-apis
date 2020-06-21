const express = require("express");

const mysql = require('mysql');
const dotenv = require('dotenv');
const { query } = require("express");
dotenv.config();

const { MYSQL_URL } = process.env;
const connection = mysql.createConnection(MYSQL_URL);
//const connection = require('./../database');

const bookServiceRouter = express.Router();

bookServiceRouter.get('/', (req, res) =>{
  
    connection.query('SELECT * from book_service', (err, results, fields) =>{
        if(err)
        return res.send(err);
        else
        res.json(results);
    })
})

bookServiceRouter.post('/', (req, res) =>{
const bookingDetails = req.body;
console.log(`userid: ${bookingDetails.user_id}`);
console.log(`service_id ${bookingDetails.service_id}`);
    
    const getUserBooking = (queryType) => {
        connection.query(queryType, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
            else{
                if(results.length > 0){
                    res.send(`You have booking, can't book more`);
                }
                else{
                    console.log(`no active booking`);

                    checkServiceAvailable(`SELECT id FROM services where id = ${bookingDetails.service_id} AND IsAvailable = ${1}`);    
                    
                }
            }
        });
    }

    getUserBooking(`SELECT * FROM book_service where user_id = ${bookingDetails.user_id}`);

    const checkServiceAvailable = (queryType) => {
        connection.query(queryType, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
            if(results.length > 0){
                bookService(`INSERT INTO book_service SET ? `, bookingDetails);
                updateService(`UPDATE services set IsAvailable=${0} where id =${bookingDetails.service_id}`);
            }
            else
            res.send(`Sorry this service is not available, book another one`);
        });
    }   
    

    const bookService = (queryType, queryParameter) => {
        connection.query(queryType,queryParameter, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
             res.json(results);
        });
    }   

    const updateService = (queryType) => {
        connection.query(queryType, (err, results, fields) => {
            if (err) {
                return res.send(err);
            }
             //res.json(results);
        });
    } 

})

bookServiceRouter.delete('/:id', (req, res) =>{
    const id = req.params.id;
    connection.query(`DELETE FROM book_service where id = ${id}`, (err, results, fields) => {
        if (err) {
            return res.send(err);
        }
         res.json(results);
    });
})



module.exports = bookServiceRouter;


