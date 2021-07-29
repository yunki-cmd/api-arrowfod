const mongoose = require("mongoose");

const pass = process.env.pass;
const base = process.env.base;

const connectString = `mongodb+srv://ArrowFood:${pass}@cluster0.pb4mz.mongodb.net/${base}?retryWrites=true&w=majority`;

// conexion a mongodb
 mongoose
  .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("data base conected",mongoose.connection.name);
  })
  .catch((err) => {
    console.log(err);
  });
