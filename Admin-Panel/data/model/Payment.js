const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  requestId: { type: Number },
  senderName: { type: String },
  recieverName: { type: String },
  paymentType: { type: String },
  status: { type: String },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
