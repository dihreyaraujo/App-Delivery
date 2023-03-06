'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "sales",
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "products",
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      quantity: Sequelize.INTEGER,
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
