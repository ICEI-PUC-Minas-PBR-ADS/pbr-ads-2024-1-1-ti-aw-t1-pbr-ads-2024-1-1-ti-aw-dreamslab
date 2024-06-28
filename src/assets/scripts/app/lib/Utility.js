export function getOnlyNumbers(value){
    return value.replace(/\D/g, "");
}

export function getStatusTextByNumber(number){
    const statusText = {
        0: {status: "Cancelado", class: "canceled"},
        1: {status: "Pendente", class: "pending"},
        2: {status: "Aceito", class: "accepted"},
        3: {status: "Em preparo", class: "in_prepare"},
        4: {status: "Em entrega", class: "in_delivery"},
        4.5: {status: "Pronto para buscar", class: "ready_to_take"},
        5: {status: "Concluído", class: "finished"}
    };

if(typeof statusText[number] === 'undefined'){
        return "Invalido";
    }

    return statusText[number];
}

export function getPaymentTypeText(payment){
    const paymentText = {
        "pix": "Pix",
        "card": "Cartão",
        "money": "Dinheiro"
    };

    if(typeof paymentText[payment] === 'undefined'){
        return "Invalido";
    }

    return paymentText[payment];
}

export function getDeliveryTypeText(delivery){
    const deliveryText = {
        "delivery": "Entrega",
        "in_place": "Buscar Pedido",
        "combined": "Entrega à combinar"
    };

    if(typeof deliveryText[delivery] === 'undefined'){
        return "Invalido";
    }

    return deliveryText[delivery];
}