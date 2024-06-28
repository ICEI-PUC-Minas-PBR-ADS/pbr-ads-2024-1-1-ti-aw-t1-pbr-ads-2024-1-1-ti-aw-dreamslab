import BusinessController from "../app/controller/BusinessController.js";
import ProductController from "../app/controller/ProductController.js";
import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/+esm';
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
    })
    setProducts();
})

function setProducts(){
    const ownerId = Number(localStorage.getItem("userId"));
    new BusinessController().getBusinessDataByOwnerId(ownerId).then(function(result){
        return getStoreItems(result.id);
    })
}

function getStoreItems(storeId){
    new ProductController().getProductsByBusinessId(storeId).then(function(result){
        if(result.length == 0){
            $(".load").remove();
            return;
        }

        $(".produtos").html("");
        result.forEach(element => {
            $(".produtos").append(`<div class="item" data-row-id="${element.id}">` +
                `<p class="name">${element.name}</p>` +
                `<p class="qnt">${element.quantity}</p>` +
                `<p class="price">${element.price}</p>` +
                `<p class="act">` +
                    `<img class="icon edit" src="../assets/images/site/editar.png" alt="editar" data-product-id="${element.id}">` +
                    `<img class="icon delete" src="../assets/images/site/excluir.png" alt="editar" data-product-id="${element.id}">` +
                `</p>` +
            `</div>`)
        });

        $(".delete").on("click", function(){
            const productId = $(this).data("product-id");
            const productName = $("div[data-row-id="+ productId +"]").find(".name").html();
            deleteProduct(productId, productName);
        });

        $(".edit").on("click", function(){
            const productId = $(this).data("product-id");
            localStorage.setItem("itemToEdit", productId);
            window.location = "./alterar-produto.html";
        });
        
        $(".load").remove();
    })
}

function deleteProduct(productId, productName){
    new sweetalert2({
        text: "Deseja apagar o produto: " + productName,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isDenied) {
            return;
        }

        new ProductController().deleteProduct(productId).then(function(result){
            return showResultAlert(result);
        })
    });
}

function showResultAlert(status){
    const icon = status == true ? "success" : "error";
    const text = status == true ? "Produto apagado com sucesso!" : "Erro ao apagar o produto!";

    new sweetalert2({
        text: text,
        icon: icon,
        confirmButtonText: "Ok",
        closeOnConfirm: true,
    }).then(function(){
        if(status == true){
            window.location.reload();
        }
    })

    
}