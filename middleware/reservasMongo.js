const Reserva = require("../models/reserva")


exports.reserva=function(req, resp, next){
  const reservacliente = req.body
  console.log(reservacliente)
  Reserva.find({
    tipoReserva: reservacliente.tipoReserva,
    tipo: reservacliente.tipo,
    fecha: reservacliente.fecha,
    turno: reservacliente.turno,
  })
    .then((result) => {
      if (result.length > 0) {
        resp.status(400).send({ msg: "La fecha ya esta reservado" });
      } else {
        const newReserva = new Reserva({
          nombre: reservacliente.nombre,
          email: reservacliente.email,
          telefono: reservacliente.telefono,
          personas: reservacliente.personas,
          tipoReserva: reservacliente.tipoReserva,
          tipo: reservacliente.tipo,
          fecha: reservacliente.fecha,
          turno: reservacliente.turno,
          menu:reservacliente.menu
        });
        newReserva.save().then(() => {
          next()
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    });
}

