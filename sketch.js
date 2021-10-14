var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudImage;

var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleImg;

var obstacleGroup, cloudGroup;

var score = 0;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,170,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  
}

function draw() {
  background(180);
  
  //display of score
  text("Score: " + score , 500, 50);
  

  if(gameState === PLAY)
  {
      //spawn the clouds
      spawnClouds();
      spawnObstacles();
    ground.velocityX = -4;

    //score logic
    score = score + Math.round(random(frameCount/60));

    
    //make trex jump
    if(keyDown("space") && trex.y>=146) {
      trex.velocityY = -12;
    }
    
    //gravity
    trex.velocityY = trex.velocityY + 0.8
    
    //reset the ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(obstacleGroup.isTouching(trex))
    {
        gameState = END;
    }
 

  }

  else if(gameState === END)
  {

    ground.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  }
  

    //stop trex to fall off the ground  
    trex.collide(invisibleGround);
  

  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(20,100))
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloudGroup.add(cloud);
    }
}


function spawnObstacles()
{
    if(frameCount % 60 === 0){
      obstacle = createSprite(600,160, 20, 50);
      obstacle.velocityX = -3;

      var rand = Math.round(random(1,6))
      switch(rand)

      {
          case 1: obstacle.addImage(obstacle1);
                  break;
          
          case 2: obstacle.addImage(obstacle2);
                  break;

          case 3: obstacle.addImage(obstacle3);
                  break;

          case 4: obstacle.addImage(obstacle4);
                  break;

          case 5: obstacle.addImage(obstacle5);
                  break;

          case 6: obstacle.addImage(obstacle6);
                  break;

          default: break;
      }

          obstacle.scale = 0.4;
          obstacle.lifetime = 200;

          //add each obstacle inside the group
          obstacleGroup.add(obstacle);
    }
 
}
