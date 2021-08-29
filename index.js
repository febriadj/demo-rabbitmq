const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = process.env.PORT || 3000;

const amqpConn = async () => {
  try {
    const conn = await amqp.connect('amqp://localhost');
    return conn;
  }
  catch (err) {
    console.log(JSON.stringify(err, null, 2));
    return process.exit(1);
  }
}

app.listen(port);
console.log(`Server running on Port ${port}`);
