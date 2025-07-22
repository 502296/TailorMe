async function askTailorMe() {

  const text = document.getElementById("userInput").value;



  try {

    const response = await fetch("https://tailorme-backend.vercel.app/api/chat", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ prompt: text })

    });



    const data = await response.json();

    document.getElementById("aiReply").innerText = data.reply;

  } catch (error) {

    console.error("Error fetching AI reply:", error);

    document.getElementById("aiReply").innerText = "⚠️ AI is currently unavailable.";

  }

}
