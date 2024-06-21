class InputErrorMessages{

    #message;

    constructor(inputsWithError){
        inputsWithError.forEach(eachInput => {
            this.#setError(eachInput);       
            return;
        });

        this.#setErrorMessage(inputsWithError);
    }

    #setErrorMessage(inputsWithError){
        if(inputsWithError.length > 1){
            return this.#setErrorForm();
        }
        
        const errorMessage = this.#getErrorSingle(inputsWithError[0]);
        return this.#setErrorForm(errorMessage);
    }

    #setErrorForm(message = null){
        this.#message = message;
        if(message == null){
            this.#message = "Preencha todos os campos corretamente!";
        }
        $(".error-message").html(this.#message);
    }

    #getErrorSingle(input){
        const errorsByType = {
            "number": "Preencha com apenas números!",
            "mail": "E-mail inválido!",
            "text": "Não deixe esse campo vazio!",
            "phone": "Telefone inválido!"
        }

        const type = $(input).attr("type");
        if(errorsByType[type] === 'undefined'){
            return "Preencha o campo corretamente!";
        }

        return errorsByType[type];
    }

    #setError(input){
        $(input).addClass("input-error")
        this.#setInputReset(input);
    }

    #setInputReset(input){
        $(input).on("click", function(){
            $(this).removeClass("input-error")
        })
    }
}

export default InputErrorMessages;