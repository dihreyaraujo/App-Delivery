'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      price: Sequelize.DECIMAL(10,2),
      url_image: {
        type: Sequelize.STRING,
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
