import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { analyzeImage } from '@/lib/vision';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Analyze the image using OpenAI's Vision API
    const imageAnalysis = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
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
              image_url: imageUrl
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.5,
        top_p: 1,
    });

    // Get outfit suggestions based on the analysis
    const outfitSuggestion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional fashion consultant. Provide specific outfit suggestions based on the person's characteristics."
        },
        {
          role: "user",
          content: `Based on these characteristics: ${imageAnalysis.choices[0].message.content}, suggest 3 appropriate outfits that would suit this person well. Include specific items, colors, and styling tips.`
        }
      ],
    });

    return NextResponse.json({
      analysis: imageAnalysis.choices[0].message.content,
      suggestions: outfitSuggestion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}