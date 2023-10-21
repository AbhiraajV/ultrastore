const Publisher = require("../queue/publisher");
const axios = require("axios");

const handler = async (message, channel) => {
  try {
    const publisher = new Publisher();
    if (!message) {
      console.log("Received an undefined message. Dequeued!");
      channel.ack(message);
      return;
    }

    const data = JSON.parse(message.content);

    const { file, profile, uploaded_id } = data.message;
    console.log("Received workload ", { file, profile, uploaded_id });
    if (!file || !profile || !uploaded_id) {
      console.log("file, profile or upload_id cannot be null removing");
      channel.ack(message);

      console.log("Dequeued!");
      return;
    }

    const success = await axios
      .post("http://localhost:3000/api/communicate/flow-up", {
        file,
        profile,
        uploaded_id,
      })
      .then(async (res) => {
        console.log({ res });
        if (res.status === 200) {
          console.log("Informed DB!");
          channel.ack(message);
          console.log("Dequeued!");
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log({ err });
        return false;
      });
  } catch (err) {
    console.log({ unknown_error: err });
  }
};

module.exports = handler;
