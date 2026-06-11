import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userPrompt } = body;


    if (!userPrompt) {
      return NextResponse.json({ error: "Missing userPrompt" }, { status: 400 });
    }

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "", 
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json({ error: "Gemini API Error", details: errorData }, { status: res.status });
    }

    const data = await res.json();

    console.log("data : " , data)

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
    console.log("aiText : " , aiText)
    return NextResponse.json({ answer: aiText });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
