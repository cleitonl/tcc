
const jwt = require('jwt-simple');
const cfg = require('../../libs/config.js');

const { Usuario } = require('../models');

module.exports = {
  // @desc    Retorna todos os Usuarios
  // @route   GET /usuario
  // @access  Public
  async getUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();

      return res.status(200).json({
        success: true,
        count: usuarios.lenght,
        data: usuarios,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error!',
      });
    }
  },

  // @desc    Retorna Usuario pelo Id
  // @route   GET /usuario:id
  // @access  Public
  async getUsuarioById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.user.id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: 'Usuario não encontrado!',
        });
      }

      return res.status(200).json({
        success: true,
        data: usuario,
      });
    } catch (err) {
      return res.json({
        success: false,
        error: 'Server Error!',
      });
    }
  },

  // @desc    Cria um Usuario
  // @route   POST /usuario
  // @access  Public
  async createUsuario(req, res) {
    try {
      if (
        !req.body.nomeCompleto
        || !req.body.nomeMae
        || !req.body.nomePai
        || !req.body.cpf
        || !req.body.dataNasc
        || !req.body.rg
        || !req.body.orgExped
        || !req.body.uf
        || !req.body.contato
        || !req.body.contatoAd
        || !req.body.nomeContatoAd
        || !req.body.email
        || !req.body.senha
      ) {
        return res.status(400).json({
          success: false,
          error: 'Por favor, Preencha todos os campos!',
        });
      }
      const userExist = await Usuario.findOne({
        where: { email: req.body.email },
      });
      if (userExist) {
        return res.status(404).json({
          success: false,
          error: 'O email utilizado ja existe!',
        });
      }

      const usuario = await Usuario.create(req.body);
      return res.status(200).json({
        success: true,
        data: usuario,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  // @desc    Edita um Usuario
  // @route   PUT /usuario:id
  // @access  Public
  async updateUsuario(req, res) {
    try {
      const usuario = await Usuario.findOne({ where: req.params });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: 'Usuario não encontrado',
        });
      }

      await Usuario.update(req.body, { where: req.params });
      return res.status(200).json({
        success: true,
        data: `Usuario ${usuario.id} Atualizado!`,
      });
    } catch (err) {
      return res.status(500).json({
        sucess: false,
        error: 'Server Error',
        err: err.message,
      });
    }
  },

  // @desc   Deleta um usuario
  // @route  Delete /usuario:id
  // @access Public
  async deleteUsuario(req, res) {
    try {
      const usuario = await Usuario.findOne({ where: req.user.id });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          error: 'Usuario não Encontrado!',
        });
      }

      await Usuario.destroy({ where: req.user.id });

      return res.status(200).json({
        success: true,
        data: `Usuario ${usuario.id} Deletado!`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
        err: err.message,
      });
    }
  },

  // @desc   Deleta um usuario
  // @route  Delete /usuario:id
  // @access Public
  // eslint-disable-next-line consistent-return
  async loginUsuario(req, res) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!usuario) {
        return res.status(401).json({
          success: false,
          error: 'Erro de autenticação, Usuario não Encontrado!.',
        });
      } else {
        console.log(req.body.senha)
        usuario.comparePassword(req.body.senha, (err, correto) => {
          console.log(err)
          if (correto && !err) {
            const payload = { id: usuario.id };
            const token = jwt.encode(payload, cfg.jwtSecret);
            console.log(token)
            return res.json({ token });
          }
          return res.status(401).json({
            success: false,
            msg: 'Erro de autenticação, Senha incorreta!.',
          });
        });
      }
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        error: err,
      });
    }
  },
};
