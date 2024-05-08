import { getOnlyNumbers } from "../app/lib/Utility.js";

$("#cep").on("change", function(){    
    let inputValue = getOnlyNumbers($("#cep").val());
    
    $.get("https://viacep.com.br/ws/"+ inputValue +"/json/", function(data){
        $("#cep").val(data.cep);
        $("#estate").val(data.uf);
        $("#city").val(data.localidade);
        $("#address").val(data.bairro + ", " + data.logradouro + ", [digite o número]")
    });
});