let btn = document.querySelector("#btn");
let sideBar = document.querySelector(".sideBar");
let r1_btn = document.getElementsByClassName("r1_btn");
var lastClick = r1_btn[0];

btn.onclick = function(){
    sideBar.classList.toggle("active");
    if(btn.classList.contains("fa-bars")){
        btn.classList.replace("fa-bars" , "fa-times");
      }else{
        btn.classList.replace("fa-times", "fa-bars");
    }
}

for (var i = 0; i < r1_btn.length; i++){
  r1_btn[i].onclick = function(){
    lastClick.classList.remove("selected");
    this.classList.add("selected");
    lastClick = this;
  }
}