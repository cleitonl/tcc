const {
  loginUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuario');
const auth = require('../auth.js')();

module.exports = (app) => {
  app
    .route('/usuario')
    .all()
    .post(createUsuario)
    .get(auth.authenticate(), getUsuarioById);

  app
    .route('/usuario/:id')
    .all((req, res, next) => {
      delete req.body.id;
      next();
    })

    .put(updateUsuario)
    .delete(deleteUsuario);

  app.route('/token').post(loginUsuario);
};
