const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Director", directorSchema); //第一引数(名前)、第二引数(Schema)
