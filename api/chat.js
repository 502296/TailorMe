import OpenAI from "openai";



const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});



export default async function handler(req, res) {

  // ✅ إعدادات CORS

  res.setHeader("Access-Control-Allow-Origin", "https://tailorme.me");

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");



  // ✅ للتعامل مع طلبات OPTIONS المسبقة (preflight)

  if (req.method === "OPTIONS") {

    return res.status(200).end();

  }



  // ✅ رفض أي ميثود غير POST

  if (req.method !== "POST") {

    return res.status(405).json({ error: "Method not allowed" });

  }



  const { prompt } = req.body;



  if (!prompt) {

    return res.status(400).json({ reply: "No prompt provided" });

  }



  try {

    const completion = await openai.chat.completions.create({

      model: "gpt-3.5-turbo",

      messages: [{ role: "user", content: prompt }]

    });



    const reply = completion.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {

    console.error("OpenAI API error:", error);

    res.status(500).json({ reply: "AI Error occurred" });

  }

}
