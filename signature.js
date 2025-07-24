const canvas = document.getElementById("signature-pad");

const ctx = canvas.getContext("2d");

let drawing = false;



if (canvas) {

  canvas.addEventListener("mousedown", () => drawing = true);

  canvas.addEventListener("mouseup", () => {

    drawing = false;

    ctx.beginPath();

  });

  canvas.addEventListener("mouseout", () => drawing = false);

  canvas.addEventListener("mousemove", draw);

}



function draw(e) {

  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();

  ctx.lineWidth = 2;

  ctx.lineCap = "round";

  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

}



function clearSignature() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

}



function goBack() {

  window.history.back();

}



const form = document.getElementById("pickupForm") || document.getElementById("deliveryForm");



if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();



    const data = {

      name: document.getElementById("customer_name").value,

      phone: document.getElementById("phone").value,

      number_of_items: document.getElementById("number_of_items").value,

      service_type: document.getElementById("service_type").value,

      datetime: document.getElementById("pickup_datetime")?.value || document.getElementById("delivery_datetime")?.value,

      signature: canvas.toDataURL()

    };



    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(data)

    })

      .then(response => {

        if (response.ok) {

          window.location.href = "confirmation.html";

        } else {

          alert("❌ Failed to save data");

        }

      })

      .catch(error => {

        alert("❌ Error: " + error.message);

      });

  });

}
