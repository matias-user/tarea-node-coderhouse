const { request } = require('express');

let products = [];
let id = 0;

const searchById = (id) => {
    return products.filter( product => product.id === Number(id)  );
};


exports.getProducts = ( req = request, res ) => {
    res.status(200).json({ products });
};
exports.getProductsById = ( req = request, res ) => {
    const { id } = req.params;

    const productById = searchById( id );
    if( !productById ) return res.status(200).json({error: 'Product not find'})

    res.status(200).json({ productById });
};

exports.postProduct = ( req = request, res ) => {
    const { title, price } = req.body;
    id = id + 1;
    const product = {
        id,
        title,
        price
    }
    products.push( product );

    res.status(201).json({ product });
};

exports.putProduct = (req = request, res) => {
    const { id } = req.params;

    const product = searchById( id );
    if( !productById ) return res.status(200).json({error: 'Product not find'})

    res.status(200).json( { product } );
};

exports.deleteProductById = (req, res) => {
    const { id } = req.params;

    if( !id ){
        return res.status(200).json( { error: 'Product not find'} );
    }
    const newArr = products.filter( prod => prod.id != id );
    products = newArr;

    res.status(200).json({msg:`Product with ID: ${id} deleted`})

};