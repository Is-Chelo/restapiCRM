const req = require('express/lib/request');
const Pedidos = require('../models/Pedidos');


exports.createPedido = async (req, res, next)=>{
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje:"Se agrego un pedido"});
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.getPedidos = async (req, res, next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Producto'
        });
        res.json(pedidos)
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.getByIdPedido = async(req, res, next)=>{
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
        path:'pedido.producto',
        model:'Producto'
    });

    if(!pedido){
        res.json({mensaje:"El pedido no existe"})
        return next();
    }
    res.json(pedido);
}


exports.updatePedido = async(req, res, next)=>{
    try {
        const pedido = await Pedidos.findOneAndUpdate({_id:req.params.id}, req.body, {
            new:true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model:'Producto'
        });

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}


exports.deletePedido = async(req, res, next)=>{
    try {
        await Pedidos.findOneAndDelete({_id:req.params.id})
        res.json({mensaje:"El pedido se ha eliminado"})
    } catch (error) {
        console.log(error);
        next();
    }
}