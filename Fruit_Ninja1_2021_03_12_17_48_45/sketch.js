var play=1;
var end=0;
var gameState=1;

var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var enemy,enemyImage,alien1,alien2;
var go,goimg;

var score=0

var gos
var fs

function preload(){
  swordImage=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  enemyImage=loadAnimation("alien1.png","alien2.png")
  goimg=loadImage("gameover.png")
  
  gos=loadSound("gameover.mp3")
  fs=loadSound("knifeSwooshSound.mp3")
 
}

function setup() {
  createCanvas(400,400);
  
  
 fruitGroup=new Group();
 enemyGroup=new Group();
  
  sword=createSprite(400,200,20,20);
  sword.addImage(swordImage)
  sword.scale=0.7
  
  go=createSprite(200,200,400,400);
  go.addImage(goimg)
  go.visible=false
}

function draw(){
  background(99,40,17);
  
  text("score: "+score,300,200)
  if(gameState===play){
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2
    fs.play()
  }
  if(enemyGroup.isTouching(sword)){
   gameState=end; 
    gos.play()
  }
    fruits();
  Enemy();
  }
  else if(gameState===end){
    sword.x=200;
    sword.y=200;
    go.visible=true;
    fruitGroup.setVelocityXEach(0)
  }
  drawSprites();
}

function fruits(){
  if (World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1)
     }if(r===2){
       fruit.addImage(fruit2)
     }if(r===3){
       fruit.addImage(fruit3)
     }if(r===4){
       fruit.addImage(fruit4)
     }
    fruit.y=Math.round(random(50,340))
    
    fruit.velocityX=-7;
    fruit.setLifetime=100
    
    fruitGroup.add(fruit)
  }
}
function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",enemyImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}