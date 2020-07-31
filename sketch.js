//Global Variables
var player, playerImage,backgr,backgroundImage,bananaImage,obstacleImage,obstacleGroup,bananaGroup,score,ground,gameState,play,end;


function preload(){
  backgroundImage = loadImage("jungle.png");
  
  playerImage = loadImage("Monkey_01.png","Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  //creating the monkey
  player = createSprite(50,240,20,50);
  player.addAnimation("monkey",playerImage);
  player.scale = 0.1;
  
  //creating the background
  backgr = createSprite(600,150,1200,300);
  backgr.addAnimation("background",backgroundImage);
  backgr.velocityX = 3;
  
  //creating the invisible ground
  ground = createSprite(300,250,600,10);
  ground.visible = false;
  
  //creating the groups
  obstacleGroup = newGroup();
  bananaGroup = newGroup();
  
  //creating the gameStates
  play = 1;
  end = 0;
  gameState = 1;
}


function draw(){
 background(255); 
  
  if(gameState === play){
    //resetting the background
    if(backgr.x < 0){
      backgr.x = backgr.width / 2;
    }
    
    //making the monkey jump
    if(keyDown("space") && player.y >= 223){
       player.velocityY = -20;
    }
    
    //adding the gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //displaying the bananas
    banana();
    
    //displaying the obstacles
    obstacle();
    
    //increasing the score
    if(bananaGroup.isTouching(player)){
      score = score + 2;
      bananaGroup.destroyEach();
    }
    
    //changing the size of the trex
    switch(score){
      case 10: player.scale = 0.12;
      break;
      
      case 20: player.scale = 0.14;
      break;
      
      case 30: player.scale = 0.16;
      break;
      
      case 40: player.scale = 0.18;
      break;
      
      default: break;
    }
    
    //checking for the losing condition
    if(obstacleGroup.isTouching(player)){
      gameState = end;
      player.scale = 0.2;
    }
  }
  else if(gameState === end){
    //making everything stop moving
    backgr.velocityX = 0;
    
    //making sure nothing gets destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  player.collide(ground);
  
  drawSprites();
}

//creating the bananas
function banana(){
  var banana = createSprite(600,200,5,10);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.5;
  banana.y = Math.round(random(120,200));
  banana.velocityX = -3;
  banana.life = 150;
  bananaGroup.addToGroup(banana);
}

//creating the obstacles
function obstacle(){
  var obstacle = (600,240,10,20);
  obstacle.addAnimation("obstacle",obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -4;
  obstacle.life = 150;
  obstacleGroup.addToGroup(obstacle);
}