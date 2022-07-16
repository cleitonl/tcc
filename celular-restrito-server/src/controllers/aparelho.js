const { Aparelho } = require('../models');

module.exports = {
  // @desc    Retorna todos os aparelhos
  // @route   GET /aparelho
  // @access  Public
  async getAparelhos(req, res) {
    try {
      const aparelhos = await Aparelho.findAll({
        where: { UsuarioId: req.user.id },
      });

      return res.status(200).json({
        success: true,
        count: aparelhos.length,
        data: aparelhos,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
  // @desc    Retorna  os aparelhos com restrição
  // @route   GET /aparelho
  // @access  Public
  async getAparelhoByImei(req, res) {
    try {
      const aparelho = await Aparelho.findOne({
        where: {
          imei: req.params.imei,
        },
      });
      if (!aparelho) {
        return res.status(404).json({
          success: false,
          error: 'Aparelho não encontrado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: aparelho,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
        err: err.message,
      });
    }
  },

  // @desc    Retorna o aparelho pelo Id
  // @route   GET /aparelho:id
  // @access  Public
  async getAparelhoById(req, res) {
    try {
      const aparelho = await Aparelho.findOne({
        where: {
          id: req.params.id,
          UsuarioId: req.user.id,
        },
      });

      if (!aparelho) {
        return res.status(404).json({
          success: false,
          error: 'Aparelho não encontrado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: aparelho,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
        err: err.message,
      });
    }
  },

  // @desc   Cria um aparelho
  // @route  POST /aparelho
  // @access Public
  async createAparelho(req, res) {
    req.body.UsuarioId = req.user.id;

    try {
      if (
        !req.body.marca
        || !req.body.modelo
        || !req.body.serial
        || !req.body.operadora
        || !req.body.numero
        || !req.body.imei
      ) {
        return res.status(400).json({
          success: false,
          error: 'Por favor, Preencha todos os campos!',
        });
      }
      await Aparelho.create(req.body);
      return res.status(201).json({
        success: true,
      });
    } catch (err) {
      if (err.message === 'Validation error') {
        return res.status(500).json({
          success: false,
          error: 'Este IMEI ja está cadastrado!',
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },

  // @desc   Edita um aparelho
  // @route  UPDATE /aparelho:id
  // @access Public
  async updateAparelho(req, res) {
    req.body.UsuarioId = req.user.id;

    try {
      const aparelho = await Aparelho.findOne({
        where: {
          id: req.params.id,
          UsuarioId: req.user.id,
        },
      });

      if (!aparelho) {
        return res.status(404).json({
          success: false,
          error: 'Aparelho não encontrado!',
        });
      }
      await Aparelho.update(req.body, {
        where: { id: req.params.id, UsuarioId: req.user.id },
      });

      return res.status(200).json({
        success: true,
        data: `Aparelho ${aparelho.id} Atualizado!`,
      });
    } catch (err) {
      return res.status(500).json({
        sucess: false,
        error: 'Server Error',
      });
    }
  },

  // @desc   Deleta um aparelho
  // @route  Delete /aparelho:id
  // @access Public
  async deleteAparelho(req, res) {
    req.body.UsuarioId = req.user.id;
    try {
      const aparelho = await Aparelho.findOne({
        where: {
          id: req.params.id,
          UsuarioId: req.user.id,
        },
      });

      if (!aparelho) {
        return res.status(404).json({
          success: false,
          error: 'Aparelho não Encontrado!',
        });
      }

      await Aparelho.destroy({
        where: {
          id: req.params.id,
          UsuarioId: req.user.id,
        },
      });

      return res.status(200).json({
        success: true,
        data: `aparelho ${aparelho.id} Deletado!`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  },
};
