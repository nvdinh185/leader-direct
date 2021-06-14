const convertWhereGet2Model = require("./convert-where-get-2-model");

/**
 * Chuyển đổi các tham số query trên link sang mệnh các mệnh đề như post
 * @param {*} wheres 
 * @param {*} fields 
 * @param {*} sorts 
 */
module.exports = (wheres, fields, sorts) => {

    let jsonWhere = convertWhereGet2Model(wheres);
    // console.log("wheres:", wheres);
    // console.log("jsonWhere:", jsonWhere);

    let jsonFields = {};
    if (fields) {
        let fFields = fields.split(",");
        for (let fField of fFields) {
            let keyValue = fField.split(":");
            if (keyValue.length) {
                let key = keyValue[0];
                let value = keyValue.length > 1 && keyValue[1] === "0" ? 0 : 1;
                jsonFields[key] = value;
            }
        }
    }
    // console.log("fields:", fields);
    // console.log("jsonFields:", jsonFields);

    let jsonSort = {};
    if (sorts) {
        let sSorts = sorts.split(",");
        for (let sField of sSorts) {
            let keyValue = sField.split(":");
            if (keyValue.length) {
                let key = keyValue[0];
                let value = keyValue.length > 1 && keyValue[1] === "-1" ? -1 : 1;
                jsonSort[key] = value;
            }
        }
    }
    // console.log("sort:", sorts, jsonSort);
    
    return {
        jsonWhere,
        jsonFields,
        jsonSort
    }
}
