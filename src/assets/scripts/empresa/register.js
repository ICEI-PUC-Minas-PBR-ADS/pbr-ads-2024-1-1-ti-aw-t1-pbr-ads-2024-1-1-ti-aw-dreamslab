import { getOnlyNumbers } from "../app/lib/Utility.js";

import FormValidator from "../app/lib/form/FormValidator.js";
import UsersController from "../app/controller/UsersController.js";
import BusinessController from "../app/controller/BusinessController.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "home.html";
    }

    if(localStorage.getItem("userId") != null){
        window.location = "../home.html";
    }
})

let cepIsValid = false;
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

    if(cepIsValid == false){
        $(".error-message").html("CEP inválido digitado!");
        $("#password").addClass("input-error");
        $("#password").on("click", function(){
            $(this).removeClass("input-error")
        })
        return;
    }

    const userData = {
        "id": "",
        "name": $("#name").val(),
        "email": $("#email").val(),
        "phone": $("#enterprise-phone").val(),
        "password": $("#password").val(),
        "hasBusiness": true
    }

    new UsersController().createUser(userData).then((response)=>{
        if(response.hasCreated == false){
            $(".error-message").html('Não foi possível criar a conta! Tente novamente mais tarde!');
            return;
        }

        const userId = response.userId;
        const businessData = {
            "id": "",
            "owner_id": userId,
            "business_name": $("#enterprise-name").val(),
            "business_email": $("#enterprise-mail").val(),
            "business_phone": $("#enterprise-phone").val(),
            "business_cnpj": userId,
            "address": {
                "cep": $("#cep").val(),
                "estate": $("#estate").val(),
                "city": $("#city").val(),
                "location": $("#address").val()
            }
        }
        console.log(businessData);

        new BusinessController().createBusiness(businessData).then((businessResponse)=>{
            if(businessResponse.hasCreated == false){
                $(".error-message").html('Erro ao cadastrar a empresa!');
                return;
            }

            const businessId = businessResponse.businessId;
            localStorage.setItem("userId", userId);
            localStorage.setItem("isBusiness", true);
            window.location = "home.html"
        });

        return;
    });
});


$("#cep").on("change", function(){    
    let inputValue = getOnlyNumbers($("#cep").val());
    $("#cep").val(inputValue);
    $.get("https://viacep.com.br/ws/"+ inputValue +"/json/", function(data){
        $("#estate").val(data.uf);
        $("#city").val(data.localidade);
        $("#address").val(data.bairro + ", " + data.logradouro + ", [digite o número]");
        cepIsValid = true;
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
