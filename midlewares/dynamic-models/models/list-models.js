/**
 * Lớp này sẽ thực hiện giao tiếp với bảng mô hình, thực thi các nhiệm vụ gồm:
 * - Mở rộng của lớp models ở 
 */

// lớp mở rộng của bảng mô hình trong csdl lưu trữ mô hình
const Models = require("../../granted-users/models/models");
// kế thừa mô hình bảng lưu trữ danh mục bảng của mô hình để phân quyền
const { table_models } = require("../../granted-users/models");

const { convertPath2ObjectName } = require("cng-node-js-utils");
const {
    DynamicModel,
    json2Model,
    models
} = require("node-js-orm");

// csdl nhúng mặt định của user-rights
const dbConfig = require("../config");
const { dbConnectionAny } = dbConfig;

// biến toàn cục lưu giữ các mô hình đã được khởi tạo load lên
// khi một mô hình kết nối thành công csdl, có cấu trúc được thiết kế và khởi tạo thành công thì ghi vào đây
// để khi truy xuất, chỉ cần lấy ở đây ra là được, không cần phải thực hiện các thao tác thêm
const LIST_MODELS = new Map();

// Tập lưu trữ kết nối csdl duy nhất theo kiểu và tên 
// nếu cùng kiểu và tên là duy nhất 
// key = `${db_type}#${db_name}` và value là dbConnection để không bị tạo nhiều connection nhé 
const DATABASE_CONNECTIONS = new Map();
// khi xóa mô hình, nếu csdl kết nối không liên kết với mô hình nào thì đóng csdl lại thôi chứ?

// khai báo lớp này là mở rộng của lớp Models trong mô hình granted-users
class ListModels extends Models {
    constructor(db) {
        super(db);
        // khởi tạo mô hình cha của nó
        this.dbModels = db;
        db.waitingConnected()
            .then(ok => {
                this.reload();
            })
            .catch(err => {
                console.log('Lỗi kết nối csdl từ điển mô hình:', err);
            });
    }

    // các hàm kế thừa mặt định của lớp Models cha, và Model lớp trên của nó gồm:
    // getCount(...), getPage(...), ... như bình thường

    // Viết các hàm thêm gồm:

    /**
     * Thủ tục khởi tạo trước các mô hình đã lưu
     * 
     */
    reload() {
        // 1. đọc danh sách mô hình đã lưu trong csdl,  bỏ qua các trạng thái = -1?
        this.getAllData({ status: { $ne: -1 } }, { model_name: 1, status: 1 })
            .then(arrModels => {
                if (!arrModels || !Array.isArray(arrModels)) {
                    throw "Không có mô hình nào được khởi tạo";
                }
                // duyệt hết mô hình đã định nghĩa - lọc theo status?
                for (let model of arrModels) {
                    this.getTableModels(model.model_name, true)
                        .then(myModels => {
                            console.log(`Đã khởi tạo thành công mô hình ${model.model_name} với số lượng BẢNG(MÔ HÌNH) là: `, Object.keys(myModels).length);
                        })
                        .catch(errIn => {
                            console.log(`Lỗi khởi tạo mô hình  ${model.model_name}:`, errIn);
                        });
                }

            })
            .catch(err => {
                console.log('Lỗi đọc reload mô hình: ', err);
            });

    }


    /**
     * Định nghĩa một cấu trúc mô hình mới 
     * (chèn một bảng ghi mới, ktra kết nối csdl thành công, các tham số vào thành công thì khởi tạo)
     * @param {*} model_name là tên của mô hình cần khai báo
     * @param {*} jsonModelConnection là đối tượng lưu cấu trúc kết nối csdl và tên mô hình
     * OUTPUT: - mở kết nối csdl + chèn một bảng ghi + tạo bảng cấu trúc
     */
    createOneModel(model_name, jsonModelConnection = {}) {
        if (!model_name
            || typeof model_name !== "string"
            || !jsonModelConnection
            || typeof jsonModelConnection !== "object"
            || !Object.keys(jsonModelConnection).length
            || (!jsonModelConnection.db_connection
                && !jsonModelConnection.db_type
                && !jsonModelConnection.db_name)
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord(
            { model_name }
            , {
                model_name: 1
                , db_type: 1
                , db_name: 1
                , db_connection: 1
                , status: 1
            }
        )
            .then(async model => {
                if (!model || !model.model_name) {
                    // nếu chưa có thì tạo mới mô hình
                    let myDbConnection;
                    if (jsonModelConnection.db_connection) {
                        myDbConnection = dbConfig[convertPath2ObjectName(jsonModelConnection.db_connection)];
                    } else if (jsonModelConnection.db_type && jsonModelConnection.db_name) {
                        myDbConnection = DATABASE_CONNECTIONS.get(`${jsonModelConnection.db_type}#${jsonModelConnection.db_name}`) || dbConnectionAny(jsonModelConnection.db_type, jsonModelConnection.db_name);
                    }

                    if (!myDbConnection) {
                        throw `Kết nối csdl không hợp lệ. Vui lòng kiểm tra lại db_connection=${jsonModelConnection.db_connection} hoặc db_type=${jsonModelConnection.db_type} và db_name=${jsonModelConnection.db_name}!`
                    }

                    // đợi kết nối csdl thành công thì mới tạo được
                    await myDbConnection.waitingConnected()
                        .catch(err => {
                            throw err
                        });

                    // kết nối dữ liệu đã thông --> tạo cấu trúc bảng để lưu cấu trúc mô hình - chèn dữ liệu vào bảng models
                    if (jsonModelConnection.db_type && jsonModelConnection.db_name) {
                        DATABASE_CONNECTIONS.set(`${jsonModelConnection.db_type}#${jsonModelConnection.db_name}`, myDbConnection);
                    }

                    // định nghĩa mô hình cho bảng cấu trúc csdl
                    let myModel = new DynamicModel(
                        this.dbModels,                     // sơ sở dữ liệu gốc
                        model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                        json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                    );

                    // tạo cấu trúc bảng để lưu cấu trúc csdl mô hình thực
                    await myModel.sync()
                        .catch((err) => {
                            throw err;
                        });

                    // lưu dữ liệu vào bảng mô hình
                    await this.insertOneRecord({
                        model_name,
                        db_type: jsonModelConnection.db_type,
                        db_name: jsonModelConnection.db_name,
                        db_connection: jsonModelConnection.db_connection,
                        name: jsonModelConnection.name,
                        description: jsonModelConnection.description,
                        created_date: Date.now(),
                        updated_time: Date.now(),
                        updated_user: jsonModelConnection.updated_user,
                        status: 0
                    })
                        .catch((err) => {
                            throw err;
                        });

                    return `Đã tạo bảng để lưu mô hình ${model_name} thành công với kết nối csdl ${(jsonModelConnection.db_connection ?
                        `./config/index.js{${convertPath2ObjectName(jsonModelConnection.db_connection)}}`
                        : `./db/db-connection-any(${jsonModelConnection.db_type},${jsonModelConnection.db_name})`
                    )}`;
                }
                throw `Mô hình ${model_name} đã tồn tại`;
            })
    }


    /**
     * Chỉnh sửa mô hình (do kết nối csdl có thay đổi khác)
     * @param {*} model_name 
     * @param {*} jsonModelConnection 
     * OUTPUT: - tạo kết nối csdl + tạo cấu trúc bảng + update lại bảng ghi trong models
     */
    editOneModel(model_name, jsonModelConnection = {}) {
        // kiểm tra mô hình đã tồn tại chưa
        if (!model_name
            || typeof model_name !== "string"
            || !jsonModelConnection
            || typeof jsonModelConnection !== "object"
            || !Object.keys(jsonModelConnection).length
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
            .then(async model => {
                if (!model || !model.model_name) {
                    throw `Mô hình ${model_name} KHÔNG TỒN TẠI - vui lòng kiểm tra lại`;
                }

                // nếu sửa mà không thay đổi kết nối csdl thì lấy lại kết nối củ
                if (!jsonModelConnection.db_connection && !jsonModelConnection.db_type && !jsonModelConnection.db_name) {
                    jsonModelConnection.db_connection = model.db_connection;
                    jsonModelConnection.db_type = model.db_type;
                    jsonModelConnection.db_name = model.db_name;
                }

                // nếu chưa có thì tạo mới mô hình
                let myDbConnection;
                if (jsonModelConnection.db_connection) {
                    myDbConnection = dbConfig[convertPath2ObjectName(jsonModelConnection.db_connection)];
                } else if (jsonModelConnection.db_type && jsonModelConnection.db_name) {
                    myDbConnection = DATABASE_CONNECTIONS.get(`${jsonModelConnection.db_type}#${jsonModelConnection.db_name}`) || dbConnectionAny(jsonModelConnection.db_type, jsonModelConnection.db_name);
                }

                if (!myDbConnection) {
                    throw `Kết nối csdl không hợp lệ. Vui lòng kiểm tra lại db_connection=${jsonModelConnection.db_connection} hoặc db_type=${jsonModelConnection.db_type} và db_name=${jsonModelConnection.db_name}!`
                }

                // đợi kết nối csdl thành công thì mới tạo được
                await myDbConnection.waitingConnected()
                    .catch(err => { throw err });

                // kết nối dữ liệu đã thông --> tạo cấu trúc bảng để lưu cấu trúc mô hình - chèn dữ liệu vào bảng models
                if (jsonModelConnection.db_type && jsonModelConnection.db_name) {
                    DATABASE_CONNECTIONS.set(`${jsonModelConnection.db_type}#${jsonModelConnection.db_name}`, myDbConnection);
                }

                // định nghĩa mô hình cho bảng cấu trúc csdl
                let myModel = new DynamicModel(
                    this.dbModels,                     // sơ sở dữ liệu gốc
                    model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                    json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                );

                // tạo cấu trúc bảng để lưu cấu trúc csdl mô hình thực
                await myModel.sync()
                    .catch((err) => {
                        throw err;
                    });

                // lưu dữ liệu vào bảng mô hình
                await this.updateOneRecord({
                    // ...JSON.parse(JSON.stringify(jsonModelConnection,(key,value)=>{
                    //     if (value===null) return undefined; // đổi biến giá trị null thành không có giá trị để khỏi bị lỗi
                    //     return value;
                    // })),
                    ...jsonModelConnection,
                    updated_time: Date.now(),
                    status: 0
                }, { model_name })
                    .catch((err) => {
                        throw err;
                    });

                return `Đã đồng bộ cấu trúc bảng để lưu mô hình ${model_name} thành công cho thay đổi của bạn, với kết nối csdl ${(jsonModelConnection.db_connection ?
                    `./config/index.js{${convertPath2ObjectName(jsonModelConnection.db_connection)}}`
                    : `./db/db-connection-any(${jsonModelConnection.db_type},${jsonModelConnection.db_name})`
                )}`;
            })

    }

    /**
     * Xóa bỏ một mô hình csdl (tức là xóa bỏ cấu bảng ghi trong cấu trúc, xóa bỏ luôn bảng cấu trúc csdl, xóa luôn các bảng ghi trong table_models để khi phân quyền sẽ không truy xuất được nữa)
     * @param {*} model_name 
     */
    deleteOneModel(model_name) {
        // kiểm tra mô hình đã tồn tại chưa
        if (!model_name
            || typeof model_name !== "string"
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
            .then(async model => {
                if (!model || !model.model_name) {
                    throw `Mô hình ${model_name} KHÔNG TỒN TẠI - vui lòng kiểm tra lại`;
                }
                // lấy kết nối csdl - dừng kết nối csdl??? -- ảnh hưởng đến các mô hình đang hoạt động dùng chung kết nối?

                // xóa đối tượng đã load mô hình
                if (LIST_MODELS.get(model_name)) {
                    LIST_MODELS.delete(model_name);
                }

                // xóa bảng chứa cấu trúc csdl của mô hình - chưa viết hàm drop table
                // this.dbModels.dropTable(model_name.replace(/\-/g, "_"));

                // xóa luôn bảng ghi trong mô hình này
                await this.deleteOneRecord({ model_name })
                    .catch(err => { throw err });

                // xóa luôn các bảng đã tạo trong danh mục phân quyền - các quyền bảng sẽ mồ côi
                await table_models.deleteAll({ model_name })
                    .catch(err => { throw err });

                return `Đã xóa mô hình ${model_name} thành công`;
            })
    }


    /**
     * Tạo một cấu trúc csdl (tạo bảng lưu cấu trúc csdl thực)
     * Điều kiện là trong bảng models đã tồn tại mô hình này
     * @param {*} model_name 
     */
    createModelStructure(model_name) {
        // kiểm tra mô hình đã tồn tại chưa
        if (!model_name
            || typeof model_name !== "string"
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
            .then(async model => {
                if (!model || !model.model_name) {
                    throw `Mô hình ${model_name} KHÔNG TỒN TẠI - vui lòng kiểm tra lại`;
                }

                // nếu chưa có thì tạo mới mô hình
                let myDbConnection;
                if (model.db_connection) {
                    myDbConnection = dbConfig[convertPath2ObjectName(model.db_connection)];
                } else if (model.db_type && model.db_name) {
                    myDbConnection = DATABASE_CONNECTIONS.get(`${model.db_type}#${model.db_name}`) || dbConnectionAny(model.db_type, model.db_name);
                }

                if (!myDbConnection) {
                    console.log("Model***", model);
                    throw "Kết nối csdl không hợp lệ. Vui lòng kiểm tra lại db_connection hoặc db_type và db_name!"
                }

                // đợi kết nối csdl thành công thì mới tạo được
                await myDbConnection.waitingConnected()
                    .catch(err => { throw err });

                // kết nối dữ liệu đã thông --> tạo cấu trúc bảng để lưu cấu trúc mô hình - chèn dữ liệu vào bảng models
                if (model.db_type && model.db_name) {
                    DATABASE_CONNECTIONS.set(`${model.db_type}#${model.db_name}`, myDbConnection);
                }

                // định nghĩa mô hình cho bảng cấu trúc csdl
                let myModel = new DynamicModel(
                    this.dbModels,                     // sơ sở dữ liệu gốc
                    model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                    json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                );

                // tạo cấu trúc bảng để lưu cấu trúc csdl mô hình thực
                await myModel.sync()
                    .catch((err) => {
                        throw err;
                    });

                // lưu dữ liệu vào bảng mô hình
                await this.updateOneRecord({
                    updated_time: Date.now(),
                    status: 0
                }, { model_name })
                    .catch((err) => {
                        throw err;
                    });

                return `Đã tạo cấu trúc bảng để lưu mô hình ${model_name} thành công`;
            })

    }

    /**
     * Import cấu trúc csdl thực vào
     * @param {*} model_name 
     * @param {*} arrDbStructure =[]
     * @param {*} where_keys =[]
     */
    importModelStructure(model_name, arrDbStructure = [], where_keys) {
        // kiểm tra mô hình đã tồn tại chưa
        if (!model_name
            || typeof model_name !== "string"
            || !arrDbStructure
            || !Array.isArray(arrDbStructure)
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
            .then(async model => {
                if (!model || !model.model_name) {
                    throw `Mô hình ${model_name} KHÔNG TỒN TẠI - vui lòng kiểm tra lại`;
                }

                // nếu chưa có thì tạo mới mô hình
                let myDbConnection;
                if (model.db_connection) {
                    myDbConnection = dbConfig[convertPath2ObjectName(model.db_connection)];
                } else if (model.db_type && model.db_name) {
                    myDbConnection = DATABASE_CONNECTIONS.get(`${model.db_type}#${model.db_name}`) || dbConnectionAny(model.db_type, model.db_name);
                }

                if (!myDbConnection) {
                    throw "Kết nối csdl không hợp lệ. Vui lòng kiểm tra lại db_connection hoặc db_type và db_name!"
                }

                // đợi kết nối csdl thành công thì mới tạo được
                await myDbConnection.waitingConnected()
                    .catch(err => { throw err });

                // kết nối dữ liệu đã thông --> tạo cấu trúc bảng để lưu cấu trúc mô hình - chèn dữ liệu vào bảng models
                if (model.db_type && model.db_name) {
                    DATABASE_CONNECTIONS.set(`${model.db_type}#${model.db_name}`, myDbConnection);
                }

                // định nghĩa mô hình cho bảng cấu trúc csdl
                let myModel = new DynamicModel(
                    this.dbModels,                     // sơ sở dữ liệu gốc
                    model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                    json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                );

                // tạo cấu trúc bảng để lưu cấu trúc csdl mô hình thực
                await myModel.sync()
                    .catch((err) => {
                        throw err;
                    });

                // thực hiện import dữ liệu nếu trùng thì update
                // console.log("XXX", where_keys);
                return await myModel.importRowsUpdates(arrDbStructure,where_keys)
                    .catch((err) => {
                        throw err;
                    });
            })
    }

    /**
     * Đồng bộ cấu trúc csdl đã lưu với csdl gốc (tức là tạo bảng)
     * Yêu cầu, có kết nối csdl đã khai trong models, đã tạo bảng lưu cấu trúc và đã import cấu trúc thành công
     * @param {*} model_name 
     * @param {*} table_name 
     */
    syncRealDatabase(model_name, table_name) {
        // kiểm tra mô hình đã tồn tại chưa
        if (!model_name
            || typeof model_name !== "string"
        ) {
            return Promise.reject("Dữ liệu đầu vào không hợp lệ")
        }

        // kiểm tra mô hình đã có trong csdl chưa? nếu có rồi thì trả về lỗi không tạo mới mà báo có rồi
        return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
            .then(async model => {
                if (!model || !model.model_name) {
                    throw `Mô hình ${model_name} KHÔNG TỒN TẠI - vui lòng kiểm tra lại`;
                }

                console.log(`Model--->${model_name}`, model);

                // nếu chưa có thì tạo mới mô hình
                let myDbConnection;
                if (model.db_connection) {
                    myDbConnection = dbConfig[convertPath2ObjectName(model.db_connection)];
                } else if (model.db_type && model.db_name) {
                    myDbConnection = DATABASE_CONNECTIONS.get(`${model.db_type}#${model.db_name}`) || dbConnectionAny(model.db_type, model.db_name);
                }

                
                if (!myDbConnection) {
                    throw "Kết nối csdl không hợp lệ. Vui lòng kiểm tra lại db_connection hoặc db_type và db_name!"
                }
                
                // trả chuỗi kết nối csdl chính thức
                
                // đợi kết nối csdl thành công thì mới tạo được
                await myDbConnection.waitingConnected()
                .catch(err => { throw err });
                
                console.log(`myDbConnection---> ${model_name} CONNECTED IN:`, `${myDbConnection.getDbConfig().type}#${myDbConnection.getDbConfig().database}`);


                // kết nối dữ liệu đã thông --> tạo cấu trúc bảng để lưu cấu trúc mô hình - chèn dữ liệu vào bảng models
                if (model.db_type && model.db_name) {
                    DATABASE_CONNECTIONS.set(`${model.db_type}#${model.db_name}`, myDbConnection);
                }

                // định nghĩa mô hình cho bảng cấu trúc csdl
                let myModel = new DynamicModel(
                    this.dbModels,                     // sơ sở dữ liệu gốc
                    model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                    json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                );

                // 7. Đọc lại từ csdl lấy mô hình chuyển sang
                // nếu chỉ rõ bảng thì chỉ tạo 1 bảng thôi
                let jsonTables = await myModel.getAllData({ table_name });
                let jsonTextModels = json2Model.array2JsonTexts(jsonTables);

                let realModels = models(myDbConnection, jsonTextModels);

                // console.log("realModels--->", realModels);

                // 8. Tạo bảng cho csdl từ mô hình
                let createTable = [];
                for (let tableName in realModels) {
                    createTable.push(realModels[tableName].sync());
                }

                return await Promise.all(createTable)

            })
    }



    /**
     * Lấy một mô hình để giao tiếp csdl CRUD
     * INPUT: mô hình đã được khởi tạo ở LIST_MODELS
     * OUTPUT: trả về đúng mô hình truy xuất của bảng hoặc null
     * @param {*} model_name 
     * @param {*} table_name 
     */
    getTableModel(model_name, table_name) {
        if (!LIST_MODELS.get(model_name)) {
            return null;
        }
        // trả về mô hình giao tiếp csdl
        return LIST_MODELS.get(model_name)[table_name];
    }

    /**
     * Trả về các mô hình csdl đã khởi tạo
     * INPUT: có bảng ghi mô hình ở models kết nối được csdl chính + bảng cấu trúc mô hình đã tạo và đã import
     * OUTPUT: là một Promise kết quả {table_name: dynamicModel,...} là danh sách các bảng của mô hình thực nếu thành công
     * @param {*} model_name  // tên mô hình lưu trong bảng để khởi tạo mô hình này thôi
     * @param {*} isReload    // biến khai báo = true thì đọc và khởi tạo lại, nếu không thì lấy từ bộ nhớ ra thôi
     * Sẽ tự động load mỗi khi có thay đổi cấu trúc hoặc kết nối csdl mới
     */
    getTableModels(model_name, isReload) {
        if (!this.dbModels) {
            return Promise.reject("Không có kết nối csdl lưu mô hình");
        }
        // đợi csdl kết nối thành công mới lấy dữ liệu
        return this.dbModels.waitingConnected()
            .then(ok => {
                // 1. Đọc lấy bảng ghi có tên mô hình
                return this.getFirstRecord({ model_name }, { model_name: 1, db_type: 1, db_name: 1, db_connection: 1, status: 1 })
                    .then(async model => {
                        // 2. không tìm thấy mô hình được định nghĩa trước
                        if (!model || !model.model_name) {
                            throw "Không tìm thấy mô hình khai báo trong models";
                        }
                        // 3. nếu không cần load lại và tìm thấy mô hình đã khởi tạo thì trả ngay kết quả luôn
                        if (!isReload && LIST_MODELS.get(model.model_name)) {
                            return LIST_MODELS.get(model.model_name);
                        }

                        // nếu bảng đã được tạo thì sẽ không tạo nữa
                        // bảng chứa mô hình thực, (Xem bảng đã tạo chưa? --> tức sync())
                        // 4. Tạo mô hình giao tiếp động với bảng mô hình
                        let myModel = new DynamicModel(
                            this.dbModels,                     // sơ sở dữ liệu gốc
                            model.model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
                            json2Model.modelConfig  // cấu hình cấu trúc bảng mặt định
                        );

                        // 5. đọc cả bảng mô hình (chuyển dấu - thành dấu _ nếu cố tình nhập)
                        let jsonTables = await myModel.getAllData()
                            .catch(err => { throw "Mô hình chưa được tạo (hoặc lỗi) - vui lòng khởi tạo trước khi sử dụng chức năng này" });
                        const jsonTextModels = json2Model.array2JsonTexts(jsonTables);

                        if (!Object.keys(jsonTextModels).length) {
                            throw "Mô hình chưa có bảng thiết kế csdl - vui lòng import cấu trúc csdl của mô hình trước khi sử dụng";
                        }

                        //  6. Lấy kết nối csdl chính thức được khai báo ở ./db/config trùng với db-Model-Name
                        // hoặc tự tạo ra kết nối riêng theo tham số db_type và db_name
                        // ưu tiên trước là chuỗi kết nối khai cứng
                        let myDbConnection;
                        if (model.db_connection) {
                            myDbConnection = dbConfig[convertPath2ObjectName(model.db_connection)];
                        } else if (model.db_type && model.db_name) {
                            myDbConnection = DATABASE_CONNECTIONS.get(`${model.db_type}#${model.db_name}`) || dbConnectionAny(model.db_type, model.db_name);
                        }

                        if (!myDbConnection) {
                            throw "Không có kết nối csdl hợp lệ!"
                        }

                        // 7. Kiểm tra kết nối csdl thực sau khi đã có kết nối hợp lệ, đợi kết nối csdl thử thành công thì ok nếu không thành công thì báo lỗi
                        await myDbConnection.waitingConnected()
                            .catch(err => { throw err });

                        // lưu lại kết nối để không phải khởi tạo lại 
                        if (model.db_type && model.db_name) {
                            DATABASE_CONNECTIONS.set(`${model.db_type}#${model.db_name}`, myDbConnection);
                        }

                        // đây là danh sách mô hình 
                        let myModels = models(myDbConnection, jsonTextModels);

                        // chèn mô hình và tên bảng vào csdl bảng table_models để phân quyền và quản lý
                        for (let table_name in myModels) {
                            await table_models.insertOneRecord({
                                model_name,
                                table_name,
                                name: `${model_name}/${table_name}`,
                                updated_time: Date.now(),
                                status: 1 // mặt định kích hoạt cho truy vấn bảng này
                            })
                                // do nothing khi khi đã tồn tại trong csdl
                                .catch(err => { })
                        }

                        // cập nhập trạng thái mô hình đã khởi tạo
                        this.updateOneRecord({
                            updated_time: Date.now(),
                            status: 1 // mô hình đã khởi tạo thành công
                        }, { model_name })
                            .catch(err => { })

                        // 8. đã có cấu trúc bảng mô hình và csdl kết nối thực hoạt động
                        // Thực hiện Khởi tạo các mô hình giao tiếp dữ liệu thực
                        LIST_MODELS.set(model.model_name, myModels);

                        // 9. Trả kết quả về cho lệnh getModel(model_name);
                        return LIST_MODELS.get(model.model_name);
                        // console.log('Data: ', data);
                    })
                    .catch(err => { throw err })
            })
    }

    /**
     * Trả về đối tượng chứa key=table, value=new DynamicModel() nếu có
     * @param {*} model_name 
     */
    getMainModels(model_name) {
        return LIST_MODELS.get(model_name);
    }

    /**
     * Trả về danh sách chi tiết cấu trúc csdl thực kiểu phân trang 
     * @param {*} model_name 
     */
    getDetailModel(model_name, jsonWhere, jsonFields, jsonSort, jsonPage) {

        let myModel = new DynamicModel(
            this.dbModels,                        // sơ sở dữ liệu gốc
            model_name.replace(/\-/g, "_"),       // tên bảng chứa danh sách các mô hình - chuyển đổi dấu - thành _ nếu có
            json2Model.modelConfig                // cấu hình cấu trúc bảng mặt định
        );

        return myModel.getPage(jsonWhere, jsonFields, jsonSort, jsonPage);
    }

}

// khởi tạo luôn lớp này trả về để giao tiếp
module.exports = ListModels;