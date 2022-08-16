const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
});



module.exports =
  mongoose.model.Articles || mongoose.model("Articles", articlesSchema);
