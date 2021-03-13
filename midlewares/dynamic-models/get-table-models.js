// Lấy mô hình động để xửa lý
const listModels =  require("./list-models");

/**
 * Cắt lấy 2 tham số trên đường dẫn API
 * Lấy thành 2 biến model_name và table_name
 * 
 * @param {*} req
 */
module.exports =  (req) => {
    if (!req || !req.params) {
        return {
            error: "Không tìm thấy tham số mô hình",
        };
    }
    // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
    let { model_name, table_name } = req.params;

    // trả về đối tượng chứa các mô hình csdl thực
    let myModels = listModels.getMainModels(model_name);

    if (!myModels || !Object.keys(myModels).length) {
        return {
            error: "Không tìm thấy mô hình của csdl bạn chọn",
        };
    }

    // khai báo lấy lại mô hình
    return {
        model_name,
        table_name,
        myModels
    };
};
