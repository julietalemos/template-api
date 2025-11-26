const ProductoModel = require("./productModel");
const CategoriaModel = require("./categoryModel");

ProductoModel.belongsTo(CategoriaModel, {
  foreignKey: "categoria_id",
  as: "categoria"
});

CategoriaModel.hasMany(ProductoModel, {
  foreignKey: "categoria_id",
  as: "productos"
});