const { model, Schema } = require("mongoose");

const subscribirseOferta = new Schema({
  email: String,
});

const Subscribirse = model("Subscribirse", subscribirseOferta);

module.exports = Subscribirse;
