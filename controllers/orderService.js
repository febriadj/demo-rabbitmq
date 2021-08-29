module.exports = (amqpConn) => {
  async function orderService(req, res) {
    try {
      const channel = await (await amqpConn()).createChannel();

      channel.assertQueue('Order', { durable: true });
      // mengirimkan data ke rabbitmq queue
      channel.sendToQueue(
        'Order',
        Buffer.from(req.body.message), {
          persistant: true,
        },
      );

      res.status(200).json({
        status: 'success', data: req.body,
      });
      // menutup channel
      channel.close();
    }
    catch (error0) {
      const { message } = error0;

      res.status(400).json({
        status: 'failed', message,
      });
    }
  }

  return orderService;
}
