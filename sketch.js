var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed,fedtime



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
 feed=createButton('feedthedog')
 feed.position(700,95)
 feed.mousePressed(feedDog)
 

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
 fedtime=database.ref('FeedTime')
 fedtime.on('value',function(data){
   lastFed=data.val()
 })
  
  if(lastFed>=12){
    text('last feed'+lastFed%12+'pm',350,30)
  }
  else if(lastFed===0){
    text('last feed=12am',350,30)
  }
  else{
    text('last feed'+lastFed%12+'am',350,30)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var fs=foodObj.getFoodStock()
if(fs<=0){
  foodObj.updateFoodStock(fs*0)
  
}
else{
  foodObj.updateFoodStock(fs-1)
  //write code here to update food stock and last fed time
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
