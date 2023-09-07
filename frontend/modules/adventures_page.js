
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const cityRes= await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    const data = await cityRes.json()
    return data
  }
  catch(error){
    return null
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures)
  adventures.forEach((adventure) => {
  const {id,category,image,name,costPerHead,duration} = adventure
  const row = document.getElementById('data')
  row.innerHTML += `
<div class="col-6 col-lg-3 mb-4 position-relative">
  <div class = "category-banner">${category}</div>
  <a id =${id}  href="detail/?adventure=${id}">
    <div class="activity-card">
      <img class="img-fluid" src=${image}/>
      <div class = "d-flex justify-content-between w-100 mx-2 flex-wrap">
        <p class="m-2 fw-normal fs-5">${name}</p>
        <p class="m-2 fw-normal fs-5">₹${costPerHead}</p>
      </div>
      <div class = "d-flex justify-content-between w-100 mx-2 flex-wrap">
        <p class="m-2 fw-normal fs-5">Duration</p>
        <p class="m-2 fw-normal fs-5">${duration} Hours</p>
      </div>
    </div>
  </a>
</div>
`;
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(list.filter((city) => city.duration>low && city.duration<high))
  return list.filter((city) => city.duration>=low && city.duration<=high)
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const list1 = []
  list.forEach((city) => {
    categoryList.forEach((category) =>{
      if(city.category == category){
        list1.push(city)
      }
    })
  })
  return list1
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration !== ""){
    const durationArray = filters.duration.split("-")
    const durationList = filterByDuration(list,durationArray[0],durationArray[1])
    if(filters.category.length!=0){
      // console.log(filters.category.length)
      const categoryList = filterByCategory(durationList,filters.category);
      return categoryList
    }
    else{
      return durationList
    }
  }
  else{
    if(filters.category.length!=0){
      console.log(filters.category.length)
      const categoryList = filterByCategory(list,filters.category);
      return categoryList
    }
    else{
      return list
    }
  }

  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // console.log(JSON.parse(localStorage.getItem("filters")))
  return JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log(filters)
  const categoryArray = document.getElementById("category-list");
  
  filters.category.forEach((element) => {
    categoryArray.innerHTML += `
    <p class = "category-filter">${element}</p>
    `
  } )
  const all_select = document.getElementById("duration-select");
  for (let i = 0; i < all_select.length; i++) {
    if(all_select[i].value == filters.duration){
      document.getElementById("duration-select").selectedIndex = i
    }
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
