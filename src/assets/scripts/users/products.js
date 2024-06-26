import UsersController from "../app/controller/UsersController.js";
import ProductController from "../app/controller/ProductController.js";

$(function(){
    if(localStorage.getItem("isBusiness") != null){
        window.location = "../empresa/home.html";
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
        })
    });
}

function addProductOnCart(product){

}
