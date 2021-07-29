
const { json } = require("express");
const User = require("../models/users")

exports.existemail = (req, resp, next) => {
  console.log(req.body)
  console.log(req.body.email);
  User.find({ Email: req.body.email })
    .then((result) => {
      console.log(result)
    if (result.length > 0) {
      next()
    } else {
      resp.status(401).send({
        msg:"el correo no existe"
      })
    }
  });
}
