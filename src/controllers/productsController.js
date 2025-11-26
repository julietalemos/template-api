const ProductoService = require('../services/productService');

// Obtener todos
const getAll = async (req, res) => {
    const productos = await ProductoService.getAll();
    res.json(productos);
};

// Obtener uno
const getById = async (req, res) => {
    const id = req.params.id;
    const producto = await ProductoService.getById(id);

    if (producto) return res.json(producto);
    res.status(404).json({ mensaje: "Producto no encontrado" });
};

// Agregar
const create = async (req, res) => {
    try {
        const file = req.file;
        const obj = JSON.parse(req.body.obj_producto);

        const ok = await ProductoService.create(obj, file);
        res.status(ok ? 201 : 400).json({ exito: ok });
    } catch (err) {
        res.status(500).json({ exito: false, mensaje: err.message });
    }
};

// Modificar
const update = async (req, res) => {
    try {
        const file = req.file;
        const obj = JSON.parse(req.body.obj_producto);

        const ok = await ProductoService.update(obj, file);
        res.status(ok ? 200 : 404).json({ exito: ok });
    } catch (err) {
        res.status(500).json({ exito: false, mensaje: err.message });
    }
};

// Eliminar físico (no lo usa el admin)
const remove = async (req, res) => {
    try {
        const obj = req.body;
        const ok = await ProductoService.remove(obj);
        res.status(ok ? 200 : 404).json({ exito: ok });
    } catch (err) {
        res.status(500).json({ exito: false });
    }
};

// BAJA LÓGICA
const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const ok = await ProductoService.cambiarEstado(id, estado);
        res.json({ exito: ok });

    } catch (err) {
        res.status(500).json({ exito: false });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    cambiarEstado
};