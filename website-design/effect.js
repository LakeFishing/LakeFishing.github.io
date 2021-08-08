let btn = document.querySelector("#btn");
let sideBar = document.querySelector(".sideBar");

btn.onclick = function(){
    sideBar.classList.toggle("active");
    if(btn.classList.contains("fa-bars")){
        btn.classList.replace("fa-bars" , "fa-times");
      }else{
        btn.classList.replace("fa-times", "fa-bars");
    }
}

let r1_btn = document.getElementsByClassName("r1_btn");
var lastClick = r1_btn[0];

for (var i = 0; i < r1_btn.length; i++){
  r1_btn[i].onclick = function(){
    lastClick.classList.remove("selected");
    this.classList.add("selected");
    lastClick = this;
  }
}

let page1 = document.getElementById("page1");
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let page4 = document.getElementById("page4");
let page5 = document.getElementById("page5");
let page6 = document.getElementById("page6");

let page1Btn = document.getElementById("page1Btn");
let page2Btn = document.getElementById("page2Btn");
let page3Btn = document.getElementById("page3Btn");
let page4Btn = document.getElementById("page4Btn");
let page5Btn = document.getElementById("page5Btn");
let page6Btn = document.getElementById("page6Btn");
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