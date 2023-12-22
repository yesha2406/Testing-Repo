module.exports = function (app) {
  const api = '/api';

  const authApi = `/api${process.env.BASE_URL_V1}`;

  /**Non Authenticated Routes */
  app.use(`${api}/`, require('./auth'));

  /**Authenticated Routes */
  app.use(`${authApi}/projects`, require('./project'));
  app.use(`${authApi}/tasks`, require('./task'));
  app.use(`${authApi}/users`, require('./user'));
};
