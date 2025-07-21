async function askTailorMe() {

  const text = document.getElementById("prompt").value;

  const replyBox = document.getElementById("response");



  if (!text.trim()) {
    replyBox.innerHTML = "Please type a question first!";

    return;

  }



  replyBox.innerHTML = "Thinking...";



  try {

    const res = await fetch("https://tailorme-backend.vercel.app/api/chat", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ prompt: text })

    });



    const data = await res.json();



    if (data && data.reply) {

      replyBox.innerHTML = data.reply;

    } else {

      replyBox.innerHTML = "Sorry, no reply received.";

    }

  } catch (error) {

    replyBox.innerHTML = "Error connecting to AI.";

    console.error("AI error:", error);

  }

}
