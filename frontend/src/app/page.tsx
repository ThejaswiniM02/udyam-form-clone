"use client";
import { useEffect, useState } from "react";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface Schema {
  step1: Field[];
  step2: Field[];
}

export default function Home() {
  const [schema, setSchema] = useState<Schema | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activeStep, setActiveStep] = useState(1);
  const [status, setStatus] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/schema.json")
      .then((res) => res.json())
      .then((data: Schema) => setSchema(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
    } catch (error) {
      console.error(error);  // Use the error to avoid lint warning
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

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
    } catch (error) {
      console.error(error);
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

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
    } catch (error) {
      console.error(error);
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

  const renderFields = (fields: Field[]) =>
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
      <header className="bg-[#14387f] w-full max-w-lg rounded-t-lg px-0 py-4 mb-4 shadow flex flex-col items-center">
        <div className="text-white font-semibold text-lg">
          Government of India
        </div>
        <div className="text-white font-bold text-xl mt-1">
          Udyam Registration Portal
        </div>
      </header>

      <div className="bg-white rounded-b-lg shadow-md w-full max-w-lg p-6">
        <div className="flex mb-6">
          <div
            className={`flex-1 text-center py-2 ${
              activeStep >= 1 ? "bg-[#14387f] text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Step 1: Aadhaar
          </div>
          <div
            className={`flex-1 text-center py-2 ${
              activeStep === 2 ? "bg-[#14387f] text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Step 2: PAN
          </div>
          <div
            className={`flex-1 text-center py-2 ${
              activeStep === 3 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Complete
          </div>
        </div>

        {activeStep === 1 && (
          <>
            {!showOtp && (
              <>
                {renderFields(schema.step1.filter((f) => f.name !== "otp"))}
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
                {renderFields(schema.step1.filter((f) => f.name === "otp"))}
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

      <footer className="mt-8 text-center text-xs text-gray-500 max-w-lg">
        © {new Date().getFullYear()} Ministry of Micro, Small & Medium Enterprises,
        Govt. of India
      </footer>
    </main>
  );
}














