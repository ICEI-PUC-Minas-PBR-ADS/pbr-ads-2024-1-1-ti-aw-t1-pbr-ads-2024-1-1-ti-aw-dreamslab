class ValidateValue{

    valueIsValid(value, type){
        const validations = {
            "number": this.#isNumber(value),
            "mail": this.#emailIsValid(value),
            "phone": this.#isPhone(value),
        }

        if(this.#isEmpty(value) == true){
            return false;
        }
        
        if(typeof validations[type] !== 'undefined'){
            return validations[type];
        }

        return true;
    }

    #isNumber(value) {
        value = Number(value);
        return typeof value === 'number';
    }

    #emailIsValid(value){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value); 
    }

    #isEmpty(value){
        if(value === undefined){
            return true;
        }
        if(value === null){
            return true;
        }
        if(value === ""){
            return true;
        }
        if(value.trim() === ''){
            return true;
        }

        return false;
    }

    #isPhone(value){
        const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;;
        return phoneRegex.test(value);
    }
}

export default ValidateValue;