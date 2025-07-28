window.addEventListener("load", function () {

  const canvas = document.getElementById("signature-pad");

  const ctx = canvas.getContext("2d");



  let drawing = false;



  canvas.width = canvas.offsetWidth;

  canvas.height = canvas.offsetHeight;



  function startPosition(e) {

    drawing = true;

    draw(e);

  }



  function endPosition() {

    drawing = false;

    ctx.beginPath();

  }



  function draw(e) {

    if (!drawing) return;



    ctx.lineWidth = 2;

    ctx.lineCap = "round";

    ctx.strokeStyle = "#000";



    const rect = canvas.getBoundingClientRect();

    let x, y;



    if (e.touches) {

      x = e.touches[0].clientX - rect.left;

      y = e.touches[0].clientY - rect.top;

    } else {

      x = e.clientX - rect.left;

      y = e.clientY - rect.top;

    }



    ctx.lineTo(x, y);

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x, y);

  }



  // Mouse events

  canvas.addEventListener("mousedown", startPosition);

  canvas.addEventListener("mouseup", endPosition);

  canvas.addEventListener("mousemove", draw);



  // Touch events (for mobile)

  canvas.addEventListener("touchstart", startPosition);

  canvas.addEventListener("touchend", endPosition);

  canvas.addEventListener("touchmove", draw);

});
