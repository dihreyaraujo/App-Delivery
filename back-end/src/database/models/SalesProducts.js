module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "sales",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "products",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    quantity: DataTypes.INTEGER
  }, { tableName: "sales_products", timestamps: false, underscored: true });

  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: 'SaleProduct',
      foreignKey: 'productId',
      otherKey: 'saleId'
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: 'SaleProduct',
      foreignKey: 'saleId',
      otherKey: 'productId'
    })
  }
  return saleProduct;
}
