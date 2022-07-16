'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeCompleto: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      nomeMae: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      nomePai: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      dataNasc: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      rg: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      orgExped: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      contato: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      contatoAd: {
        allowNull: false,
        type: Sequelize.STRING(14)
      },
      nomeContatoAd: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(40)
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING(100)
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
    return queryInterface.dropTable('Usuarios');
  }
};