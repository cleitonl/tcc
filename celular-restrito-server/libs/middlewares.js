const express  = require('express')
const morgan = require('morgan');

module.exports = app =>{

    app.set("json spaces", 4); // identado o json para visualização
    app.set('PORT', process.env.PORT || 8080); //setando a porta
    app.use(express.json()); // parsing application/json
    app.use(express.urlencoded({ extended: true })); // parsing application/x-www-form-urlencoded
    app.use((req, res, next) => {
      if (req.body && req.body.id) delete req.body.id
      next()
    })
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    
  }
