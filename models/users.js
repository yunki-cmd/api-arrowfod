const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  nombre: String,
  Email:String,
  password: String
});

const Users = model("Users", userSchema);

module.exports = Users; 
