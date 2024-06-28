import { getOnlyNumbers, getStatusTextByNumber, getPaymentTypeText, getDeliveryTypeText } from "../app/lib/Utility.js";
import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/+esm';
import BusinessController from "../app/controller/BusinessController.js";
import AddressController from "../app/controller/AddressController.js";
import UsersController from "../app/controller/UsersController.js";
import OrderController from "../app/controller/OrderController.js";
import FormValidator from "../app/lib/form/FormValidator.js"; 

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
    setOrders();
})

let hasAddress = false;
let addressId = "";
function setUserData(){
    new UsersController().getUserById().then((result)=>{
        $("#nomeUser").html(result.name + "!")
        fillInputsUser(result);
    });

    new AddressController().getUserAddress().then((address)=>{
        if(address.length == 0){
            $(".erro-endereco").html("Você deve salvar um endereço para realizar pedidos!");
            return;
        }
        fillAddressInputs(address);
    });
}

let orders = []
function setOrders(){
    new OrderController().getOrdersByUserId().then(function(result){
        orders = result;
        if(result.length == 0){
            $(".load").remove();    
            return;
        }

        $(".popular-orders").html("");

        result.forEach(async function(order){
            await new BusinessController().getBusinessById(Number(order.store_id)).then(function(result){ 
                const status = getStatusTextByNumber(order.status);
                $(".popular-orders").append(
                    `<div class="card" data-order-id="${order.id}">
                        <img src="./assets/images/site/bolo.svg" alt="product" style="width: 100%;">
                            <div class="card-content">
                                    <div class="NomeP">
                                        ${result.business_name}
                                    </div>
                                    <div class="info">
                                        <p class="preco">R$${order.totalValue}</p>
                                        <p class="data">${order.date}</p>
                                    </div>
        
                                    <div class="status">
                                        <p>Status:</p>
                                        <p class="${status.class}">${status.status}</p>
                                    </div>
                                    <br>
                                    <p id="idPedido">#${order.id}</p>
                                </div>
                            </div>`
                );
                $(".load").remove();
            });
        });
    });
}

$("body").on("click", ".card", function(){
    $(".modal-content").css("display", "flex");
    $(".close-modal").css("display", "none");
    const orderId = $(this).data("order-id");

    $(".loading-modal").animate({
        height: "+=97.5%",
        width: "+=98.7%",
    }, 200);

    $(".product-modal").animate({
        height: "+=70%",
        width: "+=50%",
    }, 200, function(){
        $(".close-modal").css("display", "block");
        setModalData(orderId);   
    });
});

function setModalData(orderId){
    $(".modal-error").hide();
    const orderData = orders.find(order => order.id == orderId);
    
    $("#id-order").html(orderData.id);
    const orderItens = JSON.parse(orderData.itens);
    $(".items").html("");
    orderItens.forEach(function(item){
        $(".items").append(
            `<div class="item">
            <div>
            <p>${item.name}</p>
            <p>R$${item.price}</p>
            </div>
            <h2>${item.qntity}x</h2>
            </div>`
        )
    });
    $(".total").html("R$" + orderData.totalValue);
    $(".date").html(orderData.data);
    $(".time").html(orderData.time);
    $(".delivery-type").html(getDeliveryTypeText(orderData.delivery_type));
    $(".payment-type").html(getPaymentTypeText(orderData.payment_type));
    $(".order-status").html(getStatusTextByNumber(orderData.status).status);
    $(".order-status").addClass(getStatusTextByNumber(orderData.status).class);
    $(".confirm-order").data("order-id", orderData.id);
    if(orderData.status == 0 || orderData.status == 5){
        $(".confirm-order").hide();
        $(".cancel-order").hide();
    }
    else{
        $(".confirm-order").show();
    }
    if(orderData.status > 2){
        $(".cancel-order").hide();
    }else{
        $(".cancel-order").show();
    }
    $(".cancel-order").data("order-id", orderData.id);
    $(".loading-modal").css("display", "none");
}

$(".close-modal").on("click", function(){
    $(".close-modal").css("display", "none");
    $(".product-modal").animate({
        height: "-=70%",
        width: "-=50%",
    }, 200, ()=>{
        $(".modal-content").css("display", "none");
    });
    $(".loading-modal").animate({
        height: "-=97.5%",
        width: "-=98.7%",
    }, 200, function(){
        $(".loading-modal").css("display", "flex");
        $(".order-status").removeClass().addClass("order-status");
        $(".modal-error").show();
    });
});

$("body").on("click", ".confirm-order", function(){
    const orderId = Number($(this).data("order-id"));
    new sweetalert2({
        text: "Deseja confirmar o recebimento do pedido?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isDenied) {
            return;
        }

        new OrderController().confirmDelivery(orderId).then(function(result){
            if(result == false){
                new sweetalert2({
                    text: "Erro ao confirmar pedido!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                });
                return;
            }

            new sweetalert2({
                text: "Pedido concluido!",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Ok",
            }).then(function(){
                location.reload();
            });
        })
    });
});

$("body").on("click", ".cancel-order", function(){
    const orderId = Number($(this).data("order-id"));
    new sweetalert2({
        text: "Deseja cancelar o recebimento do pedido?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isDenied) {
            return;
        }

        new OrderController().cancelDelivery(orderId).then(function(result){
            if(result == false){
                new sweetalert2({
                    text: "Erro ao cancelar pedido!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                });
                return;
            }

            new sweetalert2({
                text: "Pedido cancelado!",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Ok",
            }).then(function(){
                location.reload();
            });
        })
    });
})

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