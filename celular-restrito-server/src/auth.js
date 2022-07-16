// auth.js
const passport = require("passport");
const { Usuario } = require('./models');
const { Strategy, ExtractJwt } = require('passport-jwt');
const cfg = require('../libs/config');

const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
module.exports = () => {
  var strategy = new Strategy(params, async (payload, done) => {
    const usuario = await Usuario.findByPk(payload.id);
    if (usuario) {
      return done(null, { 
        id: usuario.id,
        nomeCompleto: usuario.nomeCompleto 
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
