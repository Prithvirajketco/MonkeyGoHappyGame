var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var ground, invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeyImage= loadImage("sprite_0.png");
}



function setup() {
  createCanvas(750,400)
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(375,390,1500,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  console.log(ground.x);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  invisibleGround = createSprite(375,395,750,10);
  invisibleGround.visible = false;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime= Math.ceil(frameCount/frameRate())
  text("survivalTime: "+ survivalTime, 100,50);
  
  score= 0;
}


function draw() {
  background(180);
  console.log(monkey.y);
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
      
    if(obstacleGroup.isTouching(monkey)){
      gameState= End;
    }
       
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      monkey.collide(invisibleGround);
      
      Obstacles.setLifetimeEach(-1);
      Banana.setLifetimeEach(-1);
      
      Obstacles.setVelocityXEach(0);
      Banana.setVelocityXEach(0);
    }  
    
    
    
    monkey.collide(invisibleGround);
  
    spawnObstacles();
    spawnBanana();
   
        drawSprites(); 
}}

function reset(){
  gameOver.visible= false;
  restart.visible= false;
  gameState= PLAY;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  score=0;

}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(750,370,10,40);
   obstacle.velocityX = -(6 + score/100);
   Math.round(random(90,120));
    
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
   
    obstacle.lifetime = 200;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    obstacleGroup.add(obstacle);
 }}
function spawnBanana(){
 if (frameCount % 60 === 0){
   var banana = createSprite(750,300,10,40);
   banana.y= Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
   
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    bananaGroup.add(banana);
 }}




