import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/+esm';
import OrderController from "../app/controller/OrderController.js";

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
    setOrderData();
})

function setOrderData(){
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    if(cart == null || cart.length == 0){
        window.location = "home.html";
    }

    let finalValue = 0;
    $(".itens-list").html("");
    cart.forEach(item => {
        finalValue += Number(item.price);
        $(".itens-list").append(
            `<div class="product">
              <div>
                <p>${item.name}</p>
                <p>R$${item.price}</p>
              </div>
              <h1>${item.qntity}x</h1>
            </div>`);
    });

    $(".final-value").html("R$" + finalValue);
    $(".load").remove();
}

$(".payment-type").on("click", function(){
    $(".payment-type").each(function(){
        $(this).removeClass("active");
    })
    $(this).addClass("active")
})

$(".delivery-type").on("click", function(){
    $(".delivery-type").each(function(){
        $(this).removeClass("active");
    })

    $(this).addClass("active")  
});

$("#confirm-order").on("click", function(){
    const selectedPayment = $(".payment-types").find(".active"); 
    if(selectedPayment.length == 0){
        return showModal("Selecione uma forma de pagamento!", "error");
    }

    const selectedDelivery = $(".delivery-types").find(".active"); 
    if(selectedDelivery.length == 0){
        return showModal("Selecione uma forma de entrega!", "error");
    }

    const cartData = JSON.parse(localStorage.getItem("cart"));
    let totalValue = 0;
    cartData.forEach(function(item){
        totalValue += Number(item.price);
    });
    
    const orderData = {
        "id" : "",
        "time": new Date().toLocaleTimeString(),
        "date": new Date().toLocaleDateString(),
        "totalValue": totalValue,
        "payment_type": selectedPayment.data("type"),
        "delivery_type": selectedDelivery.data("type"),
        "status": "1",
        "store_id": "",
        "userId": Number(localStorage.getItem("userId")),
    };

    new OrderController().createOrder(orderData, cartData).then(function(result){
        if(result == false){
            showModal("Erro ao cadastrar pedido!", "error");
            return;
        }

        showModal("Pedido cadastrado com sucesso! Acompanhe seus pedidos na sua tela de perfil!", "success").then(function(){
            window.location.href = "perfil.html"
        });
    });
});

function showModal(message, icon){
    return new sweetalert2({
        text: message,
        icon: icon,
        confirmButtonText: "Ok"
    });
}