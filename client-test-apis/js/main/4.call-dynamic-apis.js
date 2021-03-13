/**
 * Thủ tục này gọi đọc các hàm api hiện có của hệ thống
 * tạo menu động theo thiết kế api, phục vụ kiểm thử
 */

// đọc Apis được phân quyền của user liệt kê ra hết
function readUserApis() {
    if (!HOME_PARAMS.token) {
        return;
    }
    fakeLoading(5000, 100);
    callAjaxGETApiAny(`${API_PARAMS.APIs}?page=${1}&limit=${1000}&sorts=id:1`)
        .then((result) => {
            showToast("success", `Đã lấy được danh sách APIs!`);
            createDynamicApis(result);
            showHideLoading(false);
        })
        .catch((err) => {
            if (
                !err.responseJSON ||
                !err.responseJSON.message ||
                typeof err.responseJSON.error === "object"
            )
                console.log(err);
            showToast(
                "error",
                `${err.responseJSON && err.responseJSON.message
                    ? `${err.responseJSON.message} ${typeof err.responseJSON.error === "object"
                        ? JSON.stringify(err.responseJSON.error)
                        : ""
                    }`
                    : `Lỗi truy vấp API ${JSON.stringify(err)}`
                }`,
                "toast-top-right",
                5000
            );
            showHideLoading(false);
        });
}

function callDynamicApis(id) {
    // tham số param là tham số động tự sinh theo chuổi api động đọc được do phân quyền
    // console.log('Thực thi hàm id', HOME_PARAMS.API_MENU.get(id));
    let jsonData = HOME_PARAMS.API_MENU.get(id);
    // lọc được tất cả các cột để đưa vào mệnh đề select luôn?
    // chuyển qua trang tương tác của bảng theo mô hình đó
    API_PARAMS.saveKey(
        "api",
        JSON.stringify(
            jsonData,
            (key, value) => {
                if (typeof value === "string") return value.replace(/^\s/g, "");
                return value;
            },
            2
        )
    );

    let params = "";

    let sampleData;
    try {
        if (jsonData.sample_data) {
            sampleData = JSON.parse(jsonData.sample_data);
        }
    } catch { }

    // console.log("dữ liệu mẫu", sampleData);

    if (sampleData) {
        if (typeof sampleData === "string") {
            params = sampleData;
        } else if (Array.isArray(sampleData) && sampleData.length > 0) {
            if (typeof sampleData[0] === "string") {
                params = sampleData[0];
            } else if (typeof sampleData[0] === "object") {
                params = JSON.stringify(sampleData[0]);
            }
        } else if (typeof sampleData === "object") {
            params = JSON.stringify(sampleData);
        }
    }

    API_PARAMS.saveKey(
        "model-params",
        JSON.stringify({
            params, // đây là tham số mặt định để test thử trong sample_data
        })
    );

    $("#content-nav").load("./home-contents/show-check-api.html");
}

function createDynamicApis(result) {
    if (
        !result ||
        !result.data ||
        !Array.isArray(result.data) ||
        !result.data.length
    ) {
        return; // không có dữ liệu hợp lệ
    }
    // duyệt tuần tự từng nhóm api - tạo ra các nhóm menu
    let apiRouter;
    let menu = `
  <a class="dropdown-item" href="#" onclick="doSomeThing('./home-contents/show-apis.html')">(*) Lọc tìm APIs</a>
  <div class="dropdown-divider"></div>`;
    let apisSort = result.data.sort((a, b) => {
        if (a.id >= b.id) return 1;
        return -1;
    });
    // console.log(apisSort);
    HOME_PARAMS.API_MENU.clear(); // reset toàn bộ mảng

    for (let api of apisSort) {
        if (!apiRouter) apiRouter = api.api_router;
        if (apiRouter !== api.api_router) {
            menu += `<div class="dropdown-divider"></div>`;
            apiRouter = api.api_router;
        }
        HOME_PARAMS.API_MENU.set(api.id, api); // lưu trong bộ nhớ để thao tác
        menu += `<a class="dropdown-item" href="#" onclick="callDynamicApis(${api.id
            })">${api.id}. ${api.name ||
            `${api.method} ${api.base_directory}${api.api_router}${api.api_function}`
            }</a>`;
        $("#dynamic-apis-menu").html(menu);
    }
    $("#dynamic-apis").show();
}