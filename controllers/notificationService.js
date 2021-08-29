module.exports = (amqpConn) => {
  async function notificationService(req, res) {
    try {
      const channel = await (await amqpConn()).createChannel();

      channel.assertQueue('Order', {
        durable: true,
      });

      channel.consume('Order', (message) => {
        const {
          fields: { consumerTag, deliveryTag },
          content,
        } = message;

        res.status(200).json({
          status: 'success',
          data: {
            deliveryTag,
            consumerTag,
            message: content.toString(),
          },
        });
      }, {
        noAck: true,
      });
    }
    catch (error0) {
      const { message } = error0;

      res.status(400).json({
        status: 'failed',
        message,
      });
    }
  }

  return notificationService;
}
