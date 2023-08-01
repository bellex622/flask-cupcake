"use strict";


let cupcakeList = [];

const $FLAVOR = $("#flavor");
const $SIZE = $("#size");
const $RATING = $("#rating");
const $IMAGE_URL = $("#image_url");
const $ADD_CUPCAKE_BTN = $("#add-cupcake-button");
const $CUPCAKE_LIST = $("#Cupcake-list")

start()


//** Contains data about a cupcake */
class Cupcake {
  constructor(id, flavor, size, rating, image_url) {
    this.id = id;
    this.flavor = flavor;
    this.size = size;
    this.rating = rating;
    this.image_url = image_url;
  }

}


/** Called on page load to add event listeners and set initial params*/
function start(){
  $ADD_CUPCAKE_BTN.on("click", getCupcakeAndUpdateDisplay);
  displayAllCupcakes();
}


/** Sets cupcakeList to contain all cupcakes from the api, then displays them */
async function displayAllCupcakes(){
  await getAllCupcakes();
  updateCupcakeDisplay();
}


//** Handles form submission by creating a new cupcake instance from form data
// and re-rendering the html cupcake list */
async function getCupcakeAndUpdateDisplay(event) {
  event.preventDefault();

  const formData = getFormData();
  cupcakeList.push(await newCupcakeFromForm(formData));

  updateCupcakeDisplay();
  console.log(cupcakeList);
}


/**Calls the API and updates the list with all cupcakes returned */
async function getAllCupcakes(){
  const response = await axios.get('/api/cupcakes');
  cupcakeList=[];

  for (const cupcake of response.data.cupcakes){
    cupcakeList.push(
      new Cupcake(
        cupcake.id,
        cupcake.flavor,
        cupcake.size,
        cupcake.rating,
        cupcake.image_url,
      )
    )
  }
  console.log(cupcakeList) //return list from 'get' functions
}


//** Pulls form data and saves it in an object {flavor,size,rating,image_url} */
function getFormData(){
  return {
    flavor: $FLAVOR.val(),
    size: $SIZE.val(),
    rating: $RATING.val(),
    image_url: $IMAGE_URL.val(),
  };
}


//** Accepts a formData object formatted as {flavor,size,rating,image_url}
//Returns a new Cupcake instance */
async function newCupcakeFromForm(formData) {

  const response = await axios.post('/api/cupcakes', formData);
  console.log(response);

  return new Cupcake(
    response.data.cupcake.id,
    response.data.cupcake.flavor,
    response.data.cupcake.size,
    response.data.cupcake.rating,
    response.data.cupcake.image_url,
  );
}


/** Re-renders the html cupcake list */
function updateCupcakeDisplay(){
  $CUPCAKE_LIST.empty();
  for (const cupcake of cupcakeList){
    const html = $(
      `<li class="Cupcake">
      <img class="Cupcake-image" src="${cupcake.image_url}">
      <p>${cupcake.flavor},${cupcake.size}<p>
      <p>Rating: ${cupcake.rating}</p>
      </li>`);
    $CUPCAKE_LIST.append(html)
  }
}


//TODO: form validation to give user feedback
