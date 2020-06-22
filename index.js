const express = require('express');
const app = express();

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const { PORT, MYSQL_URL } = process.env;

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');;

const cityRouter = require('./routes/cities');
const userRouter = require('./routes/users');
const serviceRouter = require('./routes/services');
const bookServiceRouter = require('./routes/bookService');


//const connection = mysql.createConnection(MYSQL_URL);
const connection = require('./database');

app.get((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
  
app.use(bodyParser.json());
//app.use('/services', serviceRouter);

app.get('/', (req, res) =>{
  res.send("Welcome to Node APIs");
  })

app.use('/cities', cityRouter);

app.use('/users', userRouter);

app.use('/services', serviceRouter);

app.use('/book_service', bookServiceRouter);



function handleDisconnect() {
connection.connect(err =>{
  if(err){
    console.log(`Error when connecting DB: ${err}`);
    //setTimeout(handleDisconnect, 2000);
  }
  else
  console.log(`DB connection successful..!`);
})

connection.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                         // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});
}

app.listen(PORT, (err) => {
  if(err){
    console.log(`Error in connection ${err}`)
  }
  else{
    console.log(`Server listening on port: ${PORT}!`);
    handleDisconnect(); 
  }
    });