module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, { tableName: "sales", timestamps: false, underscored: true });

  sale.associate = (models) => {
    sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'sales' });
  }

  return sale;
}
