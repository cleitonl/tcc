const {
  getAparelhos,
  getAparelhoById,
  getAparelhoByImei,
  updateAparelho,
  createAparelho,
  deleteAparelho,
} = require('../controllers/aparelho.js');
const auth = require('../auth.js')();

module.exports = (app) => {
  app
    .route('/aparelho')
    .all(auth.authenticate())
    .get(getAparelhos)
    .post(createAparelho);

  app
    .route('/aparelho/:id')
    .all(auth.authenticate())
    .get(getAparelhoById)
    .put(updateAparelho)
    .delete(deleteAparelho);

  app.route('/aparelho/consulta/:imei').all().get(getAparelhoByImei);
};
