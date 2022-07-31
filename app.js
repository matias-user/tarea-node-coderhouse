const express = require('express');
const router = require('./routes/routes');

const app = express();
const PORT = 8080;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( '/api', router );
app.use( express.static( __dirname + '/public') );

const server = app.listen( PORT, console.log("Server started") );

server.on( 'error', (err) => console.log(err));
