require("dotenv").config();

const amqp = require("amqplib");

const rbq_connection_uri = process.env.CLOUD_RABBITMQ_URI;
const exchange_name = "ultrastore";
const queue_name = "base-queue:zip-video";

async function consume_message(routingKey, handler) {
  try {
    console.log({ rbq_connection_uri });
    const connection = await amqp.connect(rbq_connection_uri);

    const channel = await connection.createChannel();

    channel.assertExchange(exchange_name, "direct");

    const q = await channel.assertQueue(queue_name);

    await channel.bindQueue(q.queue, exchange_name, routingKey);
    console.log("listening ", { channel: q.queue, exchange_name, routingKey });

    // Set prefetch to 1 to process one message at a time
    channel.prefetch(1);

    channel.consume(q.queue, (message) => handler(message, channel));
  } catch (error) {
    console.log({ error });
  }
}

module.exports = consume_message;
