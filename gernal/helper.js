function validationMessage(errorsObj = {}) {
    console.log(errorsObj)
    if (errorsObj && errorsObj.errors) {
        const { errors } = errorsObj
        if (Array.isArray(errors)) {
            return errors.reduce((acc, item) => {
                return {
                    ...acc,
                    [item.path]: item.message,
                }
            }, {})
        } else {
            return errors;
        }
    }
    return [];
}

function getCustomErrorObj(errObj) {
    return {
        errors: errObj,
    }
}
module.exports = {
    validationMessage: validationMessage,
    getCustomErrorObj,
}