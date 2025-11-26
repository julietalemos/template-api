const express = require('express');
const router = express.Router();
const multer = require("multer");
const productsController = require('../controllers/productsController');

const upload = multer({
    storage: multer.diskStorage({
        destination: "uploads/images/",
    }),
});

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', upload.single("imagen"), productsController.create);

router.put('/:id', upload.single("imagen"), productsController.update);

router.delete('/:id', productsController.remove);

router.patch('/:id/estado', productsController.cambiarEstado);

module.exports = router;