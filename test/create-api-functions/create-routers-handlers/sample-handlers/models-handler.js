// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./test/create-api-functions/excel/api-functions-granted-user-dynamic-models.xlsx
// Được tạo và lúc 2020-11-08 11:26:42

"use strict";

// khai báo giao tiếp mô hình csdl để phân quyền truy cập mức bảng trong csdl
// user sẽ có quyền select, insert, update, delete tùy vào phân quyền của user đó
const midlewares = require(`../../midlewares`);

// lấy các mô hình cố định của hệ thống trước
const { models, table_models } = midlewares.grantedUsers.models;

// lấy các hàm giao tiếp chuyển đổi trung gian
const {
    convertGetParams,
    getTableModels,
    listModels,
    verifyPostParams,
    verifyTablePrivileges,
    verifyJsonWhere,
    verifyFieldsInTableStructure,
} = midlewares.dynamicModels;

const { json2Model, convertWheres } = require("node-js-orm");

// không cần xác thực cao, thì import những bảng ghi hợp lệ thôi
// nếu đặt true thì không cho import và báo lỗi trường nếu sai
const IS_SECURE_HIGH = false;

class ModelsHandler {
    constructor() { }

    /**
     * (31) GET /ccdc-tscd/models/get-models
     *
     * Lấy danh sách mô hình tất cả trong csdl
     * Đọc bảng models trả danh sách theo trang, phục vụ cho client biết để tao tác với từng mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    getModels(req, res, next) {
        let { page, limit } = req.paramS;
        page = page || 1;
        limit = limit || 100;

        // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        models
            .getPage(
                {},
                {}, // jsonFields = list field to select field_1, field_2 from <table>
                {}, // jsonSort = order by field_1 asc, field_2 desc
                { page, limit }
            )
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (32) GET /ccdc-tscd/models/get-detail-model/:model_name
     *
     * Lấy danh sách cấu trúc csdl của mô hình cụ thể
     * Đọc bảng mô cấu trúc mô hình, trả danh sách cấu trúc csdl (để export lưu trữ, backup, chỉnh sửa, thêm bớt, ...). Trả về theo trang
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  "page=1 & limit=100 & wheres={table_name:tables,field_name:{ $like: *or*, $ne:orm } }&fields= table_name,field_name,order_1 & sorts=order_1:-1"
     */
    getDetailModelModelname(req, res, next) {
        // page là số trang, limit là giới hạn bảng ghi cho một trang
        // model là tên bảng, wheres là mệnh đề where cấu trúc cho GET (thay $=_, *=%, |, :, ~ là những ký tự đặc biệt)
        // fields là các mệnh đề liệt kê trường, sorts là sắp xếp
        let { page, limit, wheres, fields, sorts } = req.paramS;
        page = page || 1;
        limit = limit || 100;

        // chuyển đổi các mệnh đề trên paramS thành json
        let { jsonWhere, jsonFields, jsonSort } = convertGetParams(
            wheres,
            fields,
            sorts
        );
        // console.log("xxx-->",jsonWhere);
        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (error || !model_name) {
            req.error =
                error || `Không tìm thấy mô hình CSDL (${{ model_name }}) theo yêu cầu`;
            next();
            return;
        }

        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        listModels
            .getDetailModel(model_name, jsonWhere, jsonFields, jsonSort, {
                page,
                limit,
            })
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (33) POST /ccdc-tscd/models/create-model/:model_name
     *
     * Tạo một mô hình mới (chỉ kiểm tra kết nối csdl)
     * Thực hiện tạo cấu trúc của mô hình (bảng chứa mô hình dữ liệu thật - chưa có danh sách các mô hình thật) - nhằm kiểm tra kết nối csdl của mô hình thật có đúng không? Nếu kết nối đúng thì cho phép tạo bảng để chứa các mô hình. Ví dụ, post lên một json yêu cầu tạo một giao tiếp csdl sqlite3
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  {"db_type":"sqlite3","db_name":"test-model","db_connection":"db-test-model","name":"Test mô hình mới", "description":"Mô hình mẫu thử"}
     */
    createModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let { db_type, db_name, db_connection, name, description } = req.json_data;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if ((!db_type && !db_name && !db_connection) || !name) {
            req.error = "Không có dữ liệu theo yêu cầu";
            next();
            return;
        }

        // trường hợp mô hình chưa tạo nên chỉ cắt lấy tham số thôi
        if (!req || !req.params) {
            req.error = "Tham số đường dẫn không hợp lệ";
            next();
            return;
        }
        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!model_name) {
            req.error = "Tham số mô hình không hợp lệ";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // thực hiện tạo mô hình mới
        listModels
            .createOneModel(model_name, {
                db_type,
                db_name,
                db_connection,
                name,
                description,
                updated_user: req.user.username,
            })
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = { status: "OK", message: data };
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (34) POST /ccdc-tscd/models/edit-model/:model_name
     *
     * Sửa một mô hình (cập nhập kết nối csdl mới)
     * Thực hiện sửa mô hình (là chỉnh sửa kết nối csdl mới hoặc cập nhập thông tin của mô hình thôi
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  {"db_type":"sqlite3","db_name":"test-model","db_connection":"db-test-model","name":"Test mô hình mới", "description":"Mô hình mẫu thử"}
     */
    editModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let { db_type, db_name, db_connection, name, description } = req.json_data;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!name && !description) {
            req.error =
                "Không có dữ liệu theo yêu cầu (ít nhất là tên hoặc mô tả làm gì?)";
            next();
            return;
        }

        // trường hợp mô hình chưa tạo nên chỉ cắt lấy tham số thôi
        if (!req || !req.params) {
            req.error = "Tham số đường dẫn không hợp lệ";
            next();
            return;
        }
        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!model_name) {
            req.error = "Tham số mô hình không hợp lệ";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // thực hiện tạo mô hình mới
        listModels
            .editOneModel(model_name, {
                db_type,
                db_name,
                db_connection,
                name,
                description,
                updated_user: req.user.username,
            })
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then(async (data) => {
                // console.log('Data: ', data);

                // khi import cấu trúc thành công, thì load lại mô hình để truy vấn về sau
                let myModels = await listModels
                    .getTableModels(model_name, true)
                    .catch((err) => {
                        console.log("Lỗi khởi tạo mô hình giao tiếp động:", err);
                    });

                // clone để khỏi bị Converting circular structure to JSON
                let modelKeys = [...Object.keys(myModels)];

                req.finalJson = {
                    status: "OK",
                    message: data,
                    models: modelKeys,
                };

                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (35) POST /ccdc-tscd/models/delete-model/:model_name
     *
     * Xóa một mô hình
     * Thực hiện xóa luôn mô hình và cấu trúc bảng csdl của nó luôn
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  {"model_name":"test_model"}
     */
    deleteModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let modelNamePost = req.json_data.model_name;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!modelNamePost) {
            req.error = "Không có biết tham số đầu vào";
            next();
            return;
        }

        // trường hợp mô hình chưa tạo nên chỉ cắt lấy tham số thôi
        if (!req || !req.params) {
            req.error = "Tham số đường dẫn không hợp lệ";
            next();
            return;
        }
        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        // tham số mô hình phải trùng với mô hình ở lệnh post
        if (!model_name || model_name !== modelNamePost) {
            req.error = "Tham số mô hình không hợp lệ";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // thực hiện tạo mô hình mới
        listModels
            .deleteOneModel(model_name)
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = { status: "OK", message: data };
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (36) POST /ccdc-tscd/models/import-model/:model_name
     *
     * Import cấu trúc 
     * Ví dụ import một danh sách data trích từ excel được, cho mô hình có tên là granted_users, nếu trùng thì update dùng mệnh đề where là table_name và field_name
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"datas":[{"table_name":"test","field_name":"test","description":"test", "orm_data_type":"STRING","length":255 }],"where_keys":["table_name","field_name"]}]
     */
    importModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let { datas, where_keys } = req.json_data;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!datas || !Array.isArray(datas) || !datas.length) {
            req.error = "Không có dữ liệu theo yêu cầu";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // trường hợp mô hình chưa tạo nên chỉ cắt lấy tham số thôi
        if (!req || !req.params) {
            req.error = "Tham số đường dẫn không hợp lệ";
            next();
            return;
        }
        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        // tham số mô hình phải trùng với mô hình ở lệnh post
        if (!model_name) {
            req.error = "Tham số mô hình không hợp lệ";
            next();
            return;
        }

        console.log("INCAIGI");

        listModels
            .importModelStructure(model_name, datas, where_keys)
            .then(async (data) => {

                console.log("Data import thế nào?", data);

                // khi import cấu trúc thành công, thì load lại mô hình để truy vấn về sau
                // trong thủ tục load mô hình sẽ tự import vào bảng table_models để phân quyền sử dụng
                let myModels = await listModels
                    .getTableModels(model_name, true)
                    .catch((err) => {
                        console.log("Lỗi khởi tạo mô hình giao tiếp động:", err);
                    });

                // clone để khỏi bị Converting circular structure to JSON
                let modelKeys = [...Object.keys(myModels)];

                req.finalJson = {
                    status: "OK",
                    message: "Import cấu trúc csdl xong, xem result nhé",
                    result: data,
                    models: modelKeys,
                };
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (37) POST /ccdc-tscd/models/sync-model/:model_name
     *
     * Đồng bộ mô hình thực (tạo bảng csdl chính)
     * Thực chất là tạo (các) bảng theo cấu trúc được load (import structure)
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  {"table_name":"test_table"}
     */
    syncModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let { table_name } = req.json_data;

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // trường hợp mô hình chưa tạo nên chỉ cắt lấy tham số thôi
        if (!req || !req.params) {
            req.error = "Tham số đường dẫn không hợp lệ";
            next();
            return;
        }
        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        // tham số mô hình phải trùng với mô hình ở lệnh post
        if (!model_name) {
            req.error = "Tham số mô hình không hợp lệ";
            next();
            return;
        }

        listModels
            .syncRealDatabase(model_name, table_name)
            .then(async (data) => {
                // khi import cấu trúc thành công, thì load lại mô hình để truy vấn về sau
                let myModels = await listModels
                    .getTableModels(model_name, true)
                    .catch((err) => {
                        console.log("Lỗi khởi tạo mô hình giao tiếp động:", err);
                    });
                // chuyển đổi recontructure để không bị Converting circular structure to JSON
                let modelKeys = [...Object.keys(myModels)];
                req.finalJson = {
                    status: "OK",
                    message: `Đồng bộ mô hình csdl ${model_name}${table_name ? ` bảng ${table_name}` : ``
                        } thành công!`,
                    models: modelKeys,
                };
                next();
            })
            .catch((err) => {
                console.log("Lỗi: ", err);
                req.error = err;
                next();
            });
    }

    /**
     * (38) GET /ccdc-tscd/models/get-page/:model_name/:table_name
     *
     * Lấy từng trang dữ liệu của các mô hình có trong csdl
     * Trả về trang danh sách các dòng dữ liệu của từng bảng của mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  ["page=1&limit=5&wheres=table_name:tables,field_name:_like~*or*|_ne~orm&fields=table_name,field_name,order_1&sorts=order_1:-1"]
     */
    async getPageModelnameTablename(req, res, next) {
        // page là số trang, limit là giới hạn bảng ghi cho một trang
        // model là tên bảng, wheres là mệnh đề where cấu trúc cho GET (thay $=_, *=%, |, :, ~ là những ký tự đặc biệt)
        // fields là các mệnh đề liệt kê trường, sorts là sắp xếp
        let { page, limit, wheres, fields, sorts } = req.paramS;
        page = page || 1;
        limit = limit || 100;

        // chuyển đổi các mệnh đề trên paramS thành json
        let { jsonWhere, jsonFields, jsonSort } = convertGetParams(
            wheres,
            fields,
            sorts
        );

        // console.log("1.INPUT:", wheres, fields, sorts);
        // console.log("1.OUTPUT:", jsonWhere, jsonFields, jsonSort);

        // lấy mô hình giao tiếp thực tế
        const { model_name, table_name, myModels, error } = getTableModels(req);

        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "R",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền ĐỌC bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());

        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select
        let fieldCheck = verifyPostParams(
            jsonTableStructure,
            jsonWhere,
            jsonFields,
            jsonSort,
            false
        );

        // console.log("2.INPUT:", jsonWhere, jsonFields, jsonSort);
        // console.log("2.OUTPUT:", fieldCheck);

        if (fieldCheck.errorMessage) {
            req.error = fieldCheck.errorMessage;
            next();
            return;
        }

        // trả kết quả theo trang
        uModel
            .getPage(
                fieldCheck.jsonWhere, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
                fieldCheck.jsonFields, // jsonFields = list field to select field_1, field_2 from <table>
                fieldCheck.jsonSort, // jsonSort = order by field_1 asc, field_2 desc
                { page, limit } // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi
            )
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (39) GET /ccdc-tscd/models/get-1-record/:model_name/:table_name
     *
     * Lấy một tài liệu (1 dòng)
     * Trả về một dòng dữ liệu
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  ["page=1&limit=100&wheres=table_name:tables,field_name:_like~*or*|_ne~orm&fields=table_name,field_name,order_1&sort=order_1:-1","model=function_apis&id=11"]
     */
    async get1RecordModelnameTablename(req, res, next) {
        // model là tên bảng, wheres là mệnh đề where cấu trúc cho GET (thay $=_, *=%, |, :, ~ là những ký tự đặc biệt)
        // fields là các mệnh đề liệt kê trường, sorts là sắp xếp
        let { wheres, fields, sorts } = req.paramS;
        // chuyển đổi các mệnh đề trên paramS thành json
        let { jsonWhere, jsonFields, jsonSort } = convertGetParams(
            wheres,
            fields,
            sorts
        );

        // console.log("1.INPUT:", wheres, fields, sorts);
        // console.log("1.OUTPUT:", jsonWhere, jsonFields, jsonSort);

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "R",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền ĐỌC bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());

        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select
        let fieldCheck = verifyPostParams(
            jsonTableStructure,
            jsonWhere,
            jsonFields,
            jsonSort,
            false
        );

        // console.log(
        //   "2.INPUT:",
        //   jsonTableStructure,
        //   jsonWhere,
        //   jsonFields,
        //   jsonSort,
        //   false
        // );
        // console.log("2.OUTPUT:", fieldCheck);

        if (fieldCheck.errorMessage) {
            req.error = fieldCheck.errorMessage;
            next();
            return;
        }

        // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        uModel
            .getFirstRecord(
                fieldCheck.jsonWhere, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
                fieldCheck.jsonFields, // jsonFields = list field to select field_1, field_2 from <table>
                fieldCheck.jsonSort // jsonSort = order by field_1 asc, field_2 desc
            )
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (40) POST /ccdc-tscd/models/post-page/:model_name/:table_name
     *
     * Lấy trang dữ liệu phương thức POST
     * Trả về trang danh sách các dòng dữ liệu của từng bảng của mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"page":1,"limit":100,"wheres":{"id":{"$gte":100}},"fields":{"id":1,"function_apis":1},"sorts":{"id":-1}}]
     */
    async postPageModelnameTablename(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        let { page, limit, wheres, fields, sorts } = req.json_data;
        page = page || 1;
        limit = limit || 100;

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "R",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền ĐỌC bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        let { jsonWhere, jsonFields, jsonSort, errorMessage } = verifyPostParams(
            jsonTableStructure,
            wheres,
            fields,
            sorts,
            true
        );

        // console.log("wheres,", wheres, jsonWhere);

        if (errorMessage) {
            req.error = `${errorMessage} của mô hình ${model_name}`;
            next();
            return;
        }

        // trả kết quả theo trang
        uModel
            .getPage(
                jsonWhere, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
                jsonFields, // jsonFields = list field to select field_1, field_2 from <table>
                jsonSort, // jsonSort = order by field_1 asc, field_2 desc
                { page, limit } // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi
            )
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (41) POST /ccdc-tscd/models/post-1-record/:model_name/:table_name
     *
     * Lấy 1 dòng dữ liệu phương thức POST
     * Trả về một dòng dữ liệu theo mệnh đề where
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"wheres":{"id":{"$gte":100}},"fields":{"id":1,"function_apis":1},"sorts":{"id":-1}}]
     */
    async post1RecordModelnameTablename(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        let { page, limit, wheres, fields, sorts } = req.json_data;
        page = page || 1;
        limit = limit || 100;

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "R",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền ĐỌC bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        let { jsonWhere, jsonFields, jsonSort, errorMessage } = verifyPostParams(
            jsonTableStructure,
            wheres,
            fields,
            sorts,
            true
        );

        if (errorMessage) {
            req.error = `${errorMessage} của mô hình ${model_name}`;
            next();
            return;
        }

        // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        uModel
            .getFirstRecord(
                jsonWhere, // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
                jsonFields, // jsonFields = list field to select field_1, field_2 from <table>
                jsonSort // jsonSort = order by field_1 asc, field_2 desc
            )
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (42) POST /ccdc-tscd/models/insert/:model_name/:table_name
     *
     * Chèn một bảng ghi vào mô hình
     * Chèn vào mô hình một bảng ghi
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"data":{"id":104,"function_apis":"[11,12,13,14,15]","name":"Nhóm quyền Models","description":"Tác động đến bất kỳ model nào","status":1}}]
     */
    async insertModelnameTablename(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        // data là đối tượng của một dòng cần chèn vào
        let { data } = req.json_data;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!data
            || typeof data !== "object"
            || !Object.keys(data).length
        ) {
            req.error = "Không có dữ liệu theo yêu cầu --> { data }";
            next();
            return;
        }

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng chức năng Create=Insert/Import
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "C",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền INSERT bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        // kiểm tra toàn bộ key trong data có phù hợp với cấu trúc dữ liệu đã định nghĩa không?
        // nếu có trường không tồn tại trong cấu trúc thì bỏ qua 
        let verifyData = verifyFieldsInTableStructure(jsonTableStructure, data, true);
        if (verifyData.error) {
            req.error = `Lỗi KHÔNG tồn tại Field: ${verifyData.error} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        let jsonData = verifyData.data;

        if (!Object.keys(jsonData).length) {
            req.error = `Dữ liệu đầu vào không hợp lệ cho bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        // console.log("ZZZ-->", jsonData);

        // chèn một bảng ghi vào csdl
        uModel
            .insertOneRecord(jsonData)
            .then(result => {
                // console.log('Data: ', data);
                req.finalJson = {
                    status: "OK",
                    message: "Đã chèn mới dữ liệu thành công",
                    data: jsonData,
                    result
                };
                next();
            })
            .catch((err) => {
                if (!err || !err.error || err.error.code !== 11000) {
                    console.log("Lỗi INSERT chưa xác định: ", err);
                }
                req.error = err && err.error && err.error.code === 11000 ? "Bảng ghi trùng khóa UNIQUE đã tồn tại. Vui lòng kiểm tra lại" : err;
                next();
            });
    }

    /**
     * (43) POST /ccdc-tscd/models/import/:model_name/:table_name
     *
     * Import một danh sách các bảng ghi vào mô hình
     * Các dữ liệu từ client được tổ chức  các bảng ghi, mô hình sẽ import vào, nếu trùng key thì nó sẽ báo trùng, nếu có mệnh đề where_keys là một mảng thì tự update theo tập khóa này
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"datas":[{"id":104,"function_apis":"[11,12,13,14,15]","name":"Nhóm quyền Models","description":"Tác động đến bất kỳ model nào","status":1}],"where_keys":["id"]}]
     */
    async importModelnameTablename(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        // model là tên bảng, datas là mảng chứa danh sách cần import, where_keys là các trường khi trùng thì cho update theo where nếu có
        let { datas, where_keys, group_count } = req.json_data;

        // số lượng commit đồng thời khi import
        let GROUP_COUNT = group_count || 100;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!datas || !Array.isArray(datas) || !datas.length) {
            req.error = "Không có dữ liệu theo yêu cầu -->{ datas }";
            next();
            return;
        }

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "C",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền INSERT/IMPORT bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        let arrJson = [];
        // duyệt tất cả các bảng ghi của datas, trùng với kiểu dữ liệu, chuyển đổi sang kiểm dữ liệu trước khi đưa vào
        for (let data of datas) {

            let verifyData = verifyFieldsInTableStructure(jsonTableStructure, data, true);
            let jsonData = verifyData.data;

            // nếu yêu cầu verify cao, dữ liệu truyền lên phải khớp tất cả mới import vào được
            if (IS_SECURE_HIGH) {
                // trường hợp không cần verify thì chỉ các row có jsonData mới đưa vào mảng import, còn lại fail count
                if (verifyData.error) {
                    req.error = `Lỗi KHÔNG tồn tại Field: ${verifyData.error} bảng của mô hình: ${model_name}/${table_name}`;
                    next();
                    return;
                }

                if (!Object.keys(jsonData).length) {
                    req.error = `Dữ liệu đầu vào không hợp lệ cho bảng của mô hình: ${model_name}/${table_name}`;
                    next();
                    return;
                }
            }

            // đưa dữ liệu hợp lệ vào để import
            if (Object.keys(jsonData).length) {
                arrJson.push(jsonData);
            }

        }


        if (where_keys
            && Array.isArray(where_keys)
            && where_keys.length) {

            // kiểm tra tính hợp lệ của mệnh đề liệt kê where_keys
            // ["id","field_name"]
            // không cần - vì đã ràng buộc ok
            // for (let field of where_keys){
            //   if (field) // giả sử đưa liệt kê mệnh đề where_key nhưng không có trường nào hợp lệ?
            // }

            // nếu có mệnh đề where thì cho update
            // thực hiện import 100 bảng ghi cùng lúc, cho đến khi hết số lượng bảng ghi
            uModel
                .importRowsUpdates(
                    arrJson,
                    where_keys,
                    GROUP_COUNT
                )
                .then((results) => {
                    let message = "Đã import kiểu UPDATE nếu trùng KEY ở mệnh đề WHERE_KEYS dữ liệu theo kết quả ở trường results";
                    // console.log('Data: ', results);
                    req.finalJson = {
                        status: "OK",
                        message,
                        results,
                    };
                    next();
                })
                .catch((err) => {
                    // console.log('Lỗi: ', err);
                    req.error = err;
                    next();
                });
        } else {
            // nếu không có mệnh đề where thì chỉ insert
            uModel
                .importRows(
                    arrJson,
                    GROUP_COUNT
                )
                .then((results) => {
                    let message = "Đã import dữ liệu theo kết quả ở trường results";
                    // console.log('Data: ', results);
                    req.finalJson = {
                        status: "OK",
                        message,
                        results,
                        // , datas: arrJson
                    };
                    next();
                })
                .catch((err) => {
                    // console.log('Lỗi: ', err);
                    req.error = err;
                    next();
                });
        }
    }

    /**
     * (44) POST /ccdc-tscd/models/update/:model_name/:table_name
     *
     * Cập nhập các bảng ghi trong mô hình
     * Cập nhập vào mô hình các bảng ghi có đủ điều kiện where
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"data":{"function_apis":"[11,12,13,14,15]","name":"Nhóm quyền Models","description":"Tác động đến bất kỳ model nào","status":1},"where":{"id":104}}, {"data":{"function_apis":[11,12,13,14,15],"name":"Nhóm quyền Models","description":"Tác động đến bất kỳ model nào","status":1},"where":{"id":{"$gte":100}}}]
     */
    async updateModelnameTablename(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        // data là đối tượng dữ liệu cần update, where là mệnh đề where để update
        let { data, where } = req.json_data;

        // console.log("XXX-> DATA, WHERE", data, where);

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!data
            || !where
            || typeof data !== "object"
            || typeof where !== "object"
            || !Object.keys(data).length
            || !Object.keys(where).length
        ) {
            req.error = "Không có dữ liệu theo yêu cầu -->data, where";
            next();
            return;
        }

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng chức năng Update
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "U",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền UPDATE bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        // xác nhận mệnh đề where có các trường dữ liệu tồn tại trong csdl đúng không?
        let { jsonWhere, errorMessage } = verifyPostParams(
            jsonTableStructure,
            where,
            null,
            null,
            true
        );

        if (errorMessage) {
            req.error = `${errorMessage} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }


        // xác định các toán tử $like, $gte... của mệnh đề where có hợp lệ không
        let vWhere = verifyJsonWhere(jsonWhere);

        // chuyển đổi toán tử mệnh đề where phù hợp
        jsonWhere = vWhere.jsonWhere;

        // console.log("YYYY-->", vWhere, jsonWhere);

        if (vWhere.error) {
            req.error = `Lỗi toán tử where: ${vWhere.error} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }


        // kiểm tra toàn bộ key trong data có phù hợp với cấu trúc dữ liệu đã định nghĩa không?
        // nếu có trường không tồn tại trong cấu trúc thì bỏ qua 
        let verifyData = verifyFieldsInTableStructure(jsonTableStructure, data, true);
        if (verifyData.error) {
            req.error = `Lỗi tồn tại Field: ${verifyData.error} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        let jsonData = verifyData.data;


        if (!Object.keys(jsonData).length || !Object.keys(jsonWhere).length) {
            req.error = `Dữ liệu hoặc mệnh đề where không hợp lệ cho bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        // console.log("ZZZ-->", jsonData, jsonWhere);

        // update một bảng ghi vào csdl
        uModel
            .updateOneRecord(jsonData, jsonWhere)
            .then((result) => {
                let message = `Đã cập nhập bảng ${table_name} trong mô hình ${model_name} thành công`;
                // console.log('Data: ', data);
                req.finalJson = {
                    status: "OK",
                    message,
                    data: jsonData,
                    where: jsonWhere,
                    result,
                };
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (45) POST /ccdc-tscd/models/delete/:model_name/:table_name
     *
     * Xóa các bảng ghi trong mô hình
     * Xóa các bảng ghi trong mô hình
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  [{"where":{"id":104}}]
     */
    async deleteModelnameTablename(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post json không hợp lệ";
            next();
            return;
        }

        // where là mệnh đề where để update
        let { where } = req.json_data;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!where
            || typeof where !== "object"
            || !Object.keys(where).length
        ) {
            req.error = "Không có dữ liệu theo yêu cầu --> where";
            next();
            return;
        }
        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng chức năng Delete
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "D",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền DELETE bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        // lấy lại cấu trúc thật của bảng mô hình
        let jsonTableStructure = JSON.parse(uModel.getStructure());
        // kiểm tra các tên trường hợp lệ có trong mô hình trước khi select

        // xác nhận mệnh đề where có các trường dữ liệu tồn tại trong csdl đúng không?
        let { jsonWhere, errorMessage } = verifyPostParams(
            jsonTableStructure,
            where,
            null,
            null,
            true
        );

        if (errorMessage) {
            req.error = `${errorMessage} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        // xác định các toán tử $like, $gte... của mệnh đề where có hợp lệ không
        let vWhere = verifyJsonWhere(jsonWhere);
        // chuyển đổi toán tử mệnh đề where phù hợp
        jsonWhere = vWhere.jsonWhere;
        // console.log("YYYY-->", vWhere, jsonWhere);
        if (vWhere.error) {
            req.error = `Lỗi toán tử where: ${vWhere.error} bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        if (!Object.keys(jsonWhere).length) {
            req.error = `Dữ liệu hoặc mệnh đề where không hợp lệ cho bảng của mô hình: ${model_name}/${table_name}`;
            next();
            return;
        }

        // console.log("ZZZ-DELETE-->", jsonWhere);

        // xóa 1 bảng ghi trong csdl
        uModel
            .deleteOneRecord(jsonWhere)
            .then((result) => {
                let message = "Đã xóa dữ liệu thành công";
                // console.log('Data: ', data);
                req.finalJson = {
                    status: "OK",
                    message,
                    where: jsonWhere,
                    result
                };
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (46) GET /ccdc-tscd/models/get-table-models/:model_name
     *
     * Lấy danh sách mô hình đã khởi tạo
     * Đọc bảng table_models theo model_name, trả về danh sách tất cả theo trang mặt định là 100 bảng, sử dụng để phân quyền mức bảng hoặc lọc để import dữ liệu từ client
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:
     */
    getTableModelsModelname(req, res, next) {
        let { page, limit } = req.paramS;
        page = page || 1;
        limit = limit || 100;

        if (!req || !req.params) {
            req.error = "Không tìm thấy tham số mô hình";
            next();
            return;
        }

        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        if (!model_name) {
            req.error = "Không tìm thấy mô hình";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        table_models
            .getPage({ model_name }, {}, {}, { page, limit })
            .then((data) => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (47) POST /ccdc-tscd/models/reload-model/:model_name
     *
     * Thực hiện làm mới cấu trúc mô hình từ xa
     * Khi có thay đổi csdl, thay đổi cấu trúc csdl, định nghĩa mới một bảng, xóa một mô hình thì ta phải reload lại
     *
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     *
     * SAMPLE INPUTS:  {"model_name":"ccdc_tscd"}
     */
    reloadModelModelname(req, res, next) {
        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let modelName = req.json_data.model_name;

        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        if (!modelName) {
            req.error = "Không có dữ liệu theo yêu cầu";
            next();
            return;
        }

        if (!req || !req.params) {
            req.error = "Không tìm thấy tham số mô hình";
            next();
            return;
        }

        // lấy tham số csdl chính là tên của mô hình được khai ở ./midlewares/<db-name>
        let { model_name } = req.params;

        if (model_name !== modelName) {
            req.error = `Tham số mô hình không hợp lệ ${model_name} !== ${modelName}`;
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        listModels
            .getTableModels(model_name, true)
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then((data) => {
                // clone để khỏi bị Converting circular structure to JSON
                let modelKeys = JSON.stringify(Object.keys(data));

                req.finalJson = JSON.parse(modelKeys);
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (48) GET /socket/models/get-model-structure
     *
     * Trả cấu trúc thiết kế mô hình
     * Trả về một đối tượng định nghĩa cấu trúc để thiết kế mô hình csdl
     *
     *
     *
     * SAMPLE INPUTS:
     */
    getModelStructure(req, res, next) {
        req.finalJson = json2Model.modelConfig;
        next();
    }

    /**
     * (49) GET /get-table-structure/:model_name/:table_name
     */
    getTableStructureModelnameTablename(req, res, next) {

        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (error || !model_name || !table_name || !myModels) {
            req.error =
                error || `Không tìm thấy mô hình CSDL (${model_name}/${table_name}) theo yêu cầu`;
            next();
            return;
        }

        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }

        // console.log(myModels[table_name]);

        req.finalJson = {
            structure: JSON.parse(myModels[table_name].getStructure()),
            uniques: myModels[table_name].getUniques(),
        };
        next();
    }



    /**
     * (50) POST /media/models/convert-json-2-params
     * 
     * Chuyển post json sang tham số ?param req
     * Hỗ trợ chuyển json sang tham số string để truyền sau dấu? Dùng để hỗ trợ việc truy vấn mệnh đề wheres
     * 
     * 
     * 
     * SAMPLE INPUTS:  {"abc_1":"null","name":"I'm a student (là đây)","path":"/user/cuong-dq/ip-ABC xyz.js","email":"cuong.dq@mobifone.vn","xyz_324y":"false","key_x":{"$like":"*xx*_","$lte":"Cộng hòa xã hội chủ nghĩa việt nam","$gte":"5","$in":["1","2"],"$nin":["3","4"],"$lt":"7"},"$and":[{"$or":[null]},{"$or":[null]}]}
     */
    convertJson2Params(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        req.finalJson = convertWheres.convertJson2GetParams(req.json_data);
        next();

    }


    /**
     * (51) GET /media/models/convert-params-2-json
     * 
     * Kiểm tra chuyển ?wheres={key_name:{$like:*n*}}
     * Hỗ trợ kiểm tra chuyển một chuỗi giả json để tạo ra một json chuẩn. Nếu chuyển được thì sử dụng mệnh đề đó đưa vào request
     * 
     * 
     * 
     * SAMPLE INPUTS:  {abc_1:null , name: I'm^a^student^(là^đây), path: /user/cuong-dq/ip-ABC^xyz.js, email:cuong.dq@mobifone.vn, xyz_324y:false,key_x:{$like:*xx*_,$lte: Cộng^hòa^xã^hội^chủ^nghĩa^việt^nam, $gte: 5, $in: [1, 2], $nin: [3, 4], $lt: 7 },$and:[{ $or: [{ qty: { $lt: 10 } }, { qty: { $gt: 50 } }] },{ $or: [{ sale: true }, { price: { $lt: 5 } }]}]}
     */
    convertParams2Json(req, res, next) {

        let { wheres } = req.paramS;

        if (!wheres) {
            req.error = "Không có dữ liệu theo yêu cầu. Phải truyền mệnh đề ?wheres={}";
            next();
            return;
        }

        req.finalJson = convertWheres.convertGetParam2JsonWhere(wheres);
        next();

    }


    /**
     * (52) POST /media/models/convert-json-2-where-clause
     * 
     * Kiểm tra chuyển đổi where mongo cho sql
     * Hỗ trợ kiểm tra mệnh đề where sử dụng cho các csdl RDMS
     * 
     * 
     * 
     * SAMPLE INPUTS:  {"abc_1":"null","name":"I'm a student (là đây)","path":"/user/cuong-dq/ip-ABC xyz.js","email":"cuong.dq@mobifone.vn","xyz_324y":"false","key_x":{"$like":"*xx*_","$lte":"Cộng hòa xã hội chủ nghĩa việt nam","$gte":"5","$in":["1","2"],"$nin":["3","4"],"$lt":"7"},"$and":[{"$or":[null]},{"$or":[null]}]}
     */
    convertJson2WhereClause(req, res, next) {


        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        req.finalJson = convertWheres.convertJson2WhereSql(req.json_data);
        next();

    }


    /**
     * (53) GET /media/models/convert-params-2-where-clause
     * 
     * Chuyển đổi mệnh đề where paramS sang sql
     * Giúp kiểm tra khai báo mệnh đề where hợp lý khi đưa tham số vào để xác định mệnh đề where đúng cho csdl RDMS
     * 
     * 
     * 
     * SAMPLE INPUTS:  {abc_1:null , name: I'm^a^student^(là^đây), path: /user/cuong-dq/ip-ABC^xyz.js, email:cuong.dq@mobifone.vn, xyz_324y:false,key_x:{$like:*xx*_,$lte: Cộng^hòa^xã^hội^chủ^nghĩa^việt^nam, $gte: 5, $in: [1, 2], $nin: [3, 4], $lt: 7 },$and:[{ $or: [{ qty: { $lt: 10 } }, { qty: { $gt: 50 } }] },{ $or: [{ sale: true }, { price: { $lt: 5 } }]}]}
     */
    convertParams2WhereClause(req, res, next) {

        let { wheres } = req.paramS;

        if (!wheres) {
            req.error = "Không có dữ liệu theo yêu cầu. Phải truyền mệnh đề ?wheres={}";
            next();
            return;
        }

        req.finalJson = convertWheres.convertJson2WhereSql(convertWheres.convertGetParam2JsonWhere(wheres));
        next();

    }

    /**
       * (54) POST /media/models/run-script/:model_name
       * 
       * Chạy lệnh trực tiếp của csdl
       * Công cụ này hỗ trợ chay các lệnh sql trực tiếp từ xa thông qua hàm API. Hoặc chạy các lệnh trực tiếp của mongodb... Thông qua API
       * 
       * - Yêu cầu ĐƯỢC PHÂN QUYỀN
       * 
       * SAMPLE INPUTS:  [{"script":"select * from dual"}]
       */
    runScriptModelname(req, res, next) {

        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực

        let modelNames = Object.keys(myModels);
        if (!modelNames.length) {
            req.error = `Không tìm thấy bảng nào trong mô hình ${model_name}`;
            next();
            return;
        }

        let dynamicModel = myModels[modelNames[0]];
        if (!dynamicModel) {
            req.error = `Không tìm thấy bảng ${modelNames[0]} trong mô hình ${model_name}`;
            next();
            return;
        }

        let database = dynamicModel.getDb();
        if (!database) {
            req.error = `Không tìm Database trong mô hình ${model_name}`;
            next();
            return;
        }

        // csdl thực giao tiếp 
        const dbDao = database.getDbInstance();

        if (!dbDao) {
            req.error = `Không tìm thấy instance db trong mô hình ${model_name}`;
            next();
            return;
        }

        if (!dbDao.runAnySql) {
            req.error = `Instance db không hỗ trợ chạy script`;
            next();
            return;
        }

        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let { script } = req.json_data;

        if (!script) {
            req.error = "Không có dữ liệu theo yêu cầu";
            next();
            return;
        }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // console.log("sql",script);

        dbDao.runAnySql(script)
            // trả kết quả truy vấn cho api trực tiếp bằng cách sau
            .then(data => {
                // console.log('Data: ', data);
                req.finalJson = data;
                next();
            })
            .catch(err => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }

    /**
     * (54) POST /lucky-draw/models/drop/:model_name/:table_name
     * 
     * Xóa một bảng của mô hình (*)
     * Hàm này sẽ xóa bảng trong csdl, bao gồm cả các index liên quan của bảng đó. Trường hợp cấu trúc bảng có thay đổi, như các uk, idx, hoặc thêm trường, bớt trường. Thì xóa bảng đi và tạo lại theo mô hình
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  {"model_name":"","table_name":""}
     */
    async dropModelnameTablename(req, res, next) {

        if (!req.json_data) {
            req.error = "Dữ liệu post req.json_data không hợp lệ";
            next();
            return;
        }

        let reqParams = req.json_data;

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // kiểm tra mô hình tồn tại hay chưa?
        // và có cấp quyền delete không?
        // kiểm tra cắt lấy mô hình đã được định nghĩa trong csdl
        let { model_name, table_name, myModels, error } = getTableModels(req);

        // đảm bảo mô hình đã được tạo rồi mới được truy vấn cái này
        // xác định sự tồn tại của bảng cấu trúc mô hình đã khởi tạo xong
        if (!myModels) {
            req.error =
                error || "Không tìm thấy mô hình CSDL (database name) theo yêu cầu";
            next();
            return;
        }

        // trả về mô hình thực
        let uModel = myModels[table_name];
        if (!uModel) {
            req.error = `Không tìm thấy bảng ${table_name} trong mô hình ${model_name}`;
            next();
            return;
        }

        // xác định user đã login
        if (!req.user || !req.user.username) {
            req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
            next();
            return;
        }

        // xác thực phân quyền của user truy cập bảng chức năng Delete
        if (
            !(await verifyTablePrivileges(
                req.user.username,
                "D",
                model_name,
                table_name
            ))
        ) {
            req.error = `Bạn không có quyền DROP/DELETE bảng ${table_name} của mô hình ${model_name} vui lòng liên hệ quản trị hệ thống`;
            next();
            return;
        }

        if (reqParams.model_name !== model_name || reqParams.table_name !== table_name) {
            req.error = "Dữ liệu yêu cầu xóa không hợp lệ req.paramS !== req.params!";
            next();
            return;
        }

        // xóa bảng trong mô hình
        uModel
            .drop()
            .then(ok => {
                // console.log('Data: ', data);
                req.finalJson = `Đã xóa bảng ${table_name} trong mô hình ${model_name} thành công!`;
                next();
            })
            .catch((err) => {
                // console.log('Lỗi: ', err);
                req.error = err;
                next();
            });
    }
}

module.exports = new ModelsHandler();