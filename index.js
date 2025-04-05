const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());


const mongoURI = "mongodb://localhost:27017/food_delivery_app"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const paymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String },
  additionalInfo: { type: String },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);


app.get("/api/payment-methods", async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.json(paymentMethods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payment methods" });
  }
});

app.post("/api/payment-methods", async (req, res) => {
  try {
    const { name, logo, description, additionalInfo } = req.body;
    const newPaymentMethod = new PaymentMethod({
      name,
      logo,
      description,
      additionalInfo,
    });
    await newPaymentMethod.save();
    res.status(201).json(newPaymentMethod);
  } catch (err) {
    res.status(500).json({ message: "Error adding payment method" });
  }
});


app.delete("/api/payment-methods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PaymentMethod.findByIdAndDelete(id);
    res.json({ message: "Payment method deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting payment method" });
  }
});

// Server Port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
