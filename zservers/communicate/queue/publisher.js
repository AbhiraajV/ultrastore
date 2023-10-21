const amqp = require("amqplib");

const rbq_connection_uri = process.env.CLOUD_RABBITMQ_URI;
const exchange_name = "ultrastore";
class Publisher {
  channel;

  async createChannel() {
    try {
      const connection = await amqp.connect(rbq_connection_uri);
      this.channel = await connection.createChannel();
    } catch (error) {
      console.log("Error while connecting to RBMQ ");
      console.log(error);
    }
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) await this.createChannel();
    await this.channel.assertExchange(exchange_name, "direct");
    try {
      const out = await this.channel.publish(
        exchange_name,
        routingKey,
        Buffer.from(
          JSON.stringify({
            action: routingKey,
            message,
          })
        )
      );
      return { success: true, out };
    } catch (error) {
      return { success: false, out: error };
    }
  }
}

module.exports = Publisher;
