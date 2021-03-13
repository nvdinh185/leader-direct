
// khai báo hàm kiểm tra mệnh đề where
/**
 * Chuyển đổi chuỗi mệnh đề where ở lệnh get (các ký tự đặc biệt, sang mệnh đề where của mô hình)
 * Thay thế
 * dấu , thành các mệnh đề where,
 * dấu : ngăn cách key và value,
 * dấu | ngăn cách trường và value trong toán tử,
 * dấu _ ^tiếp đầu ngữ trong toán tử thành $
 * @param {*} wheres wheres=table_name:tables,field_name:_like~*or*|_ne~orm&fields=table_name,field_name,order_1&sort=order_1:-1
 */

module.exports = (wheres) => {
    // wheres=table_name:tables,field_name:_like~*or*|_ne~orm&fields=table_name,field_name,order_1&sort=order_1:-1
    let jsonWhere = {};
    if (wheres) {
        let wFields = wheres.split(",");
        for (let wfield of wFields) {
            let keyValue = wfield.split(":");
            // nếu có 2 trường thì đó là key và value
            if (keyValue.length == 2 && keyValue[0] && keyValue[1]) {
                let key = keyValue[0];
                let value = keyValue[1];
                let operators = {};
                let values = value.split("|");
                for (let operator of values) {
                    let keyValueoperators = operator.split("~");
                    if (
                        keyValueoperators.length == 2 &&
                        keyValueoperators[0] &&
                        keyValueoperators[1] &&
                        keyValueoperators[0].indexOf("_") === 0
                    ) {
                        // đúng là có một phép toán yêu cầu
                        operators[keyValueoperators[0].replace(/^_/g, "$")] =
                            keyValueoperators[1];
                    }
                }
                // console.log("OP", key, value, operators);
                if (Object.keys(operators).length > 0) {
                    jsonWhere[key] = operators;
                } else {
                    jsonWhere[key] = value;
                }
            }
        }
    }
    return jsonWhere;
};