import { Configuration, OpenAIApi } from "openai";



export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({ error: "Method not allowed" });

  }



  const configuration = new Configuration({

    apiKey: process.env.OPENAI_API_KEY,

  });



  const openai = new OpenAIApi(configuration);



  const { prompt } = req.body;



  if (!prompt) {

    return res.status(400).json({ reply: "No prompt provided" });

  }



  try {

    const completion = await openai.createChatCompletion({

      model: "gpt-3.5-turbo",

      messages: [{ role: "user", content: prompt }],

    });



    const reply = completion.data.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {

    console.error("OpenAI API error:", error);

    res.status(500).json({ reply: "AI Error occurred" });

  }

}
