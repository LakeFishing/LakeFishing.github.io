function play(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

    //操控物圖片//
    var bird = new Image();
    bird.src = "pictures\\316.png"

    //操控物初始座標//
    var birdX = width/4;
    var birdY = height/2;

    //操控物半徑//
    var birdRadius = 25;

    //操控物移動距離//
    var dY = -5;

    //障礙物移動距離//
    var dX = 5;

    //通道長度//
    var hole = 120;

    //障礙物寬度及高度系數//
    var wallW = width/16;
    var coffin = height-hole-(birdRadius*8);

    //障礙物初始座標//
    var wallX = [width+(dX*100)];
    var wallY = [];

    //重力//
    var dG = -3;

    //金幣座標//
    var moneyX = [width+(dX*100)+(dX*50)];
    var moneyY = [];

    var money = new Image();
    money.src = "pictures\\coin.png";

    const jump = document.getElementById("jump");

    var score = 0;
    var time = 0;
    var upPressed = false;
    var alive = true;
        

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    //按下上鍵//
    function keyDownHandler(e) {
        if(e.keyCode == 38) {
            upPressed = true;
            /**jump.play();**/
        }
    }

    //放開上鍵//
    function keyUpHandler(e) {
        if(e.keyCode == 38) {
            upPressed = false;
        }
    }

    //生成隨機高度障礙物//
    function getRandomBarrier(){
        randomNum = Math.floor(Math.random()*coffin)+(birdRadius*4);
        wallY.push(randomNum);
        wallX.push(width+(dX*100));
    }

    //生成隨機高度金幣//
    function getRandomMoney(){
        randomNum = Math.floor(Math.random()*(height-100))+50;
        moneyY.push(randomNum);
        moneyX.push(width+(dX*100)+(dX*50));
    }

    //刪除離開的障礙物//
    function deleteBarrier(){
        if (wallX.length > 4){
            wallX.splice(0,1);
            wallY.splice(0,1);
        }
    }

    //刪除離開的金幣//
    function deleteMoney(){
        if (moneyX.length > 4){
            moneyX.splice(0,1);
            moneyY.splice(0,1);
        }
    }

    //繪製障礙物//
    function drawWall(){
        ctx.beginPath();
        ctx.fillStyle = "#844200"
        for (var i = 0; i < wallY.length; i++){
            ctx.rect(wallX[i], (height - wallY[i]), wallW, wallY[i]);
            ctx.rect(wallX[i], 0, wallW, height - wallY[i] - hole);
        }
        ctx.fill();
        ctx.closePath();
    }

    //繪製操控物//
    function drawBird(){
        ctx.beginPath();
        ctx.drawImage(bird, birdX-birdRadius, birdY-birdRadius, birdRadius*2, birdRadius*2);
        ctx.closePath();
    }

    //障礙物碰撞偵測//
    function bumpWall(){
        for (i = 0; i < 3; i++){
            if (wallX[i] < birdX+birdRadius && wallX[i] > birdX-birdRadius-wallW){
                if ((birdX+birdRadius >= wallX[i] && birdY >= height-wallY[i])//下牆左側//
                || (birdX >= wallX[i] && birdY >= height-wallY[i]-birdRadius && birdX <= wallX[i]+wallW)//下牆上側//
                || (Math.sqrt(Math.pow(birdX-wallX[i],2)+Math.pow(birdY-height+wallY[i],2)) <= birdRadius)//下牆左上側//
                || (birdX+birdRadius >= wallX[i] && birdY <= height-wallY[i]-hole)//上牆左側//
                || (birdX >= wallX[i] && birdY <= height-wallY[i]-hole+birdRadius && birdX <= wallX[i]+wallW)//上牆下側//
                || (Math.sqrt(Math.pow(birdX-wallX[i],2)+Math.pow(birdY-height+wallY[i]+hole,2)) <= birdRadius)){//上牆左下側//
                    return alive = false;
                }
            }
        }
    }

    //金幣碰撞偵測//
    function bumpMoney(){
        for (i = 0; i < 3; i++){
            if (moneyX[i] < birdX+birdRadius+25 && moneyX[i] > birdX-birdRadius-25){
                if (Math.sqrt(Math.pow(birdX-moneyX[i],2)+Math.pow(birdY-moneyY[i],2)) <= birdRadius+25){
                    moneyX.splice(i,1);
                    moneyY.splice(i,1);
                    score += 1;
                }
            }
        }
    }

    //繪製金幣//
    function drawmoney(){
        ctx.beginPath();
        for (var i = 0; i < moneyY.length; i++){
            ctx.drawImage(money, moneyX[i]-25, moneyY[i]-25, 50, 50);
        }
        ctx.closePath();
    }

    //顯示分數//
    function showScore(){
        ctx.font = "25px Arial Black";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + score, 450, 100);
    }

    //開始//
    function start(){

        if (alive == true){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            bumpWall();
            bumpMoney();

            drawWall();
            drawmoney();
            drawBird();

            showScore();

            birdY -= dG;

            for (var i = 0; i < wallX.length; i++){
                wallX[i] -= dX;
            }

            for (var i = 0; i < moneyX.length; i++){
                moneyX[i] -= dX;
            }

            if (upPressed && alive){
                birdY += dY
            }

            if (birdY > height-birdRadius || birdY < birdRadius) {
                alive = false;
            }

            time += 1;

            if (time >= 100){
                time = 0
                getRandomMoney();
                getRandomBarrier();
                deleteBarrier();
                deleteMoney();
            }

            if(alive == false) {
                clearInterval();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("score").innerHTML = score;
                document.getElementById("scorelist").style.display = "block";
                startFluppyBird.innerHTML = "Try Again";
                startFluppyBird.style.display = "block";
                console.log("once");
            }
        }
    }

    //每十毫秒執行一次start//
    function timer(){
        setInterval(start, 10);
    }

    startFluppyBird.style.display = "none";
    document.getElementById("scorelist").style.display = "none";

    timer();
}
var startFluppyBird = document.getElementById("startButton");
startFluppyBird.addEventListener("click", play, false);