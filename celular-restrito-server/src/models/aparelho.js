
module.exports = (sequelize, DataTypes) => {
  const Aparelho = sequelize.define('Aparelho', {
    marca: DataTypes.STRING(20),
    modelo: DataTypes.STRING(20),
    serial: DataTypes.STRING(20),
    operadora: DataTypes.STRING(10),
    numero: DataTypes.STRING(14),
    imei: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    situacao: DataTypes.BOOLEAN,
    dataFato: DataTypes.DATEONLY,
    bo: DataTypes.STRING(20),
    UsuarioId: DataTypes.INTEGER,
  }, {});
  Aparelho.associate = (models) => {
    // associations can be defined here
    Aparelho.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId',
      as: 'usuario',
    });
  };
  return Aparelho;
};
