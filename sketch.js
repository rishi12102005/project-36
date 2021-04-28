var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTheDog;
var fedTime
//create feed and lastFed variable here
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feedTheDog = createButton("feed the Dog");
feedTheDog.position(700,95);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var fedTimeRef = database.ref("feedTime");
  fedTimeRef.on("value",function(data){
    lastFedTime = data.val();
  })
 
  //write code to display text lastFed time here
response();
feedDog();

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val=0){
foodObj.updateFoodStock(food_stock_val);

}else if(food_stock_val=22){
  foodObj.updateFoodStock(food_stock_val-1);
}
}
async function response(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var dateTime = responseJSON.datetime;
  var fedTime = dateTime.slice(11,13);

  textSize(15);
  if(fedTime>=12){
  text("last Fed : 12 PM",600,95);
  }
  else if(fedTime==0){
text("last Fed : 12 AM",600,95)
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref("food").update({
    Food:foodS
  })
}
