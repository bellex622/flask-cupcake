"use strict";

class Cupcake {
  constructor(id, flavor, size, rating, image_url) {
    this.id = id;
    this.flavor = flavor;
    this.size = size;
    this.rating = rating;
    this.image_url = image_url;
  }

}

cupcake_list = [];
$flavor = $("#flavor");
$size = $("#size");
$rating = $("#rating");
$image_url = $("#image_url");


function get_cupcake_from_form(){
  
}

async function add_cupcake() {

  response = await axios.post('/api/cupcakes', {

  })



}





//event listenr on a button, a fuction to get json, make a new cupcake instance
//a function to update cupcake display

