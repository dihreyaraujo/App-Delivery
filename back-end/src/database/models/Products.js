module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: {
      type: DataTypes.STRING,
    }
  }, { tableName: "products", timestamps: false, underscored: true });

  product.associate = (models) => {
    product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'products', constraint: true });
  }

  return product
}
