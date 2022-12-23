var gameState = "play"

var score = 0

var live = 3

function preload() {

    bgImg = loadImage("Assets/Road.png")
    fenceImg = loadImage("Assets/Fence.png")
    boyImg = loadAnimation("Assets/Runner-1.png", "Assets/Runner-2.png")
    restartImg = loadImage("Assets/restart.png")
    trainImg = loadImage("Assets/Train.png")
    coinImg = loadImage("Assets/goldCoin.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(width / 2, height / 2, width, height)
    bg.addImage(bgImg)

    boy = createSprite(width / 2, height - 100)
    boy.addAnimation("running", boyImg)
    boy.scale = 0.1

    restart = createSprite(width / 2, height / 2)
    restart.scale = 0.3
    restart.addImage(restartImg)

    // boy.debug = true
    boy.setCollider("circle", 0, -200, 500)


    obstaclesGroup = new Group()

    coinsGroup = new Group()


}

function draw() {

    background("yellow")

    if (gameState == "play") {

        boy.x = World.mouseX

        restart.visible = false

        createObstacles()
        createCoins()

        if (coinsGroup.isTouching(boy)) {
            for (var i = 0; i < coinsGroup.length; i++) {
                if (coinsGroup[i].isTouching(boy)) {
                    coinsGroup[i].destroy()
                    score += 10
                }
            }
        }


        if (obstaclesGroup.isTouching(boy)) {
            for (var i = 0; i < obstaclesGroup.length; i++) {
                if (obstaclesGroup[i].isTouching(boy)) {
                    live -= 1
                    obstaclesGroup[i].destroy()
                }
            }
        }
        
        if (live <= 0) {
            gameState = "end"
        }

    }


    else if (gameState == "end") {
        obstaclesGroup.setVelocityYEach(0)
        coinsGroup.setVelocityYEach(0)

        restart.visible = true

        obstaclesGroup.setLifetimeEach(-1)
        coinsGroup.setLifetimeEach(-1)

        if (mousePressedOver(restart)) {
            gameOver()
        }
    }

    drawSprites()

    textSize(30)
    fill("black")
    text("Score : " + score, 50, 50)

    fill("red")
    text("Lives : " + live, 50, 85)
}

function gameOver() {
    obstaclesGroup.destroyEach()
    coinsGroup.destroyEach()
    gameState = "play"
    score = 0
    live = 3
    restart.destroy()
}


function createObstacles() {
    if (frameCount % 60 == 0) {
        obstacle = createSprite(Math.round(random(100, width - 100)), -100)
        obstacle.velocityY = 5

        var x = Math.round(random(1, 2))

        if (x == 1) {
            obstacle.addImage(fenceImg)
            obstacle.scale = 0.6
        }
        else if (x == 2) {
            obstacle.addImage(trainImg)
            // obstacle.debug = true
            obstacle.setCollider("rectangle", 0, 0, 100, 400)
        }

        obstacle.setLifetime = height / 5
        obstaclesGroup.add(obstacle)
    }
}


function createCoins() {
    if (frameCount % 50 == 0) {
        coin = createSprite(Math.round(random(100, width - 100)), -50)
        coin.addImage(coinImg)
        coin.velocityY = 5
        coin.scale = 0.2
        coin.setLifetime = height / 5
        coinsGroup.add(coin)
    }
}













