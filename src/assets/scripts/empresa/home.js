import { getStatusTextByNumber, getPaymentTypeText, getDeliveryTypeText } from "../app/lib/Utility.js";
import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/+esm';
import BusinessController from "../app/controller/BusinessController.js";
import OrderController from "../app/controller/OrderController.js";

$(function () {
    if (localStorage.getItem("isBusiness") == null) {
        window.location = "../home.html";
        return;
    }

    if (localStorage.getItem("userId") == null) {
        window.location = "./login.html";
        return;
    }

    $(".links-right").append('<div class="logout-div"><h1 class="logout">Logout</h1></div>');
    $(".logout").on("click", function () {
        localStorage.clear();
        location.reload();
    });
    setOrders();
})

function setHomeData() {
    if (orders.length == 0) {
        $(".load").remove();
        return;
    }

    $(".content-down").html("");
    orders.forEach(function (order) {
        if(order.status == 1){
            return;
        }
        $(".content-down").append(
            `<div class="card" data-order-id="${order.id}">
                <div class="id">
                    <p id="idPedido">#${order.id}</p>
                </div>
                <div class="preco">
                <p>R$${order.totalValue}</p>
                <p>${order.date}</p>
                </div>
                <div class="detalhes" data-change="true" data-order-id="${order.id}"><button>Ver Detalhes</button></div>
            </div>`
        )
    });
    $(".load").remove();
}

let orders = []
function setOrders() {
    const ownerId = localStorage.getItem("userId");
    new BusinessController().getBusinessDataByOwnerId(Number(ownerId)).then(function (result) {
        $("#nomeUser").html(result.business_name);
        const businessId = result.id.toString();
        new OrderController().getOrdersByBusiness(businessId).then(function (result) {
            orders = result;
            if (result.length == 0) {
                $(".load").remove();
                return;
            }

            $(".pedidos").html("");
            result.forEach(async function (order) {
                if(order.status != 1){
                    return;
                }
                $(".pedidos").append(
                    `<div class="card" data-order-id="${order.id}">
                        <div class="id">
                            <p id="idPedido">#${order.id}</p>
                        </div>
                        <div class="preco">
                        <p>R$${order.totalValue}</p>
                        <p>${order.date}</p>
                        </div>
                        <p>Deseja Aceitar?</p>
                        <div class="opc">
                        <div class="sim" data-order-id="${order.id}"><button>
                            <p>Sim</p>
                            </button></div>
                        <div class="nao" data-order-id="${order.id}"><button>
                            <p>Não</p>
                            </button></div>
                        </div>
                        <div class="detalhes" data-change="false" data-order-id="${order.id}"><button>Ver Detalhes</button></div>
                    </div>`
                )
            });
            setHomeData();
            $(".load").remove();
        });
    });
    return;
}

$("body").on("click", ".detalhes", function () {
    $(".modal-content").css("display", "flex");
    $(".close-modal").css("display", "none");
    const orderId = $(this).data("order-id");
    const canChangeStatus = $(this).data("change");
    console.log(canChangeStatus)

    $(".loading-modal").animate({
        height: "+=97.5%",
        width: "+=98.7%",
    }, 200);

    $(".modal-order").animate({
        height: "+=70%",
        width: "+=50%",
    }, 200, function () {
        $(".close-modal").css("display", "block");
        setModalData(orderId, canChangeStatus);
    });
});

function setModalData(orderId, canChangeStatus = false) {
    $(".modal-error").hide();
    const orderData = orders.find(order => order.id == orderId);

    $("#id-order").html(orderData.id);
    const orderItens = JSON.parse(orderData.itens);
    $(".items").html("");
    orderItens.forEach(function (item) {
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
    $(".save-status").data("order-id", orderData.id);
    if (orderData.status == 0 || canChangeStatus != true) {
        $(".status-section").hide();
    }
    else{
        $(".status-section").show();
    }
    $(".cancel-order").data("order-id", orderData.id);
    $(".loading-modal").css("display", "none");
}

$(".close-modal").on("click", function () {
    $(".close-modal").css("display", "none");
    $(".product-modal").animate({
        height: "-=70%",
        width: "-=50%",
    }, 200, () => {
        $(".modal-content").css("display", "none");
    });
    $(".loading-modal").animate({
        height: "-=97.5%",
        width: "-=98.7%",
    }, 200, function () {
        $(".loading-modal").css("display", "flex");
        $(".order-status").removeClass().addClass("order-status");
        $(".modal-error").show();
    });
});

$("body").on("click", ".sim", function () {
    const orderId = Number($(this).data("order-id"));
    new sweetalert2({
        text: "Deseja aceitar pedido?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isConfirmed == false) {
            return;
        }

        new OrderController().acceptDelivery(orderId).then(function (result) {
            if (result == false) {
                new sweetalert2({
                    text: "Erro ao aceitar pedido!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                });
                return;
            }

            new sweetalert2({
                text: "Pedido aceito!",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Ok",
            }).then(function () {
                location.reload();
            });
        })
    });
});

$("body").on("click", ".nao", function () {
    const orderId = Number($(this).data("order-id"));
    new sweetalert2({
        text: "Deseja recusar o pedido?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isConfirmed == false) {
            return;
        }

        new OrderController().cancelDelivery(orderId).then(function (result) {
            if (result == false) {
                new sweetalert2({
                    text: "Erro ao recusar pedido!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                });
                return;
            }

            new sweetalert2({
                text: "Pedido recusado!",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Ok",
            }).then(function () {
                location.reload();
            });
        })
    });
})

$(".save-status").on("click", function(){
    const selectValue = $("#new-status").val();
    const orderId = $(".save-status").data("order-id");
    console.log(orderId)

    if(selectValue == ""){
        new sweetalert2({
            text: "Selecione um status para atualizar!",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
        });
        return;
    }

    new OrderController().updateStatusDelivery(orderId, selectValue).then(function (result) {
        if (result == false) {
            new sweetalert2({
                text: "Erro ao atualizar o status do pedido!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Ok",
            });
            return;
        }

        new sweetalert2({
            text: "Status atualizado!",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Ok",
        }).then(function () {
            location.reload();
        });
    })
})