// src/app/api/verifyPAN/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("http://localhost:5000/verifyPAN", {
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
    console.error("PAN verification error:", error);
    return new Response(
      JSON.stringify({ error: "Error calling PAN verification" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}





