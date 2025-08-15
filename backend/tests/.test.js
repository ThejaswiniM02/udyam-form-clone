import request from "supertest";
import express from "express";
import verifyAadhaarRouter from "../routes/verifyAadhaar.js";
import verifyPANRouter from "../routes/verifyPAN.js";

const app = express();
app.use(express.json());
app.use("/verifyAadhaar", verifyAadhaarRouter);
app.use("/verifyPAN", verifyPANRouter);

describe("API tests", () => {
  describe("POST /verifyAadhaar", () => {
    it("should return 400 for invalid Aadhaar", async () => {
      const res = await request(app)
        .post("/verifyAadhaar")
        .send({ aadhaar: "1234", mobile: "9999999999" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 404 for unknown Aadhaar/mobile", async () => {
      const res = await request(app)
        .post("/verifyAadhaar")
        .send({ aadhaar: "123456789012", mobile: "0000000000" });
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 for valid Aadhaar + mobile", async () => {
      const res = await request(app)
        .post("/verifyAadhaar")
        .send({ aadhaar: "123456789012", mobile: "9999999999" });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toHaveProperty("aadhaar", "123456789012");
    });
  });

  describe("POST /verifyPAN", () => {
    it("should return 400 for invalid PAN format", async () => {
      const res = await request(app)
        .post("/verifyPAN")
        .send({ pan: "BADPAN" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 404 for unknown PAN", async () => {
      const res = await request(app)
        .post("/verifyPAN")
        .send({ pan: "ABCDE9999Z" });
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should return 200 for valid PAN", async () => {
      const validPAN = "ABCDE1234F"; // Seed data PAN
      const res = await request(app)
        .post("/verifyPAN")
        .send({ pan: validPAN });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toHaveProperty("pan", validPAN);
    });
  });
});

