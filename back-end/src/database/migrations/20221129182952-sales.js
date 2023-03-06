'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      total_price: Sequelize.DECIMAL(10, 2),
      delivery_address: Sequelize.STRING,
      delivery_number: Sequelize.STRING,
      sale_date: Sequelize.DATE,
      status: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
