import InputErrorMessages from "./InputErrorMessage.js";
import ValidateValue from "./ValidateValueByType.js";

class FormValidator{
 
    #inputs;
    #valueValidator = new ValidateValue();

    constructor(formSelector){
        this.#getInputs(formSelector);
    }

    formIsValid(){
        const inputsWithError = [];
        for(let i = 0; i < this.#inputs.length; i++){
            if((this.#inputIsValid(this.#inputs[i])) == false){
                inputsWithError.push(this.#inputs[i]);
            }
        };
       
        if(inputsWithError.length > 0){
            new InputErrorMessages(inputsWithError);
            return false;
        }

        return true;
    }
    
    #getInputs(formSelector){
        const form = $(formSelector);
        this.#inputs = form.find('input');  
        if(this.#inputs.length == 0){
            this.#inputs = [];
        }
    };

    #inputIsValid(input){
        const value = $(input).val();
        const type = $(input).attr("type");
        if($(input).hasClass("required") == false && value == ""){
            return true;
        }
        
        return this.#valueValidator.valueIsValid(value, type);
    }
}

export default FormValidator;