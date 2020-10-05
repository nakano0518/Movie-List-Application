const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
});

module.exports = mongoose.model("Movie", movieSchema); //第一引数(名前)、第二引数(Schema)
