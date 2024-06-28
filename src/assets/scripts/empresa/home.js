import BusinessController from "../app/controller/BusinessController.js";

$(function(){
    if(localStorage.getItem("isBusiness") == null){
        window.location = "../home.html";
        return;
    }

    if(localStorage.getItem("userId") == null){
        window.location = "./login.html";
        return;
    }

    $(".links-right").append('<div class="logout-div"><h1 class="logout">Logout</h1></div>');
    $(".logout").on("click", function(){
        localStorage.clear();
        location.reload();
    });
    setHomeData();
})

function setHomeData(){
    $(".load").remove();
    // const userId = localStorage.getItem("userId");
    //     new BusinessController().getBusinessDataByOwnerId(userId).then((businessData)=>{
    //     console.log(businessData);
    // })
}


// $(function(){
//     if(localStorage.getItem("isBusiness") != null){
//         window.location = "../src/empresa/home.html";
//         return;
//     }

//     if(localStorage.getItem("userId") == null){
//         window.location = "./login.html";
//         return;
//     }
    
//     $(".links-right").append('<div class="logout-div"><h1 class="logout">Logout</h1></div>');
//     $(".logout").on("click", function(){
//         console.log("teste")
//         localStorage.clear();
//         location.reload();
//     })
//     setHomeData();
//     setCart();
// })
