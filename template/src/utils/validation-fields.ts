const validationFields = (fields:string,validation:object)=>
{
    let errors:any = [];
    let fieldsArray = fields.split(',');
    fieldsArray.forEach((field:string)=>
    {
        if(validation[field] === undefined)
        {
            errors.push(`${field} is required`);
        }
    });
    return errors;
}

export default validationFields;