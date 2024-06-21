import UsersController from "../app/controller/UsersController.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "../empresa/home.html";
        return;
    }

    if(localStorage.getItem("userId") == null){
        window.location = "./login.html";
        return;
    }

    $(".links-right").append('<div class="logout-div"><h1 class="logout">Logout</h1></div>');
    $(".logout").on("click", function(){
        console.log("teste")
        localStorage.clear();
        location.reload();
    })
    setProductsData();
})

function setProductsData(){
    $(".load").remove();
}

$(".cart-icon").on("click", function(){
    $(".cart-content").css("display", "flex");
    $(".sidebar").animate({
        right: "+=400"
    }, 200);   
})

$(".close-cart").on("click", function(){
    $(".sidebar").animate({
        right: "-=400"
    }, 200, ()=>{
        $(".cart-content").css("display", "none");
    });
});