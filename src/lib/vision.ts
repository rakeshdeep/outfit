import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeImage(imageUrl: string) {
  try {
    // Analyze body features
    const analysis = await openai.chat.completions.create({
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
    });

    // Get fashion recommendations
    const recommendations = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional fashion consultant. Provide specific outfit suggestions based on the person's characteristics."
        },
        {
          role: "user",
          content: `Based on these characteristics: ${analysis.choices[0].message.content}, suggest 3 appropriate outfits that would suit this person well. Include specific items, colors, and styling tips.`
        }
      ],
    });

    return {
      analysis: analysis.choices[0].message.content,
      recommendations: recommendations.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}