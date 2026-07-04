import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || code.trim().length === 0) {
      return Response.json(
        { error: "Please paste some code first." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a senior code reviewer. Analyze the following code and respond with ONLY valid JSON (no markdown, no backticks) in this exact shape:
{
  "timeComplexity": string (e.g. "O(n log n)"),
  "spaceComplexity": string (e.g. "O(n)"),
  "errors": [{"line": number, "severity": "high"|"medium"|"low", "message": string}],
  "betterApproach": string (a suggested improved approach, or "Current approach is optimal" if no better one exists),
  "summary": string (one or two sentence overall verdict)
}

Code to review:
${code}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ result: text });
  } catch (error: any) {
    console.log("RAW GEMINI ERROR:", error.message);
    const message = error.message || "";

    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return Response.json(
        {
          error:
            "We've hit today's free usage limit. Please try again in a few hours!",
        },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}