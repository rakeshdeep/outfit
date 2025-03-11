import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Analyze the image using Groq's Vision API
    const imageAnalysis = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this person's appearance and provide: 1. Body type 2. Skin tone 3. Notable features 4. Current clothing style. Be concise."
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.5,
      top_p: 1
    });

    // Get outfit suggestions based on the analysis
    const outfitSuggestion = await groq.chat.completions.create({
      model: "llama-3.2-90b", // Using base model for text completion
      messages: [
        {
          role: "system",
          content:
            "You are a professional fashion consultant. Provide specific outfit suggestions based on the person's characteristics."
        },
        {
          role: "user",
          content: `Based on these characteristics: ${imageAnalysis.choices[0].message.content}, suggest 3 appropriate outfits that would suit this person well. Include specific items, colors, and styling tips.`
        }
      ],
      max_tokens: 1000
    });

    return NextResponse.json({
      analysis: imageAnalysis.choices[0].message.content,
      suggestions: outfitSuggestion.choices[0].message.content
    });
  } catch (error: any) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image", details: error.message },
      { status: 500 }
    );
  }
}