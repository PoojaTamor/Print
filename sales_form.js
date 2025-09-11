//   this is the function of all form next , validation submit and conform

$(document).ready(function () {
  let current = 1;
  const selectedServices = [];
  let refNo;

  // 👉 Next button
  $(".btn-next").click(function () {
    const current_fs = $(this).closest(".form-step");
    const next_fs = current_fs.next(".form-step");
    let isValid = true;

    // Validate required fields
    current_fs.find("input[required], select[required]").each(function () {
      if (!$(this).val()) {
        $(this).addClass("is-invalid");
        isValid = false;
      } else {
        $(this).removeClass("is-invalid");
      }
    });

    // 👉 Car Number validation
    const carNoInput = current_fs.find("input[name='Car_Number']").val();
    const carRegex = /^[A-Za-z0-9]+$/;
    if (carNoInput) {
      if (carNoInput.length < 6 || !carRegex.test(carNoInput)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Vehicle Number",
          text: "Please enter the full vehicle number"
        });
        return false;
      }
    }

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields before continuing."
      });
      return false;
    }

    // ✅ Valid hone par next step
    current_fs.hide();
    next_fs.show();
    current++;
  });

  // 👉 Previous button
  $(".btn-prev").click(function () {
    const current_fs = $(this).closest(".form-step");
    const prev_fs = current_fs.prev(".form-step");
    current_fs.hide();
    prev_fs.show();
    current--;
  });

  // 👉 Dropdown service selection
  const tagsContainer = document.getElementById("selectedTags");
  const serviceList = document.getElementById("serviceList");

  serviceList.addEventListener("click", function (e) {
    const item = e.target.closest(".dropdown-item");
    if (!item) return;
    e.preventDefault();

    if (item.classList.contains("other-option")) {
      if (!document.querySelector(".other-input")) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter custom service";
        input.classList.add("other-input", "form-control", "mt-2");
        item.parentElement.insertAdjacentElement("afterend", input);
        input.focus();

        input.addEventListener("blur", function () {
          const val = input.value.trim();
          if (val) {
            const newItem = document.createElement("li");
            const newLink = document.createElement("a");
            newLink.classList.add("dropdown-item");
            newLink.href = "#";
            newLink.setAttribute("data-value", val);
            newLink.textContent = val;
            newItem.appendChild(newLink);
            serviceList.insertBefore(newItem, serviceList.lastElementChild);
            toggleSelection(newLink, val);
          }
          input.remove();
        });
      }
    } else {
      const value = item.getAttribute("data-value");
      toggleSelection(item, value);
    }
  });

  function toggleSelection(element, value) {
    const index = selectedServices.indexOf(value);
    if (index === -1) {
      selectedServices.push(value);
      element.innerHTML = value + ' <span class="checkmark">&#10003;</span>';
    } else {
      selectedServices.splice(index, 1);
      element.innerHTML = value;
    }
    renderTags();
  }

  function renderTags() {
    tagsContainer.innerHTML = "";
    selectedServices.forEach(value => {
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = value;
      tagsContainer.appendChild(tag);
    });
  }



  const now = new Date();

// Date format: DD/MM/YY
const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}`;



function getDateSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const day = now.getDate();
const month = now.toLocaleString('en-US', { month: 'short' }); // Aug
const year = now.getFullYear();

const formattedDateformate = `${day}${getDateSuffix(day)} ${month}, ${year}`;

console.log(formattedDate);


// Time format: HH:MM:SS (24-hour)
const formattedTime = now.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});


  // 👉 Final Submit (show confirmation modal)
  $("#msform").on("submit", function (e) {
    e.preventDefault();

    const phoneInput = $("#phoneNumber").val().trim();
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phoneInput)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number."
      });
      return false;
    }

    refNo = Math.floor(1000 + Math.random() * 9000);
    const form = document.getElementById("msform");

  const confirmationTable = `
       <div class="modal-header">
      <div class="col-lg-5 col-6 d-flex ">
<div>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 2V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 4H19C19 4 21 4 21 6V20C21 20 21 22 19 22H5C5 22 3 22 3 20V6C3 6 3 4 5 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 10H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>

        <div class="ms-2">
          <h3 class="curantdate">Date</h3>
          <p class="">${formattedDateformate}</p>
        </div>
      </div>
      <div class="col-lg-3 col-6   d-flex ">
<div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_95)">
<path d="M12 0C5.36327 0 0 5.36327 0 12C0 18.6367 5.36327 24 12 24C18.6367 24 24 18.6367 24 12C24 5.36327 18.6367 0 12 0ZM12 22.0065C6.4849 22.0065 1.99347 17.5151 1.99347 12C1.99347 6.4849 6.4849 1.99347 12 1.99347C17.5151 1.99347 22.0065 6.4849 22.0065 12C22.0065 17.5151 17.5151 22.0065 12 22.0065Z" fill="black"/>
<path d="M14.2482 10.9767H13.0237V6.27953C13.0237 5.71627 12.5633 5.25586 12 5.25586C11.4367 5.25586 10.9763 5.71627 10.9763 6.27953V12.0003C10.9763 12.5636 11.4367 13.024 12 13.024H14.2482C14.8114 13.024 15.2718 12.5636 15.2718 12.0003C15.2718 11.4371 14.8065 10.9767 14.2482 10.9767Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_3_95">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
</div>

        <div class="ms-2">
          <h3 class="curantaime">Time</h3>
          <p class="">${formattedTime}</p>
        </div>
      </div>

      </div>
    <div class="modal-body">
      <div class="row g-2">
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Customer Name</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_name" value="${(form.fname?.value || "") + ' ' + (form.lname?.value || "")}" disabled>
              </div>
        </div>
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Phone Number</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_phone" value="${form.phoneNumber?.value || ""}" disabled>
              </div>
        </div>
       
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Vehicle Number</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_number" value="${form.Car_Number?.value || ""}" disabled>
              </div>
        </div>
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Vehicle Brand</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_brand" value="${form.Brand?.value || ""}" disabled>
              </div>
        </div>
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Vehicle Model</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_model" value="${form.Model?.value === 'Other' ? form.OtherModel?.value || '' : form.Model?.value || ''}" disabled>
              </div>
        </div>
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Vehicle Color</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_color" value="${form.CarColor?.value === 'Other' ? form.OtherColor?.value || '' : form.CarColor?.value || ''}" disabled>
              </div>
        </div>
        <div class="col-md-4 col-6  mb-3">
          <div class="label">Drop Location</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_store" value="${form.Store?.value === 'Other' ? form.OtherStore?.value || '' : form.Store?.value || ''}" disabled>
              </div>
        </div>
        <div class="col-lg-4 col-6  mb-3">
          <div class="label"> Delivery Date & Time</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_time" value="${(form.dateInput?.value || "") + ' ' + (form.timeInput?.value || "")}" disabled>
              </div>
        </div>
         <div class="col-md-12  mb-3">
          <div class="label">Service Type</div>
            <div class="value">
              <input type="text" class="form-control" id="cf_services" value="${selectedServices}" disabled>
              </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="editbtn btn-secondary">Edit</button>
      <button type="button" class="conformbtn" id="confirmSubmit">Confirm & Print</button>
    </div>`;

    $("#confirmationContent").html(confirmationTable);
    const modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    modal.show();
  });

  // 👉 Edit button
$(document).on("click", ".editbtn", function () {
  $("#confirmationContent input")
    .prop("disabled", false)
    .css({
      "border": "1px solid #797979",
      "outline": "none",
         "border-radius": "3px"
    });
});

  // 👉 Confirm & Print
  $(document).on("click", "#confirmSubmit", function () {

  const data = {
  fullName: $("#cf_name").val(),
  phoneNumber: $("#cf_phone").val(),
  Brand: $("#cf_brand").val(),
  Model: $("#cf_model").val(),
  car_color: $("#cf_color").val(),
  Car_Number: $("#cf_number").val(),
  service: $("#cf_services").val(),
Store: $("#cf_store").val(), 
State: $("#cf_state").val(),
  dateInput: $("#cf_date").val(),
  timeInput: $("#cf_time").val(),
   Reg_No: refNo,
};

    // ✅ Save to Google Sheet
    fetch("https://script.google.com/macros/s/AKfycbxpcmzZfcOSIYgejmaNolDBSMHSjhRTH_c5ZPRFMnZqe_9xgJBYK2J1qdtWF3UAHTWu4g/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Document Ready!",
          text: "Click OK to Print the customer copy",
          confirmButtonText: "OK"
        }).then(() => {
          // 👉 Print slip window
          let formattedDate = new Date().toLocaleDateString();
           let printHTML = `
   
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Acknowledgment Slip</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');
    body {
      background-color: #f8f9fa;
       font-family: "Onest", sans-serif;
    }

    .slip {
      background-color: #e3e3e3;
      /* background-color: #fff; */
      max-width: 260px;
      margin: 20px auto;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.08);
          /* color: #3d3d3d; */
      /* color: #231f20; */
    }

    .reg-number {
      text-align: end;
    }
 .reg-number p {
font-size: 8px;
      color: #231f20;
      font-weight: 600;
      margin-bottom: 0;
      letter-spacing: 1px;
      line-height: 1;
 }
    .reg-number span {
      font-size: 18px;
      font-weight: 600;
      display: block;
  
    }

    .title {
      text-align: center;
      margin-bottom: 30px;
    }
.title h6 {
    font-weight: 600;
    letter-spacing: 0px;
    font-size: 8px;
    margin: 0;
    margin-top: 20px;

}

.title h4 {
    font-weight: 800;
    font-size: 18px;
     color: #231f20;
}

    .info-label {
   letter-spacing: 1px;
    font-size: 8px;
  color: #3d3d3d;
    font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 2px;

    }

    .info-value {
      font-weight: 800;
      margin-bottom: 20px;
      text-transform: uppercase;
      font-size: 9px;
        color: #231f20;
        letter-spacing: 1px;
    }
.date{
  font-size: 8px;
      color: #231f20;
      font-weight: 600;
}
    .pickup {
        font-weight: 800;
      margin-bottom: 20px;
      text-transform: uppercase;
      font-size: 9px;
        color: #231f20;
        letter-spacing: 1px;
    }

    .signature {
      font-size: 8px;
    text-transform: uppercase;
    margin-top: 1px;
    }

    .signature img {
      width: 50px;
      margin-top: 5px;
      margin-left: 20px;
    }
    .thankyoutext{
      font-size: 8px;
      margin-right: 20px;
      line-height: 1;
    }
    .botomtext p{
      font-size: 9px;
        line-height: 1;
        margin-bottom: 0;
        letter-spacing: 1px;
        color: #231f20;
        font-weight: 600;

    }
      .botomtext h3{
        font-size: 14px;
        line-height: 1;
        margin-bottom: 0;
        font-weight: 900;
        margin-block: 5px;
             color: #231f20;
      }
         .botomtext span{
          font-size: 8px;
        line-height: 1;
        display: block;
        text-align: center;
             color: #231f20;
        font-weight: 600;
         }
         .spacialoffer{
           font-size: 30px;
        line-height: 1;
             /* color: #d8d8d8; */
             color: #231f20;
        font-weight: 900;
        margin-top: 30px;
        margin-left: -30px;
        margin-bottom: 0px;
         }
         .offertext{
             font-size: 18px;
        line-height: 1;
             color: #3d3d3d;
             /* color: #d8d8d8; */
             letter-spacing: 1px;
        font-weight: 500;
        margin-left: 33px;
        display: block;
        margin-bottom: 20px;
         }
  </style>
</head>
<body>
  <div class="slip">
    <div class="mb-2">
      <div class="d-flex justify-content-between">
        <div>
          <p class="date">${formattedDate}</p>
        </div>
        <div class="reg-number">
          <p>UIN:</p><span>${data.Reg_No}</span>
        </div>
      </div>

      <div class="title">
        <h6>ACKNOWLEDGMENT SLIP</h6>
        <h4>ORIGINAL COPY</h4>
      </div>

      <div>
        <div class="info-label">Customer Name</div>
        <div class="info-value">${data.fullName}</div>

        <div class="info-label">Make & Model</div>
        <div class="info-value">${data.Brand} ${data.Model}</div>

        <div class="info-label">Vehicle Number</div>
        <div class="info-value">${data.Car_Number}</div>

        <div class="info-label">Service Type</div>
        <div class="info-value">${data.service}</div>

        <div class="info-label">Pickup Date & Time</div>
        <div class="pickup">${data.timeInput}</div>

        <div class="info-label">Drop Location</div>
        <div class="info-value">${data.Store}</div>

        <div class="d-flex justify-content-between mt-4">
          <div>
            <p class="thankyoutext">
              Thank you for choosing us! We appreciate your trust in us. Sit back and relax while we take care of everything your car needs.
            </p>
          </div>
          <div>
                     <img src="./qr-code.png" alt="QR Code" width="50px" height="50px">
          </div>
        </div>
      </div>

      <div class="signature">
        Signature & Acknowledgement<br>
        <img src="./Asset 1.svg" alt="">
      </div>
    </div>

    <div>
      <div>
        <div class="mt-4">
          <h6 class="spacialoffer">SPECIAL</h6>
          <span class="offertext">OFFER</span>
        </div>
      </div>

      <div class="d-flex justify-content-center botomtext mt-4">
        <div>
          <p>GET A CAR WASH</p>
          <h3>ABSOLUTELY FREE</h3>
          <span>Valid for one month only</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

              $("#msform")[0].reset();
   
        selectedServices.length = 0;
        renderTags();

        // ✅ Dropdown items se checkmark remove
$("#serviceList .dropdown-item").each(function () {
  const value = $(this).attr("data-value");
  $(this).html(value); 
});
        $(".form-step").hide().first().show();
        current = 1;

const newWin = window.open("", "_blank");
newWin.document.write(printHTML);
newWin.document.close();
newWin.focus();
newWin.print();


          // ✅ Close modal
          const modal = bootstrap.Modal.getInstance(document.getElementById("confirmationModal"));
          modal.hide();

          setTimeout(() => document.activeElement?.blur(), 10);
        });
      })
      .catch(err => {
        console.error("Error:", err);
        Swal.fire("Error", "Something went wrong, please try again!", "error");
      });
  });
});

// =================================================date=time-function===============================================

// Date Picker
flatpickr("#serviceDate", {
  dateFormat: "d-m-Y", 
  allowInput: true,
  disableMobile: true
});
// Time Picker
flatpickr("#serviceTime", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",   // 24-hour format (e.g. 17:30)
  allowInput: true,
  disableMobile: true,
  time_24hr: true      // Enable 24-hour mode
});

// ==================================================brand-and model==================================
      const modelData = {
        Audi: [
          "A3",
          "A3 Cabriolet",
          "A4",
          "A6",
          "A6 Matrix",
          "Q2",
          "Q3",
          "Q5",
          "Q7",
          "R8",
          "RS5",
          "RS6",
          "RS7 Sportback",
          "S5 Sportback",
          "TT",
        ],
        BMW: [
          "2 Series Gran Coupe",
          "3 Series",
          "3 Series GT",
          "4 Series",
          "5 Series",
          "5 Series GT",
          "6 Series",
          "7 Series",
          "8 Series",
          "i8",
          "M3",
          "M5",
          "X1",
          "X3",
          "X4",
          "X5",
          "X6",
          "Z4",
        ],
        Chevrolet: [
          "Aveo",
          "Aveo Old",
          "Aveo U-VA",
          "Beat",
          "Captiva",
          "Cruze",
          "Enjoy",
          "Forester",
          "Optra",
          "Optra Magnum",
          "Optra SRV",
          "Sail",
          "Sail Hatchback",
          "Sail U-VA",
          "Spark",
          "Tavera",
          "Trailblazer",
        ],
        Citroen: ["Basalt", "C3", "C3 AIRCROSS", "C5 Aircross"],
        Datsun: ["GO", "Go Puls"],
        Ford: [
          "Classic",
          "Escort",
          "Fiesta",
          "Fiesta Classic",
          "Freestyle",
          "Fusion",
          "Ikon",
          "Mondeo",
          "Mustang",
        ],
        Honda: [
          "Accord",
          "Amaze",
          "BR-V",
          "Brio",
          "City",
          "Civic",
          "Civic Hybrid",
          "CR-V",
          "Elevate",
          "Jazz",
          "Mobilio",
          "WR-V",
        ],
        Hyundai: [
          "Accent",
          "Accent Viva",
          "Alcazar",
          "Aura",
          "Creta",
          "Creta N-Line",
          "Elantra",
          "Eon",
          "Exter",
          "Getz",
          "Getz Prime",
          "Grand i10",
          "Grand i10 Nios",
          "i10",
          "i20",
          "Neo Fluidic Elantra",
          "New Santro 1.1",
          "Santa Fe",
          "Santro",
          "Santro Xing",
          "Sonata",
          "Sonata Embera",
          "Terracan",
          "Tucson",
          "Venue",
          "Venue N-Line",
          "Xcent",
        ],
        Jeep: ["Compass", "Meridian", "Wrangler"],
        Kia: ["Carens", "Carnival", "Seltos", "Sonet"],
        "Land Rover": [
          "Discovery",
          "Discovery 3",
          "Discovery 4",
          "Discovery Sport",
          "Range Rover Evoque",
        ],
        Mahindra: [
          "Alturas G4",
          "Armada",
          "Bolero",
          "Bolero Neo",
          "e20",
          "KUV100",
          "KUV100 NXT",
          "Marazzo",
          "Marshal",
          "NuvoSport",
          "Quanto",
          "REVAI",
          "Scorpio",
          "Scorpio Classic",
          "Scorpio Getaway",
          "Scorpio N",
          "Thar",
          "Thar Roxx",
          "TUV 300 PLUS",
          "TUV300",
          "Verito",
          "XUV 300",
          "XUV 300 TurboSport",
          "XUV 3XO",
          "XUV500",
          "XUV700",
          "Xylo",
        ],
        "Maruti Suzuki": [
          "1000",
          "800",
          "A-Star",
          "Alto",
          "Alto 800",
          "Baleno",
          "Brezza",
          "Celerio",
          "Celerio X",
          "Ciaz",
          "Dzire",
          "Eeco",
          "Esteem",
          "Estilo",
          "Fronx",
          "Grand Vitara",
          "Gypsy",
          "Ignis",
          "Invicto",
          "Jimny",
          "New Ertiga",
          "Omni",
          "Ritz",
          "S-Cross",
          "S-Presso",
          "Swift",
          "SX4",
          "Versa",
          "Wagon R",
          "XL6",
          "Zen",
          "Zen Estilo",
        ],
        "MG Motors": ["Astor", "Gloster", "Hector", "Hector Plus", "ZS EV"],
        "Mercedes-Benz": [
          "A-Class",
          "AMG GT",
          "B-Class",
          "C-Class",
          "CLA",
          "E-Class",
          "E-Class Cabriolet",
          "GL",
          "GLA",
          "GLB",
          "GLC",
          "GLE",
          "GLE Coupe",
          "GLS",
          "ML-Class",
          "S-Coupe",
          "SL",
        ],
        Nissan: [
          "350Z",
          "370Z",
          "Evalia",
          "Kicks",
          "Magnite",
          "Micra",
          "Micra Active",
          "Sunny",
          "Teana",
          "Terrano",
          "X-Trail",
        ],
        Renault: [
          "Captur",
          "Duster",
          "Fluence",
          "Kiger",
          "Koleos",
          "Kwid",
          "Lodgy",
          "Logan",
          "Pulse",
          "Scala",
          "Triber",
        ],
        Skoda: [
          "Fabia",
          "Fabia Scout",
          "Karoq",
          "Kodiaq",
          "Kushaq",
          "Laura",
          "Octavia",
          "Octavia Combi",
          "Rapid",
          "Slavia",
          "Superb",
          "Superb Old",
          "Yeti",
        ],
        Tata: [
          "Altroz",
          "Aria",
          "Bolt",
          "Curvy",
          "Harrier",
          "Hexa",
          "Indica",
          "Indica V2",
          "Indica V2 Turbo",
          "Indica V2 Xeta",
          "Indica Vista",
          "Indica eV2",
          "Indicab",
          "Indigo",
          "Indigo CS",
          "Indigo XL",
          "Indigo eCS",
          "Indigo Marina",
          "Manza",
          "Movus",
          "Nano",
          "Nano GenX",
          "Nexon",
          "Nexon EV",
          "Nexon EV Max",
          "Nexon EV Prime",
          "Punch",
          "Safari",
          "Safari Storme",
          "Sierra",
          "Sumo",
          "Sumo Gold",
          "Sumo Grande",
          "Sumo Grande MK II",
          "Sumo Spacio",
          "Sumo Victa",
          "Tiago",
          "Tiago EV",
          "Tiago NRG",
          "Tigor",
          "Tigor EV",
          "Venture",
          "Vista Tech",
          "Xenon XT",
          "Zest",
        ],
        Toyota: [
          "Alphard",
          "Camry",
          "Celica",
          "Corolla",
          "Corolla Altis",
          "Corona",
          "Etios",
          "Etios Cross",
          "Etios Liva",
          "Fortuner",
          "Glanza",
          "Hilux",
          "Innova",
          "Innova Crysta",
          "Innova Hycross",
          "Land Cruiser",
          "Land Cruiser Prado",
          "Prius",
          "Qualis",
          "Rumion",
          "Urban Cruiser",
          "Urban Cruiser Hyryder",
          "Urban Cruiser Taisor",
          "Yaris",
        ],
        Volkswagen: [
          "1600",
          "Ameo",
          "Beetle",
          "Cross Polo",
          "Jetta",
          "Passat",
          "Phaeton",
          "Polo",
          "T-Roc",
          "Taigun",
          "Tiguan",
          "Tiguan AllSpace",
          "Touareg",
          "Virtus",
          "Vento",
        ],
      };
      const brandSelect = document.getElementById("Brand");
      const modelSelect = document.getElementById("Model");
      const otherModelInput = document.getElementById("OtherModel");
      brandSelect.addEventListener("change", function () {
        const selectedBrand = brandSelect.value;
        modelSelect.innerHTML =
          '<option value="" selected disabled>Select Model</option>';

        if (modelData[selectedBrand]) {
          modelData[selectedBrand].forEach((model) => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
          });

          // Add "Other" option
          const otherOption = document.createElement("option");
          otherOption.value = "Other";
          otherOption.textContent = "Other";
          modelSelect.appendChild(otherOption);

          modelSelect.disabled = false;
        } else {
          modelSelect.disabled = true;
        }

        // Hide Other input when brand changes
        otherModelContainer.style.display = "none";
        otherModelInput.value = "";
      });
      // Model change
      modelSelect.addEventListener("change", function () {
        if (modelSelect.value === "Other") {
          otherModelContainer.style.display = "block";
          otherModelInput.focus();
             otherModelInput.required = true;
        } else {
          otherModelContainer.style.display = "none";
          otherModelInput.value = "";
           otherModelInput.required = false;
        }
      });
// ========================================== state and store===================================================
const storeData = {
  "Delhi NCR":["Ambience Mall", "Janakpuri", "Pacific Mall ,Subhash Nagar", "Promenade Mall"],
  Gujarat:["Ahmedabad", "Surat", "Vadodara"],
  Haryana:["Gurugram"],
  Karnataka:["Bengaluru"],
  "Madhya Pradesh":["Indore"],
  Maharashtra:["Nagpur"],
  Nagaland:["Dimapur"],
  Punjab:["Mohali"],
  Rajasthan: ["Jaipur", "Udaipur"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Lucknow", "Noida"],
  Uttarakhand: ["Rudrapur"],
};
const allStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh","Delhi NCR", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" 
];
const stateSelect = document.getElementById("State");
const storeSelect = document.getElementById("Store");
const otherStoreContainer = document.getElementById("otherStoreContainer");
const otherStoreInput = document.getElementById("OtherStore");
// Populate states
allStates.forEach(state => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});
// On state change
stateSelect.addEventListener("change", function () {
  const selectedState = stateSelect.value;
  storeSelect.innerHTML = '<option value="" selected disabled>Select Store</option>';
  otherStoreContainer.style.display = "none";
  otherStoreInput.value = "";
  otherStoreInput.required = false; // Reset required

  if (storeData[selectedState]) {
    storeData[selectedState].forEach(store => {
      const option = document.createElement("option");
      option.value = store;
      option.textContent = store;
      storeSelect.appendChild(option);
    });
  }

  // Add "Other" option
  const otherOption = document.createElement("option");
  otherOption.value = "Other";
  otherOption.textContent = "Other";
  storeSelect.appendChild(otherOption);

  storeSelect.disabled = false;
});
// On store change
storeSelect.addEventListener("change", function () {
  if (storeSelect.value === "Other") {
    otherStoreContainer.style.display = "block";
    otherStoreInput.focus();
    otherStoreInput.required = true; // Make required when visible
  } else {
    otherStoreContainer.style.display = "none";
    otherStoreInput.value = "";
    otherStoreInput.required = false; // Remove required when hidden
  }
});
// ================================colorchange ====================================
document.getElementById("CarColor") .addEventListener("change", function () {
          let otherInput = document.getElementById("OtherColor");
          if (this.value === "Other") {
            otherInput.style.display = "block";
            otherInput.required = true; // Make it required when visible
          } else {
            otherInput.style.display = "none";
            otherInput.required = false;
          }

        });
























        // "function doPost(e) { var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // apna sheet name var data = JSON.parse(e.postData.contents); sheet.appendRow([ new Date(), data.Reg_No, data.fullName, data.phoneNumber, data.Brand, data.Model, data.car_color, data.Car_Number, data.service, data.Store, data.State, data.dateInput, data.timeInput ]); return ContentService.createTextOutput(JSON.stringify({ status: "success" })) .setMimeType(ContentService.MimeType.JSON); } function sendDailySummary() { var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); var data = sheet.getDataRange().getValues(); var today = new Date(); var todayStr = Utilities.formatDate(today, "Asia/Kolkata", "yyyy-MM-dd"); var message = "<h2>📌 Daily Report (" + todayStr + ")</h2>"; message += "<table border='1' cellspacing='0' cellpadding='5' style='border-collapse:collapse; font-family:Arial; font-size:14px;'>"; message += "<tr>"; data[0].forEach(h => message += "<th style='background:#f4f4f4;'>" + h + "</th>"); message += "</tr>"; var count = 0; for (var i = 1; i < data.length; i++) { var rowDate = Utilities.formatDate(new Date(data[i][0]), "Asia/Kolkata", "yyyy-MM-dd"); if (rowDate === todayStr) { count++; message += "<tr>"; data[i].forEach(val => message += "<td>" + (val || "") + "</td>"); message += "</tr>"; } } message += "</table>"; message += <p><b>Total Entries Today:</b> ${count}</p>; MailApp.sendEmail({ to: "yourmail@gmail.com", subject: "Daily Report - " + todayStr, htmlBody: message }); } "