const router = require('express').Router();
const amqpConn = require('../amqp');

const {
  notificationService,
  orderService,
} = require('../controllers/index');

async function routes() {
  router.get('/notif', notificationService(await amqpConn));
  router.post('/order', orderService(await amqpConn));
}

routes();
module.exports = router;
