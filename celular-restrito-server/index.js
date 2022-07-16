const express = require('express');
const consign = require('consign')
const auth = require("./src/auth.js")();
var cors = require('cors')

const app = express();

app.use(cors())
auth.initialize()

consign({ verbose: true })
.include('src/auth.js')
.then('libs/middlewares.js')
.then('src/routes')
.into(app)

//Run da aplicação
app.listen(app.get('PORT'), () => console.log ('api rodando! Porta:'+ app.get('PORT')))