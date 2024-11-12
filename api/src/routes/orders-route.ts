module.exports = (app) => {
  const router = require('express').Router();
  const controller = require('../controllers/admin/order-controller');
  
  router.get('/', controller.findAll);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete)
  router.put('/', controller.update);
  router.get('/:id', controller.findOne);
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
  })

  app.use('/api/admin/orders', router);
}