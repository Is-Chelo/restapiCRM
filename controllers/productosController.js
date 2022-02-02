const Producto = require('../models/Productos')
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato invalido'))
        }
    }
}

// pasar la configuracion y el campo de DB
const upload = multer(configuracionMulter).single('imagen')

// sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        } else return next();
    })
}


exports.createProducto = async (req, res, next) => {
    const producto = new Producto(req.body)
    try {
        // comprobamos que llegue una imagen 
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        // guardamos
        await producto.save();
        res.json({ mensaje: "El producto se registro correctamente" });
    } catch (error) {
        console.log(error);
        next();
    }
}




exports.getProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.getByIdProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.json({ mensaje: "El producto no existe" });
            return next();
        }
        res.json(producto)
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.updateProducto = async (req, res, next) => {
    try {

        const nuevoProducto = req.body

        if (req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let producto = await Producto.findById(req.params.id);
            nuevoProducto.imagen = producto.imagen
        }

        const productoActualizado = await Producto.findByIdAndUpdate({ _id: req.params.id }, nuevoProducto, {
            new: true
        })

        res.json(productoActualizado);

    } catch (error) {
        console.log(error);
        next();
    }
}


exports.deleteProducto = async (req,res,next)=>{
    try {
       const producto = Producto.findByIdAndDelete({_id:req.params.id})
       res.json({mensaje:"El producto Se elimino"}) 
    } catch (error) {
        console.log(error);
        next();
    }
}