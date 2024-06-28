import BusinessController from "../app/controller/BusinessController.js";
import ProductController from "../app/controller/ProductController.js";
import FormValidator from "../app/lib/form/FormValidator.js";

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
    });

    $(".load").remove();
});

$("#register-button").on("click", function(){
    resetError();
    const formValidator = new FormValidator(".form-product");
    if(formValidator.formIsValid() == false){
        console.log("form invalido");
        return;
    }

    if($("#description").val() == ""){
        $(".error-message").html("Preencha todos os campos corretamente!");
        $("#description").addClass("input-error");
        $("#description").on("click", function(){
            $(this).removeClass("input-error")
        })
        return
    }

    const productData = {
        "id": "",
        "name": $("#name").val(),
        "store_id": "",
        "img_path": "./assets/images/site/pizza.png",
        "description": $("#description").val(),
        "price": $("#price").val(),
        "quantity": $("#quantity").val()
    }
    console.log(productData);
    
    const ownerId = Number(localStorage.getItem("userId"));
    new BusinessController().getBusinessDataByOwnerId(ownerId).then(function(result){
        const businessId = Number(result.id);
        productData.store_id = businessId;
        saveProduct(productData);
    })

});

function clearForm(){
    $("#name").val("");
    $("#description").val("");
    $("#price").val("");
    $("#quantity").val("");
}

function saveProduct(productData){
    new ProductController().saveProduct(productData).then((result)=>{
        if(result == false){
            $(".error-message").html("Erro ao cadastrar produto!");
            return;
        }

        $(".error-message").html("Produto cadastrado com sucesso!");
        $(".error-message").css("color", "green");
        setTimeout(()=>{
            $(".error-message").html("");
            $(".error-message").css("color", "");
            clearForm();
        }, 2000);
    });
}

function resetError(){
    $(".error-message").html("");
}

