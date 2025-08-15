export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("http://localhost:5000/verifyAadhaar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error calling Aadhaar verification" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}







