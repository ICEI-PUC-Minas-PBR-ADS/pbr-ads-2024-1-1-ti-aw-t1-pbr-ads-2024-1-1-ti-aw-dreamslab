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

    setHomeData();
})

function setHomeData(){
    $(".load").remove();
    new BusinessController().getBusinessDataByOwnerId(result.userId).then((businessData)=>{
    console.log(businessData);
})
}
