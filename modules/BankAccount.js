const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema(
  {
    accountNum: String,
    amount: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

module.exports = BankAccount;
