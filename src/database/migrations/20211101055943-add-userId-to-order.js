'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'userId');
  }
};
