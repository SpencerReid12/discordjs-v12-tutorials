const CleverClient = require("./Structures/CleverClient");
const config = require('../config.json');

const client = new CleverClient(config);
client.login();
