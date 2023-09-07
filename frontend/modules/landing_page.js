import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  if (cities) {
    
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
     
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // console.log(config.backendEndpoint+"/cities")
  try{
    let response = await fetch(config.backendEndpoint+"/cities");
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    return data;
  }
  catch (error){
    console.log("catch")
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  /*let coldiv = document.createElement("div")
  coldiv.setAttribute("class","col-12 col-sm-6 col-lg-4 col-xl-3 mb-4")
  let divtile = document.createElement("div")
  divtile.setAttribute("class","tile")
  divtile.setAttribute("id",id)
  let img = document.createElement("img")
  // img.setAttribute("src",img)
  img.src = image
  img.alt = city
  let divtext = document.createElement("div")
  divtext.setAttribute("class","tile-text text-white text-center")
  let atag = document.createElement("a");
  atag.href = `pages/adventures/?city=${id}`;
  atag.id = id
  // console.log(atag)
  let h5 = document.createElement("h5")
  h5.textContent = city
  h5.setAttribute("class","w-100 h-100")
  let p = document.createElement("p")
  p.textContent = description
  p.setAttribute("class","w-100 h-100")
  divtext.append(h5);
  divtext.append(p);
  divtile.append(img);
  divtile.append(divtext);
  atag.append(divtile);
  coldiv.append(atag);
  const row = document.getElementById("data")
  row.append(coldiv)*/

const row=document.getElementById("data")
row.innerHTML +=`
<div class="col-lg-3 col-sm-6 mb-4">
<a id = ${id} href="pages/adventures/?city=${id}">
<div class="tile">
<img src=${image}/>
<div class="tile-text text-white text-center">
<h5>${city}</h5>
<p>${description}</p>
</div>
</div>
</a>
</div>
`
}


export { init, fetchCities, addCityToDOM };
