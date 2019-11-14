export function createControl (config,validation) {
    return {
        ...config,
        validation : { ...validation},
        value: '',
        touched: false,
        valid: !validation,        
                         
    }
}

export function validateControl (value, validation = null) {
    if (!validation) return true ;

    let isValid = true;

    if(validation.required) {
        isValid = value.trim() !== "" && isValid
    }

    return isValid
}

export function formValidate (formControls) {
    let isFormValid = true;
    Object.keys(formControls).forEach( name => {
        isFormValid = formControls[name].valid && isFormValid
    })

    return isFormValid

}
