/** @format */
const axios = require("axios");
const spa = require("../../config/spa");

const ping = (req, res) => {
    return res.send("pong");
}
const getConfig = (req, res) => {
    return res.send(spa);
}

module.exports = {
    ping,
    getConfig
}