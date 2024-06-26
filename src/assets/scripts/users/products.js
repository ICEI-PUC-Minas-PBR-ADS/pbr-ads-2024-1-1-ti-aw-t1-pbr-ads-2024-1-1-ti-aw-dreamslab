import UsersController from "../app/controller/UsersController.js";
import ProductController from "../app/controller/ProductController.js";

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
        console.log("teste")
        localStorage.clear();
        location.reload();
    })
    setProductsData();
    setCart();
})

function setProductsData(){
    $(".load").remove();
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


$(".card").on("click", function(){
    $(".modal-content").css("display", "flex");
    $(".close-modal").css("display", "none");

    $(".loading-modal").animate({
        height: "+=68%",
        width: "+=49%",
    }, 200);

    $(".product-modal").animate({
        height: "+=70%",
        width: "+=50%",
    }, 200, function(){
        $(".close-modal").css("display", "block");
        setModalData($(this).data("product-id"))   
    });
});

$(".close-modal").on("click", function(){
    $(".close-modal").css("display", "none");
    $(".product-modal").animate({
        height: "-=70%",
        width: "-=50%",
    }, 200, ()=>{
        $(".modal-content").css("display", "none");
    });
    $(".loading-modal").animate({
        height: "-=68%",
        width: "-=49%",
    }, 200, function(){
        $(".loading-modal").css("display", "flex");
    });
});

function setModalData(productId){
    $(".modal-error").remove();
    new ProductController().getProductById(productId).then((result)=>{
        if(result.status == false){
            $(".loading-modal").append("<div class='modal-error'><br/><h1>Erro ao carregar dados do produto!</h1></div>");
            return;
        }
        const product = result.product;
        $("#modal-image").attr("src", product.img_path);
        $("#modal-title").html(product.name);
        $("#modal-price").html("R$" + product.price);
        $("#modal-delivery").html(product.delivery_time),
        $("#modal-frete").html("R$" + product.delivery_tax);
        $(".modal-description").html(product.description);
        $(".loading-modal").css("display", "none");

        $(".add-to-cart").on("click", function(){
            addProductOnCart(product);
            setCart();
        })
    });
}

function addProductOnCart(product){
    const cartItens = JSON.parse(localStorage.getItem("cart"));

    let positionToAdd = 0;
    if(cartItens.length != 0){
        positionToAdd = cartItens.length;   
    }

    const cartItem = cartItens.find(item => item.item_id === product.id);
    if(cartItem){
        cartItem.qntity++;
        localStorage.setItem("cart", JSON.stringify(cartItens));
        $(".add-to-cart").html("Produto Adicionado ao carrinho!");
        setTimeout(function(){
            $(".add-to-cart").html("Adicionar ao Carrinho");
        }, 1000);
        return;
    }

    cartItens[positionToAdd] = {
        item_id: product.id,
        name: product.name,
        price: product.price,
        qntity: 1,
    }

    localStorage.setItem("cart", JSON.stringify(cartItens));
    $(".add-to-cart").html("Produto Adicionado ao carrinho!");
    setTimeout(function(){
        $(".add-to-cart").html("Adicionar ao Carrinho");
    }, 1000);
}

function setCart(){
    let cartItens = JSON.parse(localStorage.getItem("cart"));
    if(cartItens == null){
        localStorage.setItem("cart", JSON.stringify([]));
        cartItens = JSON.parse(localStorage.getItem("cart"));
    }

    if(cartItens.length == 0){
        $(".sidebar-footer").hide();
        $(".itens-on-cart").html('<div class="no-item">' +
            '<h2 style="width: 100%; text-align: center;">Nenhum item foi adicionado ao carrinho ainda!</h2>' +
        '</div>'
        )
        return;
    }

    let totalValue = 0;
    $(".sidebar-footer").show();
    $(".itens-on-cart").html("");
    cartItens.forEach(function(eachItem){
        totalValue += eachItem.price * eachItem.qntity;
        $(".itens-on-cart").append('<div class="cart-item item-'+ eachItem.item_id +'">' +
                        '<div class="cart-item-title">' +
                            '<h1>'+ eachItem.name +'</h1>' +
                            '<h1>'+ eachItem.price +'</h1>' +
                        '</div>' +
                        '<div class="cart-item-actions">' +
                            '<h2 class="item-quantity">'+eachItem.qntity+'x</h2>' +
                            '<div class="cart-actions">' +
                                '<button class="remove" data-product-id="'+eachItem.item_id+'">-</button>' +
                                '<button class="add" data-product-id="'+eachItem.item_id+'">+</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
    });

    $(".remove").on("click", function(){
        const cartItens = JSON.parse(localStorage.getItem("cart"));
        const itemId = $(this).data("product-id");
        cartItens.forEach((item, key)=>{
            if(item.item_id != itemId){
                return;                
            }

            if(cartItens[key].qntity - 1 == 0){
                cartItens.splice(key, 1);
                return;
            }
            cartItens[key].qntity--;
        })
        localStorage.setItem("cart", JSON.stringify(cartItens));
        setCart();
    })

    $(".add").on("click", function(){
        const cartItens = JSON.parse(localStorage.getItem("cart"));
        const itemId = $(this).data("product-id");
        cartItens.forEach((item, key)=>{
            if(item.item_id != itemId){
                return;                
            }
            cartItens[key].qntity++;
        })
        localStorage.setItem("cart", JSON.stringify(cartItens));
        setCart();
    })

    $(".cart-value").html("R$" + totalValue.toFixed(2));
}