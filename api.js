//imports

require("dotenv").config();
require("./mongo.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
// const fetch = require("node-fetch");
const Users = require("./models/users")
const nodemailer = require("./middleware/sendemail");
const existeEmail = require("./middleware/validarEmail")
const reservas = require("./middleware/reservasMongo")
const suscriptor = require("./middleware/Subcriptores")
const  RecuperarPassword  = require("./middleware/RecuperacionContraseña");
const { urlencoded } = require("express");
// iniciadores
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("template"))

// Routas
app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname,"./template/index.html"));
});
app.get("/enlacerecuperacion/:email",  (req, resp) => {
   const email = req.params.email;
  /* const password = req.params.password
  console.log(req.params)
  console.log(req.body) */
  /* Users.findOneAndUpdate({ Email: email }, { password: password }, { new: true }, (err, info) => {
    if (err) {
      console.log(err)
      resp.send(err)
    } else {
      console.log(info)
      resp.send(info)
    }
  }) */
  resp.redirect(`/cambiarPassword.html?${email}`);
});
app.put("/updatePassword",RecuperarPassword.updatePasswordMongo,RecuperarPassword.sendEmailnombre)

app.post("/login/Users", (req, resp, next) => {
  const nombre = req.body.nombre;
  const pass = req.body.password;
  Users.find({ nombre: nombre, password: pass })
    .then((result) => {
      if (result.length === 0) {
        resp.sendStatus(406);
      } else {
        console.log(result[0].Email);
        resp.status(200).send({ email: result[0].Email,user:true });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    });
  
})

app.post("/Registration/User", (req, resp, next) => {
  const body = req.body;
  Users.find({ Email: req.body.Email })
    .then((result) => {
      if (result.length > 0) resp.sendStatus(401);
      else if (result.length === 0) {
        const newUser = new Users({
          nombre: body.nombre,
          Email: body.Email,
          password: body.password,
        });
        newUser.save()
          .then(() => {
            resp.sendStatus(200);
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      next(error);
    });
});

app.post("/reserva/sinmenu",reservas.reserva,nodemailer.sendEmailReserva);
app.post("/resetPassword", existeEmail.existemail, RecuperarPassword.RecuperarPassword);
app.post("/contacto",nodemailer.sendEmailContacto)
app.post("/suscripcion", suscriptor.suscriptores,nodemailer.sendEmailSubcriptor);


// puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("servidor online en el puerto ", port);
});



/* app.put("/Users/FavoritesRecipes", (req, resp, next) => {
  const favorites =req.body
  Users.updateOne({ nombre: "nombre" }, { $push: { favorite: favorites } })
    .then(data => {
      console.log(data)
      if (data.ok === 1) {
        resp.sendStatus(200)
      } else {
        resp.sendStatus(401)
      }
    })
    .catch(err => {
      next(err);
  })
}) */





/* app.get("/recipes/:q&:from&:to", async (req, resp) => {
  const api_id = process.env.api_id;
  const app_key = process.env.app_key;
  const from = req.params.from
  const to = req.params.to
  const q = req.params.q
  const api = `https://api.edamam.com/search?q=${q}&app_id=${api_id}&app_key=${app_key}&from=${from}&to=${to}`;
  const datos = await fetch(api)
    .then((response) => response.json())
    .then((dato) => dato)
  if (datos.hits.length === 0) {
    resp.send("error no hay resultado");
  } else {
    resp.json(datos);
  }
}); */