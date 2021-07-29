const nodemailer = require("nodemailer");

exports.sendEmailContacto = function (req, resp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "arrowfoodfater@gmail.com",
      pass: process.env.passgmail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "arrowfoodfater@gmail.com",
    to: req.body.email,
    subject: "contacto",
    html: "<h1>vuestra sugerencia ha sido recibido<h1>",
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("ocurrio un error en subscripciones");
      resp.sendStatus(500, err.message);
    } else {
      console.log("ha sido enviado");
      resp.sendStatus(200);
    }
  });
  transporter.close();
};

exports.sendEmailReserva = function (req, resp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "arrowfoodfater@gmail.com",
      pass: process.env.passgmail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "Reserva arrowfoodfater@gmail.com",
    to: req.body.email,
    subject: "Reserva",
    html: `<body><style>body {display:flex;
justify-content:center}
* {
  box-sizing: border-box;
}

.receipt {
  background-color: #fff;
  width: 22rem;
  position: relative;
  padding: 1rem;
  box-shadow: 0 -0.4rem 1rem -0.4rem rgba(0,0,0,0.2);
  margin:2rem;
}

.receipt:after {
  background-image: linear-gradient(135deg, #fff 0.5rem, transparent 0), linear-gradient(-135deg, #fff 0.5rem, transparent 0);
    background-position: left-bottom;
    background-repeat: repeat-x;
    background-size: 1rem;
    content: '';
    display: block;
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 1rem;
}

.receipt__header {
  text-align: center;
}

.receipt__title {
  color: #FF619B;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
}

.receipt__date {
  font-size: 0.8rem;
  color: #666;
  margin: 0.5rem 0 1rem;
}

.receipt__list {
  margin: 2rem 0 1rem;
  padding: 0 1rem;
}

.receipt__list-row {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  position: relative;
}

.receipt__list-row:after {
  content: '';
  display: block;
  border-bottom: 1px dotted rgba(0,0,0,0.15);
  width: 100%;
  height: 100%;
  position: absolute;
  top: -0.25rem;
  z-index: 1
}

.receipt__item {
  background-color: #fff;
  z-index: 2;
  padding: 0 0.15rem 0 0;
  color: #1f1f1f;
}

.receipt__cost {
  margin: 0;
  padding: 0 0 0 0.15rem;
  background-color: #fff;
  z-index: 2;
  color: #1f1f1f;
}

.receipt__list-row--total {
  border-top: 1px solid #FF619B;
  padding: 1.5rem 0 0;
  margin: 1.5rem 0 0;
  font-weight: 700;
}
</style>
<table style="font-family:'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; border-collapse: collapse;color:#535353;">
  <!--Logo-->
  <tr>
    <td colspan="2" style="height:90px;">
      <img src="https://i.imgur.com/sfMxOt3.png" alt="" />
    </td>
  </tr>
  <tr>
    <td colspan="2" >Su reservación ha sido confirmada para</td>
  </tr>
  <!--Nombre restaurant-->
  <tr>
    <td colspan="2"><h1>ArrowFood</h1></td>
  </tr>
   <tr>
    <td colspan="2"><h3>Reserva confirmada para ${
      req.body.nombre
    } con telefono de contacto ${req.body.telefono} para  ${
      req.body.personas
    } personas con reserva para ${req.body.tipoReserva} en el ${
      req.body.tipoReserva
      } :  ${req.body.tipo} para la fecha ${req.body.fecha}
    </h3></td>
  </tr>        
  <tr>
    <td>
      <div class="receipt">
  <div class="receipt__header">
    <p class="receipt__title">
      <h2>Ticket resumen<h2>
    </p>
  </div>
  <dl class="receipt__list">
    ${renderMenu(req.body.menu)}
  </dl>
</div>
    </td>
    </tr>
  <tr>
    <td width="280" style="padding:20px;border-top:solid 1px #E1E1E1;border-right:solid 1px #E1E1E1;"><a style="color:#e53a35;text-decoration:none;" href="#"><img style="vertical-align:middle;margin-right:10px;" src="https://i.imgur.com/svl34jq.png"/>Compartir con amigos</a></td>
    <td width="280" style="padding:20px;;border-bottom:solid 1px #E1E1E1;"><a style="color:#e53a35;text-decoration:none;" href="#"><img style="vertical-align:middle;margin-right:10px;" src="https://i.imgur.com/xFuq1MH.png"/>Agregar al calendario</a></td>
  </tr>
  <tr>
    <td style="padding:20px;border-bottom:solid 1px #E1E1E1;padding:20px;border-top:solid 1px #E1E1E1;border-right:solid 1px #E1E1E1;"><a style="color:#e53a35;text-decoration:none;" href="#"><img style="vertical-align:middle;margin-right:10px;" src="https://i.imgur.com/Ce4ecL5.png"/>Ver o modificar reservación</a></td>
    <td style="padding:20px;border-bottom:solid 1px #E1E1E1;"><a style="color:#e53a35;text-decoration:none;" href="#"><img style="vertical-align:middle;margin-right:10px;" src="https://i.imgur.com/ywfhCjf.png"/>Cancelar reservación</a></td>
  </tr>
  <tr>
    <td style="padding:20px;border-bottom:solid 1px #E1E1E1;">
      <h2>Dirección</h2>
      <p>Calle Tolosa, 2, 4, 28041 Madrid</p>
    </td>
    <td style="text-align:center;padding:20px;border-bottom:solid 1px #E1E1E1;"><img src="https://i.imgur.com/NNRY45P.png" /></td>
  </tr>
  <tr style="background:#F1EEEC;border-bottom:solid 1px #E1E1E1;">
    <td colspan="2" style="padding:20px;">
      <h2>Mas opcioones</h2>
      <p>Mas opcioones</p>
    </td>
  </tr>
  <tr style="text-align:center;font-size:14px;background:#e53a35;color:white;">
    <td colspan="2" style="padding:40px;">
      <p>Footer</p>
    </td>
  </tr>
</table></body>
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("ocurrio un error");
      resp.sendStatus(500, err.message);
    } else {
      console.log("ha sido enviado el email de reserva");
      resp
        .status(200)
        .send({ msg: "el email de reserva ha sido enviado al email" });
    }
  });
  transporter.close();
};

exports.sendEmailSubcriptor = function (req, resp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "arrowfoodfater@gmail.com",
      pass: process.env.passgmail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "subscripcion arrowfoodfater@gmail.com",
    to: req.body.email,
    subject: "Subscription",
    html: `<h1>la subscripcion ha sido completado<h1>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("ocurrio un error");
      resp.sendStatus(500, err.message);
    } else {
      console.log("ha sido enviado el email de subscription");
      resp.status(200).send({ msg: "la subscripcion ha sido exito" });
    }
  });
  transporter.close();
};

function renderMenu(object) {
  let renderReturn = "";
  if (object !== undefined) {
    if (Object.keys(object).length > 0) {
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          let div = `
         <div class="receipt__list-row">
          <dt class="receipt__item">${key}</dt>
          <dd class="receipt__cost">${object[key]}</dd>
         </div>
         `;
          renderReturn = renderReturn.concat(div);
        }
      }
    }
  }
  if (renderReturn.length === 0)
    return `<div class="receipt__list-row">
      <dt class="receipt__item"><h3>No hay menu reservado<h3></dt>
    </div>`;
  return renderReturn;
}
