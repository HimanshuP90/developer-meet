const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterinput(data){
    let errors = {};

    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name filed is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


}