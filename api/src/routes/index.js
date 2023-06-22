const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogs");
const loginRouter = require("./login");
const temperamentsRouter = require("./temperaments");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = {
  dogsRouter,
  loginRouter,
  temperamentsRouter,
};
