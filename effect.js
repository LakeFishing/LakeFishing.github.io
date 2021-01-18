function play(){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

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

    const backgroundMusic = document.getElementById("backgroundMusic");
    const earn = document.getElementById("earn");
    const bomb = document.getElementById("bomb");

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
                    bomb.play();
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
                    earn.play();
                    score += 1;
                    totalMoney += 1;
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
        ctx.font = "30px Arial Black";
        ctx.fillStyle = "white";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "black";
        ctx.shadowBlur = 5;
        ctx.fillText("Score: " + score, 450, 100);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
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
                bomb.play();
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("score").innerHTML = "Score: " + score;

                if (recordList.length < 3){
                    recordList.push([myName, score]);
                }
                else{
                    var push = false;
                    for(var i = 0; i < recordList.length; i++){
                        if (score >= recordList[i][1]){
                            push = true;
                        }
                    }
                    if (push == true){
                        recordList.push([myName, score]);
                    }
                }

                if (recordList.length > 3){
                    var min = 0;
                    for(var i=0; i < recordList.length-1; i++){
                        if (recordList[min][1] < recordList[i+1][1]){
                            min = min;
                        }
                        else{
                            min = i+1;
                        }
                    }
                    recordList.splice(min, 1);
                    localStorage.setItem("recordList", JSON.stringify(recordList))
                }
                else{
                    localStorage.setItem("recordList", JSON.stringify(recordList));
                }
                startGame.innerHTML = "Retry";
                startGame.style.top = 356;
                startGame.style.left = 724;
                total.innerHTML = "Coins: " + totalMoney;
                startGame.style.display = "block";
                openShop.innerHTML = "Shop";
                openShop.style.cursor = "pointer";
                openShop.style.display = "block";
                openRecord.style.display = "block";
                blackGlass.setAttribute("class", "blur")
                document.getElementById("scorelist").style.display = "block";
                document.getElementById("gameover").style.display = "block";
                backgroundMusic.pause();
                clearInterval(timeid);
            }
        }
    }

    //每十毫秒執行一次start//
    function timer(){
        backgroundMusic.play();
        timeid = setInterval(start, 10);
    }

    function typeName(){
        blackGlass.setAttribute("class", "blur");
        startGame.style.top = 380;
        startGame.style.left = 693;
        setTimeout(wait, 10);
        nameReady = true;
    
        document.getElementById("form").style.display = "block";
    }

    startGame.style.display = "none";
    openShop.style.display = "none";
    blackGlass.removeAttribute("class")
    document.getElementById("scorelist").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("title").style.display ="none";
    document.getElementById("form").style.display = "none";
    document.getElementById("record").style.display = "none";
    openRule.style.display = "none";
    openShop.style.display = "none";
    openRecord.style.display = "none";

    if (nameReady == false){
        typeName();
    }
    else{
        myName = document.myform.myname.value;
        timer();
    }
}

function shop(){
    openRecord.style.display = "none";
    document.getElementById("shop").style.display = "block";
    document.getElementById("scorelist").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    openShop.style.cursor = "default";
    openShop.innerHTML = "Coins: " + totalMoney;

    blue.addEventListener("click", blueBird);
    red.addEventListener("click", redBird);
    yellow.addEventListener("click", yellowBird);

    function blueBird(){
        if (totalMoney >= 5 && blueSoldOut == false){
            totalMoney -= 5;
            blueSoldOut = true;
        }
        if (blueSoldOut == true){
            bird.src = "pictures\\01.png";
            blue.innerHTML = "Using";
            blue.setAttribute("class", "choosed");

            if (red.innerHTML == "Using"){
                red.innerHTML = "Select";
                red.removeAttribute("class");
            }
            else if (yellow.innerHTML == "Using"){
                yellow.innerHTML = "Select";
                yellow.removeAttribute("class");
            }
        }
        document.getElementById("shopButton").innerHTML = "Coins: " + totalMoney;
    }
    function redBird(){
        bird.src = "pictures\\02.png";
        red.innerHTML = "Using";
        red.setAttribute("class", "choosed");
        if (blue.innerHTML == "Using"){
            blue.innerHTML = "Select";
            blue.removeAttribute("class");
        }
        else if (yellow.innerHTML == "Using"){
            yellow.innerHTML = "Select";
            yellow.removeAttribute("class");
        }
    }
    function yellowBird(){
        if (totalMoney >= 15 && yellowSoldOut == false){
            totalMoney -= 15;
            yellowSoldOut = true;
        }
        if (yellowSoldOut == true){
            bird.src = "pictures\\03.png";
            yellow.innerHTML = "Using";
            yellow.setAttribute("class", "choosed");

            if (blue.innerHTML == "Using"){
                blue.innerHTML = "Select";
                blue.removeAttribute("class");
            }
            else if (red.innerHTML == "Using"){
                red.innerHTML = "Select";
                red.removeAttribute("class");
            }
        }
        openShop.innerHTML = "Coins: " + totalMoney;
    }
}

function rule(){
    blackGlass.setAttribute("class", "blur");
    startGame.style.display = "none";
    openRule.style.display = "none";
    document.getElementById("title").style.display = "none";
    startGame.style.top = 380;
    startGame.style.left = 693;
    setTimeout(wait, 10);

    document.getElementById("rules").style.display = "block";
}

function wait(){
    startGame.style.display = "block";
}

function record(){
    openShop.style.display = "none";
    openRecord.style.display = "none";
    document.getElementById("scorelist").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    var data = localStorage.getItem("recordList");
    var dataParse = JSON.parse(data);
    dataParse.sort(function(x, y){
        return y[1] - x[1];
    });
    document.getElementById("record1").innerHTML = "No.1: " + dataParse[0][0] + "   " + dataParse[0][1];
    document.getElementById("record2").innerHTML = "No.2: " + dataParse[1][0] + "   " + dataParse[1][1];
    document.getElementById("record3").innerHTML = "No.3: " + dataParse[2][0] + "   " + dataParse[2][1];
    document.getElementById("record").style.display = "block";
}



var bird = new Image();
bird.src = "pictures\\02.png";

var blue = document.getElementById("blue");
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var total = document.getElementById("total");
var startGame = document.getElementById("startButton");
var openRule = document.getElementById("ruleButton")
var openShop = document.getElementById("shopButton");
var openRecord = document.getElementById("recordButton");
var blackGlass = document.getElementById("glass");

var totalMoney = 0;
var blueSoldOut = false;
var yellowSoldOut = false;
var nameReady = false;
var recordList = JSON.parse(localStorage.getItem("recordList")) || [];
var timeid;

startGame.addEventListener("click", play);
openRule.addEventListener("click", rule);
openShop.addEventListener("click", shop);
openRecord.addEventListener("click", record);