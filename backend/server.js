import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import verifyAadhaarRouter from "./routes/verifyAadhaar.js";
import verifyPANRouter from "./routes/verifyPAN.js";

// 1. Create app
const app = express();

// 2. Add middleware
app.use(cors());
app.use(bodyParser.json());

// 3. Add routes
app.use("/verifyAadhaar", verifyAadhaarRouter);
app.use("/verifyPAN", verifyPANRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});




