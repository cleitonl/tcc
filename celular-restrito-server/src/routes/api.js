/*
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../../config/passport')(passport);
const { Usuario } = require('../models');


router.post('/signup', function(req, res) {
  console.log(req.body);
  if (!req.body.email || !req.body.senha) {
    res.status(400).send({msg: 'Please pass usuarioname and password.'})
  } else {
    Usuario
      .create({
        email: req.body.email,
        senha: req.body.senha
      })
      .then((usuario) => res.status(201).send(usuario))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
});

router.post('/signin', function(req, res) {
  Usuario
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((usuario) => {
        if (!usuario) {
          return res.status(401).send({
            message: 'Authentication failed. usuario not found.',
          });
        }
        usuario.comparePassword(req.body.senha, (err, isMatch) => {
          if(isMatch && !err) {
            var token = jwt.sign(JSON.parse(JSON.stringify(usuario)),
            'nodeauthsecret', {expiresIn: 86400 * 30});
            jwt.verify(token, 'nodeauthsecret', function(err, data){
              console.log(err, data);
            })
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        })
      })
      .catch((error) => res.status(400).send(error));
});

module.exports = router;
*/
