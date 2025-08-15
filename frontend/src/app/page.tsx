"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [schema, setSchema] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [activeStep, setActiveStep] = useState(1);
  const [status, setStatus] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/schema.json")
      .then((res) => res.json())
      .then((data) => setSchema(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Aadhaar + Mobile validation (Step 1 initial)
  const handleAadhaarSubmit = async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/verifyAadhaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaar: formData.aadhaar,
          mobile: formData.mobile,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("User found. Please enter the OTP sent to your mobile.");
        setShowOtp(true);
      } else {
        setStatus(data.message || "User not found. Please check details.");
      }
    } catch {
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

  // Handle OTP verification (Step 1b)
  const handleOtpSubmit = async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/verifyAadhaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaar: formData.aadhaar,
          mobile: formData.mobile,
          otp: formData.otp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("OTP verified successfully.");
        setActiveStep(2);
        setShowOtp(false);
      } else {
        setStatus(data.message || "Invalid OTP. Please try again.");
      }
    } catch {
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

  // Handle PAN verification (Step 2)
  const handlePanSubmit = async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/verifyPAN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pan: formData.pan,
          businessName: formData.businessName,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("PAN verified successfully. Registration steps complete.");
        setActiveStep(3);
      } else {
        setStatus(data.message || "PAN verification failed.");
      }
    } catch {
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

  // Render form fields helper, with black text inputs for visibility
  const renderFields = (fields: any[]) =>
    fields.map((field, idx) => (
      <div key={idx} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
        </label>
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-black bg-white"
          autoComplete="off"
        />
      </div>
    ));

  if (!schema) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-[#f2f6ff] font-sans p-4 flex flex-col items-center">
      {/* Header */}
      <header className="bg-[#14387f] w-full max-w-lg rounded-t-lg px-0 py-4 mb-4 shadow flex flex-col items-center">
        <div className="text-white font-semibold text-lg">
          Government of India
        </div>
        <div className="text-white font-bold text-xl mt-1">
          Udyam Registration Portal
        </div>
      </header>

      {/* Form container */}
      <div className="bg-white rounded-b-lg shadow-md w-full max-w-lg p-6">
        {/* Progress tracker */}
        <div className="flex mb-6">
          <div
            className={`flex-1 text-center py-2 ${
              activeStep >= 1
                ? "bg-[#14387f] text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Step 1: Aadhaar
          </div>
          <div
            className={`flex-1 text-center py-2 ${
              activeStep === 2
                ? "bg-[#14387f] text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Step 2: PAN
          </div>
          <div
            className={`flex-1 text-center py-2 ${
              activeStep === 3
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Complete
          </div>
        </div>

        {/* Step 1 - Aadhaar + Mobile + conditional OTP */}
        {activeStep === 1 && (
          <>
            {!showOtp && (
              <>
                {renderFields(schema.step1.filter((f: any) => f.name !== "otp"))}
                <button
                  onClick={handleAadhaarSubmit}
                  disabled={loading}
                  className="w-full bg-[#14387f] text-white py-2 rounded-md hover:bg-blue-900 mt-4 disabled:opacity-50"
                >
                  {loading ? "Validating..." : "Validate Aadhaar"}
                </button>
              </>
            )}
            {showOtp && (
              <>
                {renderFields(schema.step1.filter((f: any) => f.name === "otp"))}
                <button
                  onClick={handleOtpSubmit}
                  disabled={loading}
                  className="w-full bg-[#14387f] text-white py-2 rounded-md hover:bg-blue-900 mt-4 disabled:opacity-50"
                >
                  {loading ? "Verifying OTP..." : "Submit OTP"}
                </button>
              </>
            )}
          </>
        )}

        {/* Step 2 - PAN */}
        {activeStep === 2 && (
          <>
            {renderFields(schema.step2)}
            <button
              onClick={handlePanSubmit}
              disabled={loading}
              className="w-full bg-[#14387f] text-white py-2 rounded-md hover:bg-blue-900 mt-4 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify PAN"}
            </button>
          </>
        )}

        {/* Step 3 - Completion Message */}
        {activeStep === 3 && (
          <div className="text-center text-green-700 font-semibold text-lg py-8">
            Registration completed successfully!
          </div>
        )}

        {status && (
          <p className="mt-4 text-center text-gray-700" role="alert" aria-live="assertive">
            {status}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-gray-500 max-w-lg">
        © {new Date().getFullYear()} Ministry of Micro, Small & Medium Enterprises,
        Govt. of India
      </footer>
    </main>
  );
}













