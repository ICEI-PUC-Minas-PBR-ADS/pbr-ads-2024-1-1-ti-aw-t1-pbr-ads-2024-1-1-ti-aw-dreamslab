class FormValidator{
    
    formIsValid(formId){
        inputs = this.getInputs();
    }

    #getInputs(formId){
        const inputs = $(formId + " inputs");
        console.log(inputs);
    };
}

export default FormValidator;