const ProductoModel = require('../models/productModel');
const CategoriaModel = require('../models/categoryModel');

const fs = require('fs');
const mime = require('mime-types');

class ProductoService {

    static async getAll() {
        return await ProductoModel.findAll(); //{
		// 	include: {
		// 		association: "categoria",
		// 		attributes: ["nombre"]
		// 	}
		// }
    }

    static async getById(id) {
        return await ProductoModel.findByPk(id);
    }

    static async create(obj, file) {
        try {
			if (file) {
				let extension = mime.extension(file.mimetype);
				let path = file.destination + obj.nombre + "." + extension;
				obj.imagen = path.split("uploads/")[1];
				fs.renameSync(file.path, path);
			}

			await ProductoModel.create(obj);
			return true;
		} catch (err) {
			console.error("Error al agregar producto:", err.message);
			return false;
		}
    }

    static async update(obj, file) {
        try {
			const producto = await ProductoModel.findByPk(obj.id);
			if (!producto) return false;

			if (file) {
				let extension = mime.extension(file.mimetype);
				let path = file.destination + obj.nombre + "." + extension;
				obj.imagen = path.split("uploads/")[1];
				fs.renameSync(file.path, path);
			}

			await producto.update(obj);
			return true;
		} catch (err) {
			console.error("Error al modificar producto:", err.message);
			return false;
		}
    }

    static async remove(obj) {
		try {
			const producto = await ProductoModel.findByPk(obj.id);
			if (!producto) return false;

			if (producto.imagen) {
				const path_foto = "uploads/" + producto.imagen;
				if (fs.existsSync(path_foto)) fs.unlinkSync(path_foto);
			}

			await producto.destroy();
			return true;
		} catch (err) {
			console.error("Error al eliminar producto:", err.message);
			return false;
		}
	}

    static async cambiarEstado(id, estado) {
        try {
			const producto = await ProductoModel.findByPk(id);
			if (!producto) return false;

			await producto.update({ is_in_inventory: estado });
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
    }
}

module.exports = ProductoService;   