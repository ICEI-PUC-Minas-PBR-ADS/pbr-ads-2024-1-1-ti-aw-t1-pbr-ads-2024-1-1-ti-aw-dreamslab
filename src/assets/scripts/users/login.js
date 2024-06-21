import UsersController from "../app/controller/UsersController.js";
import FormValidator from "../app/lib/form/FormValidator.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "../empresa/home.html";
        return;
    }

    if(localStorage.getItem("userId") != null){
        window.location = "./home.html";
        return;
    }
})

$("#login-button").on("click", function(){
    const formValidator = new FormValidator(".login-form");
    if(formValidator.formIsValid() == false){
        return;
    }

    const dataToLogin = {
        email: $("#email").val(),
        password: $("#password").val(),
    }

    new UsersController().authenticateUser(dataToLogin).then((result)=>{
        if(result.status == false){
            $(".error-message").html(result.message);
            return;
        }
        console.log(result);
        if(result.hasBusiness == true){
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("isBusiness", true);
            window.location = "../empresa/home.html";
        }

        localStorage.setItem("userId", result.userId);
        window.location = "./home.html";
        return;
    });

    return;
});