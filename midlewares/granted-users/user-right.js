// Đây là thủ tục tạo tự động từ ./test/create-api-functions/1-create-main-entries.js by cuong.dq
  
// Đây là hàm kiểm tra quyền trong csdl 
// khai báo lại mô hình
const { function_apis, function_groups, function_granted } = require("./models");
// debug để check quyền
const isDebug = false;

/**
 * Kiểm tra quyền, bởi, phương thức, api, chức năng, và username
 * Ví dụ: POST, /api, /verify-proxy-token, cuong.dq
 *
 * @param {*} method
 * @param {*} api
 * @param {*} func
 * @param {*} username
 */
module.exports = async (method, api, func, username) => {
    try {
        // getApi
        let apiFuncs = await function_apis.getFirstRecord(
            {
                api_function: func
                , api_router: api
                , method
            }
            , {
                id: 1
                , has_token: 1
                , has_granted: 1
                , has_log: 1
                , status: 1
            }
        )
        // nếu không cần phân quyền cho chức năng này thì trả về true
        if (isDebug) console.log("TEST 1", apiFuncs);
        if (
            !apiFuncs ||
            (apiFuncs && !apiFuncs.has_granted) ||
            (apiFuncs && !apiFuncs.id)
        ) {
            return true;
        }
        // đây là id cần phải phân quyền thực hiện
        let fId = apiFuncs.id;
        if (isDebug) console.log("ID", fId);
        // lấy quyền được cấp cho user
        // trả về { function_groups: '[]', function_apis: '[]' }
        let objGranted = await function_granted.getFirstRecord({ username }, { function_groups: 1, function_apis: 1 })
        let userGranted = JSON.parse(
            JSON.stringify(objGranted
                , (key, value) => {
                    // chuyển đổi chuỗi thành array
                    if (value && (key === "function_groups"
                        || key === "function_apis"))
                        return JSON.parse(value);
                    // trả về giá trị cũ
                    return value;
                }))

        // nếu user chưa được cấp quyền thì trả về false
        if (isDebug) console.log("TEST 2", userGranted,);
        if (
            !userGranted ||
            (userGranted &&
                !userGranted.function_groups &&
                !userGranted.function_apis) ||
            (userGranted &&
                userGranted.function_groups &&
                !userGranted.function_groups.length &&
                userGranted.function_apis &&
                !userGranted.function_apis.length)
        ) {
            throw "Bạn không được cấp quyền thực hiện chức năng này-Granted";
        }
        // nếu chức năng đã được phân quyền thì trả về true
        if (isDebug) console.log("fIds", fId, userGranted.function_apis, typeof fId, typeof userGranted.function_apis);
        if (
            userGranted.function_apis &&
            (userGranted.function_apis.includes(fId)
                || userGranted.function_apis.includes(parseInt(fId)))
        ) {
            return true;
        }

        // nếu được phân quyền trong nhóm thì kiểm tra quyền trong nhóm
        if (userGranted.function_groups && userGranted.function_groups.length) {
            let arrGroups = await function_groups.getAllData(
                {
                    id: {
                        $in: userGranted.function_groups
                    }
                }
                , { function_apis: 1 }
            )

            let arrJson =
                JSON.parse(
                    JSON.stringify(arrGroups
                        , (key, value) => {
                            // chuyển đổi mảng chức năng thành array
                            if (key === "function_apis" && value) return JSON.parse(value);
                            return value;
                        }
                    )
                );
            // gộp các quyền với nhau
            let apis = arrJson.map(o => o["function_apis"]); //  [[{key:value},...],[{key:value},...]]=>[[value,...],[value,...]]
            let apisOfGroup = [].concat.apply([], apis);          //  [[],[]] => [];
            if (isDebug) console.log("APIS apisOfGroup", apisOfGroup);
            // kết quả trả về là [id1,id2,...]
            if (isDebug) console.log("GroupId - fid", apisOfGroup);
            if (apisOfGroup &&
                (
                    apisOfGroup.includes(fId)
                    || apisOfGroup.includes(parseInt(fId))
                )
            ) {
                return true;
            }
        }
    } catch (e) {
        // console.log(`Lỗi kiểm tra quyền của user ${username}`, e)
        throw `Check user right of ${username} with error: ${e}`;
    }
    throw "Bạn không được cấp quyền thực hiện chức năng này-ALL";
}