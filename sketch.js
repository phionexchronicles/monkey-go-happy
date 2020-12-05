
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400)
   //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  score = 0
  ground = createSprite(200,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background(255);
  text("Score:"+score,50,50)
  if(ground.x<0) {
    ground.x=ground.width/2
  }
  console.log(monkey.y)
    if(keyDown("space") && monkey.y>=314 ){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
 spawnObstacles();
  spawnBananas();
  drawSprites()
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1
  }
   if(obstacleGroup.isTouching(monkey)){
     ground.velocityX=0
     monkey.velocityY=0
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
   }
    monkey.collide(ground);
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(500,335,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6
    obstacle.addImage("obstacle",obstacleImage)
    //generate random obstacles
    obstacle.debug = true;
    obstacle.setCollider("circle",0,0,50)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
function spawnBananas() {
  if(frameCount % 60 === 0) {
    var banana = createSprite(500,335,10,40);
    //banana.debug = true;
    banana.velocityX = -6
    banana.addImage("banana",bananaImage)
    //generate random bananas
    banana.y=Math.round(random(150,250))
    
    //assign scale and lifetime to the banana          
    banana.scale = 0.1;
    banana.lifetime = 300;
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

