const canvas = document.getElementById("signature-pad");

const ctx = canvas.getContext("2d");



let isDrawing = false;



canvas.addEventListener("mousedown", start);

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", stop);



canvas.addEventListener("touchstart", (e) => start(e.touches[0]));

canvas.addEventListener("touchmove", (e) => {

  draw(e.touches[0]);

  e.preventDefault();

});

canvas.addEventListener("touchend", stop);



function start(e) {

  isDrawing = true;

  ctx.beginPath();

  ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);

}



function draw(e) {

  if (!isDrawing) return;

  ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);

  ctx.stroke();

}



function stop() {

  isDrawing = false;

}



function clearPad() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

}
