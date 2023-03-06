module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, { tableName: 'users', timestamps: false })
  user.associate = (models) => {
    user.hasMany(models.Sale, { foreignKey: 'user_id', as: 'users', constraint: true });
    user.hasMany(models.Sale, { foreignKey: 'seller_id', as: 'sales', constraint: true });
  }
  return user;
};
