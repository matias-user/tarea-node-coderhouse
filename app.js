const Container = require('./classes/Container.js');
const express = require('express');

const app = express();
const port = 8080;

const container = new Container('productos.txt');

const prueba = {
    title: "prueación4",
    price:500,
    thumbnail: 'https://images.unsplash.com/photo-1657299171251-2a61ea716fbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
}

app.get( '/productos', async(req, res) => {
    res.send( await container.getAll() );
});
app.get('/productoRandom', async(req, res) => {
    let rndInt = Math.round(Math.random() * 3.5);
    if( rndInt < 1 ){
        rndInt + 1;
    }
    res.send( await container.getById(rndInt) );
} );

app.listen( port, console.log("Server started") )
// container.save(prueba);
// console.log( container.getAll().then( console.log ) );

// container.getById(2).then( console.log );

// container.deleteById(1);
// console.log( container.getAll().then( console.log ) );

// container.deleteAll();
// console.log( container.getAll().then( console.log ) );
