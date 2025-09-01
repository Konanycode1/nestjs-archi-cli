const validationFields = (fields, validation) => {
    let errors = [];
    let fieldsArray = fields.split(',');
    fieldsArray.forEach((field) => {
        if (validation[field] === undefined) {
            errors.push(`${field} is required`);
        }
    });
    return errors;
};
export default validationFields;
