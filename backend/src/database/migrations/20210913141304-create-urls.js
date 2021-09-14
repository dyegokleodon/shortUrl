'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('urls', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('urls');
  }
};
