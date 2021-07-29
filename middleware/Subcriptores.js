const Subcriptor = require("../models/subscribirseOferta");

exports.suscriptores = function (req, resp, next) {
  console.log(req.body.email)
  Subcriptor.find({ email: req.body.email })
    .then((result) => {
      if (result.length > 0) {
        console.log(result)
        resp.status(400).send({ msg: "Ya estas subcritos" });
      } else {
        const newSubcriptor = new Subcriptor({
          email: req.body.email,
        });
        newSubcriptor.save().then(() => {
          next();
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    });
};
