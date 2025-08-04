(function(){

  const form = document.getElementById("appointmentForm");

  if (!form) return;



  const btn = document.getElementById("submitBtn");

  const msg = document.getElementById("msg");



  form.addEventListener("submit", async (e)=>{

    e.preventDefault();



    // honeypot

    const hp = document.getElementById("company");

    if (hp && hp.value.trim() !== "") { form.reset(); return; }



    if (!form.name.value.trim() || !form.phone.value.trim()){

      show("Please enter your name and phone.", "err");

      return;

    }



    const fd = new FormData();

    fd.append("name",         form.name.value.trim());

    fd.append("phone",        form.phone.value.trim());

    fd.append("address",      form.address.value.trim());

    fd.append("serviceType",  form.service.value);

    fd.append("pieces",       form.pieces.value);

    fd.append("pickupDate",   form.pickup_date.value);

    fd.append("pickupTime",   form.pickup_time.value);

    fd.append("deliveryDate", form.delivery_date.value);

    fd.append("deliveryTime", form.delivery_time.value);

    fd.append("notes",        form.notes.value.trim());



    lock(true);

    try{

      await fetch(window.TAILORME.WEB_APP_URL, { method:"POST", body:fd, mode:"no-cors" });

      show("Appointment submitted successfully! A confirmation email was sent.", "ok");

      form.reset();

      window.scrollTo({ top:0, behavior:"smooth" });

    }catch(err){

      console.error(err);

      show("Network error. Please try again.", "err");

    }finally{

      lock(false);

    }

  });



  function lock(s){ if(btn){ btn.disabled=s; btn.textContent = s? "Submitting…" : "Submit"; } }

  function show(t,k){ if(msg){ msg.textContent=t; msg.className="msg"+(k?" "+k:""); } }

})();
