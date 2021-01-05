var tom,tomImg,tomImg2;
var jerry,jerryImg;
var spike,spikeImg,spikeGroup
var coin,coinImg;
var climber,climberImg,climberGroup;
var cloud,cloudImg;
var bg;
var tom2Img;
var PLAY=1;
var END=0;
var gameState=1;
var gameOver;
var tomwonImage;
var tomwon;
function preload(){
bg=loadImage("background.png")
  tomImg=loadAnimation("Tom.png")
  tomImg2=loadAnimation("tom2.png")
  climberImg=loadImage("climber.png")
  spikeImg=loadImage("Spike.png")
  jerryImg=loadImage("Jerry.png");
  tom2Img=loadImage("tom2.png");
  gameoverImg=loadImage("go.jpg")
  tomwonImage=loadImage("tomwon.png")
}

function setup()
 {
  createCanvas(800,660);

  ground=createSprite(400,650,800,10);
  ground.shapeColor="brown";

  tom= createSprite(500, 600, 50, 50);
  tom.addAnimation("right",  tomImg)
  tom.addAnimation("left",  tomImg2)
  tom.scale=0.3;
  tom.setCollider("rectangle",0,0,100,150);

  climberGroup = createGroup();
  spikeGroup=createGroup();

  jerry=createSprite(230,60,20,20);
  jerry.addImage(jerryImg);
  jerry.scale=0.2;
 
 
  gameOver=createSprite(400,300,100,800)
  gameOver.addImage(gameoverImg);
  gameOver.height=gameOver.height*4;
  gameOver.scale=2;
  gameOver.visible=false;

  tomwon=createSprite(365,330,100,800)
  tomwon.addImage(tomwonImage);
  tomwon.height=gameOver.height*4;
  tomwon.scale=1.2;
  tomwon.visible=false;
}

function draw() {
  background(bg); 
  
if (gameState===1) 
{

  if (keyWentDown("y")) 
  {
    tom.velocityY=-10;
    
  }
  tom.velocityY=tom.velocityY+0.5;

 tom.collide(ground);
 if (keyDown(RIGHT_ARROW))
  {
   tom.x=tom.x+3;
   tom.changeAnimation("left",tom2Img)
  }
 if (keyDown(LEFT_ARROW)) 
  {
  tom.x=tom.x-3;
 
  tom.changeAnimation("right",  tomImg)
  }

  spawnClimbers();

  if (tom.isTouching(climberGroup)) 
  {
    tom.velocityX=0;
    tom.velocityY=0; 
  }
  if (tom.isTouching(jerry)) 
  {
    tomwon.visible=true;
    gameState=0;
  }
  else
  if (tom.isTouching(spikeGroup))
   {
    gameOver.visible=true;
   gameState=0;
   }
} 
else
if(gameState===0)
 {
  tom.velocityX=0;
  tom.velocityY=0;
  tom.destroy();
  spikeGroup.destroyEach();
  climberGroup.destroyEach();

 }

  drawSprites();
}
function spawnClimbers() {
  if (frameCount%50===0) {
   
      climber=createSprite(100,600,50,20);
      climber.addImage(climberImg);
      climber.y=random(100,650);
      climber.velocityX=3;
      climberGroup.add(climber)
      climber.setCollider("rectangle",0,0,90,35);
      //climber.debug=true;
      tom.depth=climber.depth;

    
      spike=createSprite(100,100,50,20);
      spike.addImage(spikeImg);
      spike.x=climber.x+random(-20,20);
      spike.y=climber.y-50;
      spike.velocityX=3;
      spike.scale=0.3;
      spikeGroup.add(spike);
      spike.setCollider("circle",0,0,75)
      tom.depth=spike.depth;
  }

}


