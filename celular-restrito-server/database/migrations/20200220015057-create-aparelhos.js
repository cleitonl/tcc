'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aparelhos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marca: {
        type: Sequelize.STRING(20)
      },
      modelo: {
        type: Sequelize.STRING(20)
      },
      serial: {
        type: Sequelize.STRING(20)
      },
      operadora: {
        type: Sequelize.STRING(10)
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      imei: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(15)
      },
      situacao: {
        type: Sequelize.BOOLEAN
      },
      dataFato: {
        type: Sequelize.DATEONLY
      },
      bo: {
        type: Sequelize.STRING(20)
      },
      UsuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Aparelhos');
  }
};