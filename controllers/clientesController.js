const Clientes = require('../models/Clientes');

exports.createCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // almacenamos el cliente
        cliente.save();
        res.json({ mensaje: "Se registro el cliente" });
    } catch (error) {
        console.log(error)
        next();
    }
}


exports.getClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({});
        res.json(clientes)
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.getByIdCliente = async (req, res, next) => {

    const cliente = await Clientes.findById(req.params.id)
    if (!cliente) {
        res.json({ mensaje: "Ese cliente no existe" });
        return next();
    }
    res.json(cliente);

}


exports.updateCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate( { _id:req.params.id } , req.body, {
            new: true  // le obligamos a traer el nuevo cliente actualizado
        })
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
    
}



exports.deleteCliente = async(req, res,next)=>{

    try {
        const cliente = await Clientes.findOneAndDelete({_id:req.params.id});
        res.json({mensaje:"El cliente se elimino"});
    } catch (error) {
        console.log(error);
        next();
    }
}