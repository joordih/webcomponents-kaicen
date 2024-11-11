module.exports = (app) => {
  const router = require('express').Router();
  const controller = require('../controllers/admin/order-controller');
  
  router.get('/', controller.findAll);
  router.post('/create', controller.create);
  router.delete('/delete', controller.delete)
  router.put('/update', controller.update);
  router.get('/find', controller.findOne);
  
  app.use('/admin/orders', router);
}