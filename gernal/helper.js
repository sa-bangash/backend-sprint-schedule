function validationMessage(errors = {}) {
    return Object.keys(errors).reduce((acc, key) => {
        return {
            ...acc,
            [key]: errors[key].message,
        }
    }, {})
}

module.exports = {
    validationMessage: validationMessage
}