import FormValidator from "../app/lib/form/FormValidator.js";
import UsersController from "../app/controller/UsersController.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "../src/empresa/home.html";
        return;
    }

    if(localStorage.getItem("userId") != null){
        window.location = "./home.html";
        return;
    }
})

$("#register-button").on("click", function(){
    resetError();
    const formValidator = new FormValidator(".register-form");
    if(formValidator.formIsValid() == false){
        return;
    }

    const passwordConfirmIsValid = $("#password").val() == $("#confirm-password").val();
    if(passwordConfirmIsValid == false){
        setErrorPasswords();
        return;
    }

    const userData = {
        "id": "",
        "name": $("#name").val(),
        "email": $("#mail").val(),
        "phone": $("#phone").val(),
        "password": $("#password").val(),
    }

    new UsersController().createUser(userData).then((response)=>{
        if(response.hasCreated == true){
            localStorage.setItem("userId", response.userId);
            window.location = "./home.html";
            return;
        }

        $(".error-message").html('Não foi possível criar a conta! Tente novamente mais tarde!');
    });

});

function resetError(){
    $(".error-message").html("");
}

function setErrorPasswords(){
    $("#confirm-password").addClass("input-error");
    $("#confirm-password").on("click", function(){
        $(this).removeClass("input-error")
    })
    $("#password").addClass("input-error");
    $("#password").on("click", function(){
        $(this).removeClass("input-error")
    })
    $(".error-message").html("As senhas digitadas não coincidem!");
}

$("input[type=phone]").on("input", function(){
    const phoneValue = $(this).val();
    $(this).val(phoneMask(phoneValue));
})

function phoneMask (phone) {
    return phone.replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/^(\(\d{2})(\d)/, '$1)$2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
}
