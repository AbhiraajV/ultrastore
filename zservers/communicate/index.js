const consume_message = require("./queue/subscriber");
const handler = require("./functions/index");

consume_message("communicate", handler);
