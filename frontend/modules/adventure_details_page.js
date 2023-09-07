import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');


  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const AdventureRes= await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`)
    const data = await AdventureRes.json()
    return data
  }
  catch(error){
    return null
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
  document.getElementById("adventure-name").innerHTML = adventure.name
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle
  adventure.images.forEach(element => {
    document.getElementById("photo-gallery").innerHTML += `
  <div>
  <img class = "activity-card-image" src = ${element}>
  </div>
  `
  });

  document.getElementById("adventure-content").innerHTML = adventure.content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = ''
  document.getElementById("photo-gallery").innerHTML +=
  `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width:70vw;height:50vh">
        <div class="carousel-indicators" id = "carousel-indicators-id">
          </div>
        <div class="carousel-inner h-100" id = "carousel-inner-parent">
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
  `
  // const carouselImages = carouselTeam[0].images
  const carouselItemsElem = document.getElementById("carousel-inner-parent")
  const carouselIndicators = document.getElementById("carousel-indicators-id")
  images.forEach((Img,idx) => {
    idx ===0
    ?
    carouselItemsElem.innerHTML = `
    <div class="carousel-item h-100 active">
        <img src=${Img} class="w-100 h-100" alt="..." style="object-fit:cover"/>
    </div>
    `
    :
    carouselItemsElem.innerHTML += `
    <div class="carousel-item h-100">
        <img src=${Img} class="w-100 h-100" alt="..." style="object-fit:cover"/>
    </div>
    `
  })
  images.forEach((Img,idx) => {
    idx ===0
    ?
    carouselIndicators.innerHTML = `
    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to=${idx} class="active" aria-current="true" aria-label="Slide ${idx}"></button>
    `
    :
    carouselIndicators.innerHTML += `
    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to=${idx} aria-label="Slide ${idx}"></button>
    `
  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure.available)
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = String(adventure.costPerHead);
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block"
    document.getElementById("reservation-panel-available").style.display = "none";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").
  addEventListener("submit", async (event) => {
    event.preventDefault()
    const formElement = event.target.elements;
    const formData = {
      name: formElement.name.value,
      date: formElement.date.value,
      person: formElement.person.value,
      adventure: adventure.id
    }
    console.log(formData);
    try{
      await makeReservation(formData);
      alert("Success!");
      location.reload();
    }
    catch(err){
      alert("Failed!")
    }
  });
  
}
async function makeReservation(formData) {
  console.log(`${config.backendEndpoint}/reservations/new`)
  const reservationRes = await fetch(`${config.backendEndpoint}/reservations/new`,
  {
    method: "POST",
    body: JSON.stringify(formData),
    headers : {
    "Content-type" : "application/json"
  }
  }
  );
  // console.log(reservationRes)
  const reservationResponseData = await reservationRes.json();
  // console.log("reservationResponseData", reservationResponseData);
};

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  adventure.reserved
    ?document.querySelector("#reserved-banner").style.display = "block"
    :document.querySelector("#reserved-banner").style.display = "none";

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
