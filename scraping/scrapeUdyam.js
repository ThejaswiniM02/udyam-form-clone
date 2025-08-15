import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "networkidle2",
  });

  // Step 1 Fields
  const step1Fields = await page.$$eval(
    "#ContentPlaceHolder1_txtAadhaarNumber, #ContentPlaceHolder1_txtMobileNumber, #ContentPlaceHolder1_txtotp",
    (inputs) =>
      inputs.map((input) => ({
        label: input.previousElementSibling?.innerText.trim() || "",
        name: input.name || "",
        id: input.id || "",
        type: input.type || "text",
        placeholder: input.placeholder || "",
      }))
  );

  // Step 2 Fields (click the continue button or navigate directly if possible)
  // For now, we simulate static extraction (manual page inspection)
  const step2Fields = [
    {
      label: "PAN Number",
      name: "pan",
      id: "txtPanNumber",
      type: "text",
      placeholder: "ABCDE1234F",
    },
    {
      label: "Business Name",
      name: "businessName",
      id: "txtBusinessName",
      type: "text",
      placeholder: "Enter Business Name",
    },
  ];

  const schema = {
    step1: step1Fields,
    step2: step2Fields,
  };

  fs.writeFileSync("schema.json", JSON.stringify(schema, null, 2));
  console.log("✅ Scraping complete. schema.json saved.");

  await browser.close();
})();
