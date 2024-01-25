const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    accountid: { type: String, required: true },
    description: { type: String, required: true },
    typeofwaste: { type: String, required: true },
    kgs: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Nft = mongoose.model("Nft", nftSchema);

module.exports = Nft;
