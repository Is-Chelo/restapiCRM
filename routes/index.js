const express = require('express');
const router = express.Router()
const clientesController = require('../controllers/clientesController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
module.exports = function () {

    // crud clientes
    router.post('/clientes', clientesController.createCliente);
    router.get('/clientes', clientesController.getClientes);
    router.get('/clientes/:id', clientesController.getByIdCliente);
    router.put('/clientes/:id', clientesController.updateCliente);
    router.delete('/clientes/:id', clientesController.deleteCliente)


    // crud productos 
    router.post('/productos',
        productosController.subirArchivo,
        productosController.createProducto)
    router.get('/productos', productosController.getProductos)
    router.get('/productos/:id', productosController.getByIdProducto)
    router.put('/productos/:id',
        productosController.subirArchivo,
        productosController.updateProducto)
    router.delete('/productos/:id', productosController.deleteProducto)


    // crud pedidos
    router.post('/pedidos', pedidosController.createPedido)
    router.get('/pedidos', pedidosController.getPedidos)
    router.get('/pedidos/:id', pedidosController.getByIdPedido)
    router.put('/pedidos/:id', pedidosController.updatePedido)
    router.delete('/pedidos/:id', pedidosController.deletePedido)

    return router
}


