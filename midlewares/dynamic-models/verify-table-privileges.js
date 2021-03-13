// lấy 2 mô hình cố định để khai báo
const {
    function_granted,
    table_groups,
    table_models,
} = require("../granted-users/models");


// hàm kiểm tra quyền tác động đến bảng trực tiếp (CRUD) - tương ứng cho các hàm:
//  C = import/insert, 
//  R = get/post-page, get/post-1-record
//  U = Update
//  D = Delete
// nếu user không được cấp quyền tác động CRUD ở bảng nào thì sẽ từ chối quyền

/**
 * 
 * @param {*} username 
 * @param {*} CRUD kiểm tra quyền C hay R hay U hay D tương ứng ở trên
 * @param {*} model_name mô hình dữ liệu truy vấn
 * @param {*} table_name tên bảng dữ liệu truy cập vào
 * 
 */
module.exports = async (username, CRUD, model_name, table_name) => {

    try {

        let user = await function_granted
            .getFirstRecord(
                { username }, // jsonWhere
                { username: 1, table_groups: 1, table_models: 1 } // jsonFields
            )

        if (!user || !user.username) {
            return false;
        }

        let tableGroups = [];
        try {
            let group = user.table_groups ? JSON.parse(user.table_groups) : [];
            tableGroups = Array.isArray(group) ? group : [];
        } catch { tableGroups = [] }

        // {C:[],R:[],U:[],D:[]}
        let tableCRUDs = { C: [], R: [], U: [], D: [] };
        try {
            let models = user.table_models ? JSON.parse(user.table_models) : {};
            if (typeof models === "object" && Object.keys(models).length) {
                for (let key in models) {
                    let value = models[key];
                    if (value && Array.isArray(value) && tableCRUDs[key]) {
                        tableCRUDs[key] = [
                            ...new Set([...tableCRUDs[key], ...value]),
                        ];
                    }
                }
            }
        } catch { }

        // lấy toàn bộ nhóm quyền được phân
        // let groupRows = await table_groups.getAllData({ id: { $in: tableGroups }, status: 1 }, { id: 1, table_models: 1 })
        let groupRows = await table_groups.getAllData({id: {$in: tableGroups}}, { id: 1, table_models: 1 })
            .catch((error) => {
                throw error;
            });

        // console.log("Nhóm", username, groupRows, tableCRUDs);

        for (let tGroup of groupRows) {
            try {
                let models = tGroup.table_models ? JSON.parse(tGroup.table_models) : {};
                if (typeof models === "object" && Object.keys(models).length) {
                    for (let key in models) {
                        let value = models[key];
                        if (value && Array.isArray(value) && tableCRUDs[key]) {
                            tableCRUDs[key] = [
                                ...new Set([...tableCRUDs[key], ...value]),
                            ];
                        }
                    }
                }
            } catch { }
        }

        let tId = await table_models.getFirstRecord({ model_name, table_name }, { id: 1 });

        // tất cả quyền của user
        // console.log("User Granted: ", tableCRUDs, tId);

        if (!tableCRUDs[CRUD] || !tId || !tableCRUDs[CRUD].includes(tId.id)) {
            return false;
        }

    } catch (e) {
        // console.log("Lỗi kiểm tra quyền", e);
        return false;
    }

    return true;
}