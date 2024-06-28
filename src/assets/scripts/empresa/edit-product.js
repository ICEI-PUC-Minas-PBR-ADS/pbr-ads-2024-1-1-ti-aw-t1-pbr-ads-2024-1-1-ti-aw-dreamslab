import ProductController from "../app/controller/ProductController.js";
import FormValidator from "../app/lib/form/FormValidator.js";

let productId;
$(function(){
    if(localStorage.getItem("itemToEdit") == null){
        window.location = "./produtos.html"
    }

    productId = localStorage.getItem("itemToEdit");
    localStorage.removeItem("itemToEdit");

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
    });

    setProductData();
});

function setProductData(){
    const id = Number(productId);
    new ProductController().getProductById(id).then(function(result){
        $(".prod-name").html(result.name);
        $("#name").val(result.name);
        $("#price").val(result.price);
        $("#quantity").val(result.quantity);
        $("#description").val(result.description);
        $(".load").remove();
    })
}

$("#register-button").on("click", function(){
    resetError();
    const formValidator = new FormValidator(".form-product");
    if(formValidator.formIsValid() == false){
        return;
    }

    if($("#description").val() == ""){
        $(".error-message").html("Preencha todos os campos corretamente!");
        $("#description").addClass("input-error");
        $("#description").on("click", function(){
            $(this).removeClass("input-error")
        })
        return;
    }

    const dataToUpdate = {
        "name": $("#name").val(),
        "description": $("#description").val(),
        "price": $("#price").val(),
        "quantity": $("#quantity").val()
    }
    
    const id = Number(productId);
    new ProductController().editProduct(dataToUpdate, id).then((result)=>{
        if(result == false){
            $(".error-message").html("Erro ao editar produto!");
            return;
        }

        $(".error-message").html("Produto editado com sucesso!");
        $(".error-message").css("color", "green");
        setTimeout(()=>{
            $(".error-message").html("");
            $(".error-message").css("color", "");
            clearForm();
        }, 2000);
    });
});


function resetError(){
    $(".error-message").html("");
}

