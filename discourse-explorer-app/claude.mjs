export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY not configured in Netlify environment variables" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = {
  path: "/api/claude",
};
