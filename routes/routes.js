const { Router } = require('express');
const { getProducts, postProduct, putProduct, getProductsById, deleteProductById } = require('../controllers/productos');

const router = Router();

router.get('/products', getProducts);

router.get('/products/:id', getProductsById);

router.post('/products', postProduct);

router.put('/products/:id', putProduct );

router.delete('/products/:id', deleteProductById);

module.exports = router;