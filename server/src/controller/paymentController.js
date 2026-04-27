const razorpay = require("../config/razorpay");
const crypto = require("crypto");

async function verifyPayment(req, res){
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        message: "Success",
      });
    } else {
      return res.status(400).json({
        message: "Failed",
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Verification failed",
      error: err.message,
    });
  }
};

// CREATE ORDER
async function createOrder(req, res){
  try {
    const { amount } = req.body;
if (!amount) {
  return res.status(400).json({
    message: "Amount is required"
  });
}
    const options = {
      amount: Number(amount) * 100, // ₹ → paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (err) {
    res.status(500).json({
      message: "Error creating order",
      error: err.message,
    });
  }
};

module.exports = {createOrder, verifyPayment}