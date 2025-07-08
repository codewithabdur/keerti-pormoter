document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const mobile = form.mobile.value.trim();
  const message = form.message.value.trim();

  // Validate (basic)
  if (!name || !email) {
    showResponse("Please fill in all required fields.", "error");
    return;
  }

  // API Payload
  const payload = {
    PersonName: name,
    MobileNo: mobile, // Optional — you can add a phone field later
    MobileNo1: "",
    MobileNo2: "",
    EmailID: email,
    EmailID1: "",
    EmailID2: "",
    City: "",
    State: "",
    Country: "",
    CountryCode: "+91",
    CountryCode1: "",
    CountryCode2: "",
    PinCode: "",
    ResidentialAddress: "",
    OfficeAddress: "",
    SourceName: "Landing Page",
    MediumName: "",
    CampaignName: "",
    InitialRemarks: message
  };

  try {
    const response = await fetch("https://sipapi.kit19.com/Enquiry/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "kit19-Auth-Key": "f23f67ef38df42ab9226925542117ed0"
      },
      body: JSON.stringify(payload)
    });


    if (response.status === 200) {
      showResponse("Thank you! Your enquiry has been submitted successfully.", "success");
      form.reset();
      setTimeout(() => {
        showResponse("")
      }, 1000);
    } else {
      showResponse("Failed to submit. Please try again later.", "error", JSON.stringify(response));
      setTimeout(() => {
        showResponse("")
      }, 1000);
      console.log(response)
    }

  } catch (error) {
    console.error("Error submitting form:", error);
    showResponse("An error occurred. Please try again.", "error");
  }
});

function showResponse(message, type) {
  const responseBox = document.getElementById("formResponse");
  responseBox.textContent = message;
  responseBox.style.color = type === "success" ? "green" : "red";
}
