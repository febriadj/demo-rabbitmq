const amqp = require('amqplib');

module.exports = async () => {
  try {
    const conn = await amqp.connect('amqp://localhost');
    return conn;
  }
  catch (err) {
    console.log(JSON.stringify(err, null, 2));
    return process.exit(1);
  }
}
