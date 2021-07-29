const { model, Schema } = require("mongoose");

const reservaSchema = new Schema({
  nombre: String,
  email:String,
  telefono:String,
  personas:Number,
  tipoReserva:String,
  tipo:String,
  fecha:String,
  turno: String,
  menu:Object
});

const Reserva = model("Reserva", reservaSchema);

module.exports = Reserva;
