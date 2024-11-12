module.exports = (app) => {
  const router = require('express').Router();
  const controller = require('../controllers/admin/order-controller');
  
  router.get('/:limit/:offset', controller.findAll);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete)
  router.put('/', controller.update);
  router.get('/:id', controller.findOne);
  router.get('/', controller.size);
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      error: true,
      message: err.message || 'Error interno del servidor',
      stack: err.stack
    });
  });

  app.use('/api/admin/orders', router);
}