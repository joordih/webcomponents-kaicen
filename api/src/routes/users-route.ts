module.exports = (app)  => {
  const router = require('express').Router();
  const controller = require('../controllers/users/users-controller');

  router.get('/', controller.findAll);
  router.post('/', controller.create);
  router.delete('/', controller.delete)
  router.put('/', controller.update);
  router.get('/:{id}', controller.findOne);

  app.use('/api/admin/users', router);
}