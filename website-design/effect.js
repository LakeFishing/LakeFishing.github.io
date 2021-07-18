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