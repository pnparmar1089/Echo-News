const mongoose = require("mongoose");

const SaveSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    source_id: String,
    source_name: String,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    content: String,
  },
  {
    timestamps: true,
  }
);

const SaveModel = mongoose.model("save", SaveSchema);

module.exports = SaveModel;
