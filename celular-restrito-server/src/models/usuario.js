
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nomeCompleto: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    nomeMae: {
      type: DataTypes.STRING(60),
    },
    nomePai: {
      type: DataTypes.STRING(60),
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    dataNasc: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rg: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    orgExped: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    contato: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    contatoAd: DataTypes.STRING(14),
    nomeContatoAd: DataTypes.STRING(60),
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {});

  Usuario.beforeCreate(async (usuario) => {
    if (usuario.changed('senha')) {
      this.usuario.senha = await bcrypt.hashSync(usuario.senha, bcrypt.genSaltSync(10), null);
    }
  });
  Usuario.beforeUpdate(async (usuario) => {
    if (usuario.changed('senha')) {
      this.usuario.senha = await bcrypt.hashSync(usuario.senha, bcrypt.genSaltSync(10), null);
    }
  });

  Usuario.prototype.comparePassword = function (passw) {
    bcrypt.compare(passw, this.passord, (err, isMatch) => {
      if (err) {
        return (err);
      }
      return (isMatch);
    });
  };
  Usuario.associate = function (models) {
    // associations can be defined here
    Usuario.hasMany(models.Aparelho, { as: 'aparelho' });
  };
  return Usuario;
};
