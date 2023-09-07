import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  const reservationResponse = await fetch(config.backendEndpoint+"/reservations")
  // console.log(reservationResponse)
  const reservationData = await reservationResponse.json()
  // console.log(reservationData)
  // Place holder for functionality to work in the Stubs
  return reservationData;
  }
  catch(err){
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations)
  const tableBody = document.getElementById("reservation-table")
  if(reservations.length !==0){
    document.getElementById("no-reservation-banner").style.display = "none"
    document.getElementById("reservation-table-parent").style.display = 'block'
    reservations.forEach((reservation) => {
      tableBody.innerHTML +=`
      <tr>
        <td scope = 'col'>${reservation.id}</td>
        <td scope = 'col'>${reservation.name}</td>
        <td scope = 'col'>${reservation.adventureName}</td>
        <td scope = 'col'>${reservation.person}</td>
        <td scope = 'col'>${new Date(reservation.date).toLocaleDateString('en-IN')}</td>
        <td scope = 'col'>${reservation.price}</td>
        <td scope = 'col'>${new Date(reservation.time).toLocaleDateString('en-IN',
        {
          year : "numeric",day : "numeric",month : "long",hour : "numeric",
          minute: "numeric",second : "numeric",hour12 : true
        }).replace(" at",",")}</td>
        <td scope = 'col'>
        <div id=${reservation.id} class="reservation-visit-button"><a href ="../detail/?adventure=${reservation.adventure}">Vist Adventure</a> </div>
        </td>
      </tr>
      `
    });
  }else{
    document.getElementById("no-reservation-banner").style.display = 'block'
    document.getElementById("reservation-table-parent").style.display = 'none'
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
