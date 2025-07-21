import { OpenAI } from "openai";



const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});



export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({ message: "Only POST requests allowed" });

  }



  const { prompt } = req.body;



  try {

    const chatCompletion = await openai.chat.completions.create({

      model: "gpt-3.5-turbo",

      messages: [{ role: "user", content: prompt }]

    });



    const reply = chatCompletion.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {

    console.error("OpenAI error:", error);

    res.status(500).json({ message: "Failed to get response from OpenAI" });

  }

}
