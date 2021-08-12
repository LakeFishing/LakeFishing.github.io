let btn = document.querySelector("#btn");
let sideBar = document.querySelector(".side");
btn.onclick = function(){
    sideBar.classList.toggle("active");
    if(btn.classList.contains("fa-bars")){
        btn.classList.replace("fa-bars" , "fa-times");
      }else{
        btn.classList.replace("fa-times", "fa-bars");
    }
}

function copyAddress(id){
  var address = document.getElementById(id);
  address.style.userSelect = "auto";
  window.getSelection().selectAllChildren(address);
  document.execCommand("Copy");
  address.style.userSelect = "none";
}


let r1_btn = document.getElementsByClassName("r1-btn");
var lastClick = r1_btn[0];
for (var i = 0; i < r1_btn.length; i++){
  r1_btn[i].onclick = function(){
    lastClick.classList.remove("selected");
    this.classList.add("selected");
    lastClick = this;
  }
}

let natureImage = document.getElementsByClassName("nature-text");
for(var i = 0; i < natureImage.length; i++){
  natureImage[i].onclick = function(){
    this.classList.toggle("nature-active");
  }
}

let page1 = document.getElementById("home");
let page2 = document.getElementById("location");
let page3 = document.getElementById("history");
let page4 = document.getElementById("structure");
let page5 = document.getElementById("nature");
let page6 = document.getElementById("team");

let page1Btn = document.getElementById("home-btn");
let page2Btn = document.getElementById("location-btn");
let page3Btn = document.getElementById("history-btn");
let page4Btn = document.getElementById("structure-btn");
let page5Btn = document.getElementById("nature-btn");
let page6Btn = document.getElementById("team-btn");
var currentPage = page1Btn;

if(document.documentElement.scrollTop + screen.height / 2 < page2.offsetTop){
  currentPage.classList.add("current");
}

function locateCurrent(){
  var distanceToTop = document.documentElement.scrollTop + screen.height / 2;

  if(currentPage != null){
    currentPage.classList.remove("current");
  }

  if(distanceToTop < page2.offsetTop){
    currentPage = page1Btn;
  }
  else if(distanceToTop < page3.offsetTop){
    currentPage = page2Btn;
  }
  else if(distanceToTop < page4.offsetTop){
    currentPage = page3Btn;
  }
  else if(distanceToTop < page5.offsetTop){
    currentPage = page4Btn;
  }
  else if(distanceToTop < page6.offsetTop){
    currentPage = page5Btn;
  }
  else{
    currentPage = page6Btn;
  }

  currentPage.classList.add("current");
}

window.addEventListener("scroll", locateCurrent);