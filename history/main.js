var btn = document.getElementsByClassName("btn");
var newsPages = document.getElementsByClassName("news-pages");
var topBar = document.getElementsByClassName("top-bar");
var topBarItem = document.getElementsByClassName("top-bar-item");
var newsPageNow = 0;

function toPageOne(){
    newsPages[0].style.marginLeft = "0%";
    newsPageNow = 0;
}
function toPageTwo(){
    newsPages[0].style.marginLeft = "-100%";
    newsPageNow = 1
}
function toPageTrd(){
    newsPages[0].style.marginLeft = "-200%";
    newsPageNow = 2
}

window.onscroll = function(){
    if(document.documentElement.scrollTop >= 64){
        topBar[0].style.background = "white";
        for (var i = 0; i < topBarItem.length; i++){
            topBarItem[i].style.color = "black";
            topBarItem[i].style.transition = "0.3s ease-in";
        }
    }
    else{
        topBar[0].style.background = "transparent";
        for (var i = 0; i < topBarItem.length; i++){
            topBarItem[i].style.color = "white";
            topBarItem[i].style.transition = "none";
        }
    }
}

