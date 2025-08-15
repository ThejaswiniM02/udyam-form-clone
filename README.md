# Udyam Registration Form Clone

##  Getting Started

**First up, clone/pull this repo:**

```
git clone https://github.com/your-username/udyam-form-clone.git
cd udyam-form-clone
```

---

### Backend Setup

```
cd backend
npm install
npm run dev
# Or: node server.js
```
This runs your API server locally on `http://localhost:5000`.

**Database is SQLite, Prisma manages schema/migrations. Seed data added.**

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```
That starts Next.js on `http://localhost:3000`.  
Open the site in your browser – you’ll see the familiar government-styled form!

---

##  How It Works

- **Step 1:** Enter Aadhaar and mobile, click Validate.
  - If valid, you’ll be asked for OTP (you can enter anything for demo).
- **Step 2:** Enter PAN and business name, click Verify.
  - If PAN matches seed data and is in correct format, you get completion.

**All form fields use strong contrast for accessibility. Progress bars show steps. Errors and completion are clear and friendly.**

---

##  Quick Testing

- Valid details (from seed):  
  Aadhaar: `123456789012`  
  Mobile: `9999999999`  
  PAN: `ABCDE1234F`
- Try invalid/empty fields and see how the app responds.
- Errors and successes show up right away so you know where you stand.

---

## Developer Notes

- You don’t need real OTP or PAN for demo – validation is format-based, step-by-step as per spec.
- Backend and frontend talk via REST – make sure both are running!
- Code is structured for clarity – easy to extend or Dockerize later.


---

##  Tech Stack

- React + Next.js (frontend)
- Node.js, Express, Prisma (backend)
- SQLite (local dev database)
- Tailwind CSS for styling

---


Made by Thejaswini M.  
Based on Openbiz assignment specification, August 2025.  
Images/branding – public domain or government assets.
