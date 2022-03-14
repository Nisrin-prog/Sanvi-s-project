const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState, PLAY, END;
var bg, boyImg, boyStd, boy;
var startingPointImg, floatingIsland1, floatingIsland2;
var float1, float2, float3, float4, startingPoint, endingPoint;
var i = 0;
var j = 0;
var score = 0 
function preload() {
  bg = loadImage("./Assets/bg.png");
  boyImg = loadAnimation(
    "./Assets/boy1.png",
    "./Assets/boy2.png",
    "./Assets/boy3.png",
    "./Assets/boy4.png"
  );
  boyStd = loadAnimation("./Assets/boy4.png");
  startingPointImg = loadImage("./Assets/startingPoint.png");
  floatingIsland1 = loadImage("./Assets/floatingIsland1.png");
  floatingIsland2 = loadImage("./Assets/floatingIsland2.png");
  bgSound = loadSound("./Assets/sound1.mp3");
  sadSound = loadSound("./Assets/sad.wav");
  bombFall = loadSound("./Assets/bombFall.wav")
  boyFall = loadSound("./Assets/boyFall.wav")
  starImg = loadImage("./Assets/star.png")
  obstacleImg = loadImage("./Assets/cannonball.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  imageMode(CENTER);
  boy = new Boy(50, height - 450);
  console.log(boy.body);

  startingPoint = new Ground(100, height - 100, 200, 250, startingPointImg);
  //invisibleG = new Ground(100, height - 80, 200, 50);
  float1 = new Ground(400, height - 250, 175, 225, floatingIsland1);
  float2 = new Ground(650, height - 100, 150, 225, floatingIsland2);
  float3 = new Ground(950, height - 150, 175, 250, floatingIsland1);
  float4 = new Ground(1200, height - 250, 150, 250, floatingIsland2);
  endingPoint = new Ground(1400, height - 400, 150, 250, startingPointImg);

  obstacle1 = new Obstacle(100, 50,obstacleImg);
  obstacle2 = new Obstacle(450, 50,obstacleImg);
  obstacle3 = new Obstacle(700, 50,obstacleImg);
  obstacle4 = new Obstacle(950, 50,obstacleImg);
  obstacle5 = new Obstacle(1150, 50,obstacleImg);
  obstacle6 = new Obstacle(1350, 50,obstacleImg);

  star1 = new Obstacle(200, 150,starImg);
  star2 = new Obstacle(450, 50,starImg);
  star3 = new Obstacle(700, 50,starImg);
  star4 = new Obstacle(950, 50,starImg);
  star5 = new Obstacle(1150, 50,starImg);
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  bgSound.loop();
}

function draw() {
  background(255);
  Engine.update(engine);
  // Game Background
  image(bg, width / 2, height / 2, width, height);
  textSize(25)
  fill("black")
  text("Score:" + score, 50,20)
  if (gameState === PLAY) {
    //keyControls for the player
    playerControls();
    textSize(30);
    fill("black");
    text("Press Space To Jump", width / 2 - 100, height - 50);
    // Displaying all our game objects
    boy.show();
    startingPoint.show();
    float1.show();
    float2.show();
    float3.show();
    float4.show();
    endingPoint.show();
    //invisibleG.show()
    obstacle1.display();
    obstacle2.display();
    obstacle3.display();
    obstacle4.display();
    obstacle5.display();
    obstacle6.display();

    star1.display()

    // checking the collision
    collisionWithPoints(boy, float1,obstacle2);
    collisionWithPoints(boy, float2,obstacle3);
    collisionWithPoints(boy, float3,obstacle4);
    collisionWithPoints(boy, startingPoint,obstacle1);
    collisionWithPoints(boy, float4,obstacle5);
    collisionWithPoints(boy, endingPoint,obstacle6);
    if (boy.body.position.y > height - 50) {
      gameState = END;
      bgSound.stop()
      boyFall.play()
    }
  } else if (gameState === END) {
    textSize(30);
    fill("black");
    text("GameOver", width / 2, height / 2);
    World.remove(world, boy);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function collisionWithPoints(player, floatP,obstacle) {
  var collision = Matter.SAT.collides(player.body, floatP.body);
  console.log(collision);

  if (collision.collided) {
    text("Bomb is ready to drop, jump quickly", width / 2 - 100, 30);
    player.body.velocity.x = 0;
    if (keyDown("space")) {
      player.shoot();
    }
    setInterval(function () {
      Matter.Body.setStatic(obstacle.body, false);
      //bombFall.play()
    }, 3000);
    var bombcollision = Matter.SAT.collides(player.body, obstacle.body);
    if (bombcollision.collided) {
      gameState = END;
      bgSound.stop()
      boyFall.play()
    }
  }
}
function playerControls() {
  var prev = boy.body.position.x;

  if (keyDown(RIGHT_ARROW) && i <= 2) {
    boy.body.position.x += 1;
    i++;
    j = 0;
  }
  if (keyDown(LEFT_ARROW) && j <= 2) {
    boy.body.position.x -= 1;
    j++;
    i = 0;
  }
}

function reset(){

}
