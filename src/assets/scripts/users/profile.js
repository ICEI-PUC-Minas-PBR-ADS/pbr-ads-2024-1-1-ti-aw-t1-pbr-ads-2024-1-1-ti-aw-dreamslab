import AddressController from "../app/controller/AddressController.js";
import UsersController from "../app/controller/UsersController.js";
import FormValidator from "../app/lib/form/FormValidator.js"; 
import { getOnlyNumbers } from "../app/lib/Utility.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "../src/empresa/home.html";
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
    })
    setUserData();
})

let hasAddress = false;
let addressId = "";
function setUserData(){
    new UsersController().getUserById().then((result)=>{
        $("#nomeUser").html(result.name + "!")
        fillInputsUser(result);
        $(".load").remove();
    });

    new AddressController().getUserAddress().then((address)=>{
        if(address.length == 0){
            $(".erro-endereco").html("Você deve salvar um endereço para realizar pedidos!");
            return;
        }
        fillAddressInputs(address);
    });
}

let cepIsValid = false;
$("#save-address").on("click", function(){
    $(".erro-profile").css("display", "none");
    $(".erro-endereco").css("display", "block");
    resetError();
    const formValidator = new FormValidator(".dadosE");
    if(formValidator.formIsValid() == false){
        return;
    }

    if(cepIsValid == false && hasAddress != true){
        $(".erro-endereco").html("CEP inválido digitado!");
        return;
    }

    const dataAddress = {
        "id": addressId,
        "user_id": Number(localStorage.getItem("userId")),
        "cep": $(".cep").val(),
        "estate": $(".estate").val(),
        "city": $(".city").val(),
        "complement": $(".complement").val(),
        "address": $(".address").val(),
        "number": Number($(".address-number").val())
    }

    if(hasAddress == true){
        updateAddress(dataAddress);
        return;
    }

    new AddressController().saveAddress(dataAddress).then((result)=>{
        if(result.hasCreated == false){
            $(".erro-endereco").html("Erro ao registrar o endereço!");
            return;
        }

        $(".erro-endereco").html("Endereço cadastrado com sucesso!");
        $(".erro-endereco").css("color", "green");
        setTimeout(()=>{
            $(".erro-endereco").css("display", "none");
            $(".erro-endereco").css("color", "");
        }, 2000);
        hasAddress = true;
        return;
    });
});

function updateAddress(addressData){
    new AddressController().updateAddress(addressData).then((result)=>{
        if(result.hasUpdated == false){
            $(".erro-endereco").html("Erro ao atualizar o endereço!");
            return;
        }

        $(".erro-endereco").html("Endereço atualizado com sucesso!");
        $(".erro-endereco").css("color", "green");
        setTimeout(()=>{
            $(".erro-endereco").html("");
            $(".erro-endereco").css("color", "");
        }, 2000);
        hasAddress = true;
        return;
    });
}

$("#save-profile-data").on("click", function(){
    $(".erro-endereco").css("display", "none");
    $(".erro-profile").css("display", "block");
    resetError();
    const formValidator = new FormValidator(".dadosP");
    if(formValidator.formIsValid() == false){
        
        return;
    }

    if($("#new-password").val() != $("#confirm-new-password").val()){
        setErrorPasswords();
        return;
    }

    const userData = {
        "name": $("#nomeInfo").val(),
        "email": $("#emailInfo").val(),
        "phone": $("#telInfo").val(),
    }

    if($("#new-password").val().trim() !== ""){
        userData.password = $("#new-password").val();
    }

    const typedPass = $("#senhaInfo").val();

    new UsersController().updateUser(userData, typedPass).then((result)=>{
        resetPassInputs();
        if(result.hasUpdated == false){
            $(".erro-profile").html(result.message);
            return;
        }

        $(".erro-profile").html(result.message);
        $(".erro-profile").css("color", "green");
        setTimeout(()=>{
            $(".erro-profile").css("display", "none");
            $(".erro-profile").css("color", "");
        }, 2000);
        hasAddress = true;
        return;
    });
})

function resetPassInputs(){
    $("#new-password").val("");
    $("#new-password-confirm").val("");
    $("#senhaInfo").val("");
}
        

$(".cep").on("change", function(){    
    let inputValue = getOnlyNumbers($(".cep").val());
    $(".cep").val(inputValue);
    $.get("https://viacep.com.br/ws/"+ inputValue +"/json/", function(data){
        $(".estate").val(data.uf);
        $(".city").val(data.localidade);
        $(".address").val(data.bairro + ", " + data.logradouro);
        cepIsValid = true;
    });
});

function resetError(){
    $(".error-message").html("");
}

function setErrorPasswords(){
    $("#new-password").addClass("input-error");
    $("#new-password").on("click", function(){
        $(this).removeClass("input-error")
    })
    $("#confirm-new-password").addClass("input-error");
    $("#confirm-new-password").on("click", function(){
        $(this).removeClass("input-error")
    })
    $(".erro-profile").html("As senhas digitadas não coincidem!");
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

function fillInputsUser(userData){
    $("#nomeInfo").val(userData.name);
    $("#emailInfo").val(userData.email);
    $("#telInfo").val(userData.phone);
}

function fillAddressInputs(address){
    addressId = address.id;
    $(".cep").val(address.cep);
    $(".estate").val(address.estate);
    $(".city").val(address.city);
    $(".complement").val(address.complement);
    $(".address").val(address.address);
    $(".address-number").val(address.number);
    hasAddress = true;
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