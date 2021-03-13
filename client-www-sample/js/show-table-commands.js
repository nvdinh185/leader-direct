// thêm các ô nhập liệu để hoàn thành đường dẫn check api
function addVarInput(inputVars) {
    let htmlVars = ``;
    for (let oneVar of inputVars) {
        htmlVars += `
            <div class="input-group">
                <span class="input-group-addon input-var">${oneVar}:</span>
                <input id="${oneVar.replace(
            /:/g,
            "var-"
        )}" type="text" class="form-control" name="${oneVar.replace(
            /:/g,
            "var-"
        )}"
                    placeholder="Tham số bắt buộc (*)">
            </div>
            `;
    }
    $("#dynamic-vars").html(htmlVars);
}


// // chuyển đường dẫn kiểu /:param/:param2 thành giá trị nhập vào ở ô có tên là #${"var-..."}
// function getFullApiPath(apiPath, inputVars) {
//     // đọc lấy model_name/table_name cấu trúc để tổ chức HEADER đầy đủ trước,
//     // lấy luôn mô hình giả lập để validate dữ liệu nhập liệu của trên trang luôn
//     let headerLink = `/models/get-detail-model/:model_name?page=1&limit=1000&wheres=table_name::table_name&sorts=order_1:1`;
//     let fullApiPath = apiPath;

//     if (inputVars.length) {
//         let keyValues = {};
//         for (let oneVar of inputVars) {
//             keyValues[oneVar] = $(`#${oneVar.replace(/:/g, "var-")}`).val();
//             if (
//                 keyValues[oneVar] === undefined ||
//                 keyValues[oneVar] === null ||
//                 keyValues[oneVar] === ""
//             ) {
//                 $("#dynamic-table-model-detail").html(
//                     `<span class="text-danger">Yêu cầu nhập tham số bắt buộc (*) đầy đủ trước khi gửi</span>`
//                 );
//                 return;
//             }
//         }
//         // thay thế đường dẫn thực
//         for (let key in keyValues) {
//             fullApiPath = fullApiPath.replace(key, keyValues[key]);
//             headerLink = headerLink.replace(key, keyValues[key]);
//         }
//     }
//     return {
//         headerLink,
//         fullApiPath
//     };
// }

// function arrayObject2HtmlTable(rows, HEADER = {}) {
//     if (!rows || !Array.isArray(rows)) {
//         return `<table cellspacing="0" id="table-datatables" class="table table-bordered table-responsive-xl table-striped"></table>`;
//     }
//     let html =
//         '<table cellspacing="0" id="table-datatables" class="table table-bordered table-responsive-xl table-striped">';

//     // đọc trước cấu trúc csdl header của bảng để đảm bảo liệt kê hết cột theo yêu cầu để insert dữ liệu???...
//     let header = {
//         COMMANDS: 1,
//         ...HEADER,
//     }; // bổ sung thêm một cột tập lệnh, mà khi thực thi sẽ bỏ qua trường này

//     for (let row of rows) {
//         let r = {};
//         for (let key in row) {
//             if (key !== "_id") r[key] = 1;
//         }
//         header = { ...header, ...r };
//     }
//     html += "<thead><tr>";
//     for (let key in header) {
//         html += "<th>" + key + "</th>";
//     }
//     html += "</tr></thead>";
//     html += "<tbody>";
//     let rowId = 0;
//     for (let row of rows) {
//         html += "<tr>";
//         let i = 0;
//         for (let key in header) {
//             i++;
//             html +=
//                 (i === 1
//                     ? '<td class="text-nowrap"><span class="co-name">'
//                     : '<td class="pt-3-half" contenteditable="true">') +
//                 (i === 1
//                     ? `<button type="button" class="btn btn-sm btn-rounded btn-primary btn-read-one" onclick="doShowModelTable(this,'C',${rowId});">
//                 <span class="glyphicon glyphicon-plus"></span> C
//               </button>
//               <button type="button" class="btn btn-sm btn-rounded btn-success btn-read-one" onclick="doShowModelTable(this,'U',${rowId});">
//                 <span class="glyphicon glyphicon-ok"></span> U
//               </button>
//               <button type="button" class="btn btn-sm btn-rounded btn-danger btn-read-one" onclick="doShowModelTable(this,'D',${rowId});">
//                 <span class="glyphicon glyphicon-trash"></span> D
//               </button>
//               `
//                     : "") +
//                 (row[key] === undefined || row[key] === null ? "" : row[key]) +
//                 (i === 1 ? "</span></td>" : "</td>");
//         }
//         html += "</tr>";
//         rowId++; //dòng thứ n+1 tương ứng với dữ liệu trong mảng sheetDatas thứ i để lấy mã số khi ở chế độ mobile
//     }
//     html += "</tbody>";
//     html += "</table>";
//     return html;
// }


// // gọi hàm này để hiển thị lỗi
// function showError(err) {
//     $("#dynamic-table-model-detail").html(
//         `<span class="text-danger">${err.responseJSON && err.responseJSON.message
//             ? err.responseJSON.message
//             : "Lỗi truy vấp API"
//         }</span>`
//     );
// }

// // hiển thị kết quả ra dưới bảng
// function showResults(result, HEADER) {
//     // console.log(result);

//     if (result && result.page && result.limit && result.data) {
//         sheetDatas = result.data;

//         $("#dynamic-table-model-detail").html(
//             arrayObject2HtmlTable(sheetDatas, HEADER)
//         );

//         if (sheetDatas.length) {
//             $("#table-datatables").DataTable({
//                 "scrollX": "100%",
//                 "scrollY": "400px",
//                 drawCallback: function (settings) {
//                     $("#table-datatables").reflowTable("update");
//                 },
//             });
//         }

//         // gán số trang hiện tại đang xem là trang lấy được
//         currentPage = result.page;

//         $(".btn-current-page").text(result.page);
//         $(".btn-current-limit").text(result.limit);

//         $(".btn-current-page").show();
//         $(".btn-current-limit").show();

//         if (result.page > 1) {
//             $(".btn-read-prev").show();
//         } else {
//             $(".btn-read-prev").hide();
//         }
//         if (result.next_page > result.page) {
//             $(".btn-read-next").show();
//         } else {
//             $(".btn-read-next").hide();
//         }

//         // chỉ cho phép hiển thị ở chế độ desktop để edit cell dễ dàng
//         $("#table-datatables")
//             // .addClass('reflow-table-customized-style')
//             .reflowTable({
//                 autoWidth: false,
//             })
//             .mobileMode(false);
//     } else if (result && Array.isArray(result)) {
//         sheetDatas = result;

//         $("#dynamic-table-model-detail").html(
//             arrayObject2HtmlTable(sheetDatas, HEADER)
//         );

//         if (sheetDatas.length) {
//             $("#table-datatables").DataTable({
//                 "scrollX": "100%",
//                 "scrollY": "400px",
//                 drawCallback: function (settings) {
//                     $("#table-datatables").reflowTable("update");
//                 },
//             });
//         }

//         $(".btn-current-page").text(1);
//         $(".btn-current-limit").text(sheetDatas.length);
//         $(".btn-current-page").show();
//         $(".btn-current-limit").show();

//         // chỉ cho phép hiển thị ở chế độ desktop để edit cell dễ dàng
//         $("#table-datatables")
//             // .addClass('reflow-table-customized-style')
//             .reflowTable({
//                 autoWidth: false,
//             })
//             .mobileMode(false);
//     } else if (result && typeof result === "object") {
//         // chuyển đổi các giá trị trong kết quả ra text nếu là đối tượng để hiển thị lên web
//         //đây là kiểu object, nên lấy các key làm header, các value là giá trị và hiển thị kiểu mobile
//         let jsonData = {};
//         for (let key in result) {
//             jsonData[key] =
//                 result[key] && typeof result[key] === "object"
//                     ? JSON.stringify(result[key])
//                     : result[key];
//         }
//         sheetDatas = [jsonData];
//         $("#dynamic-table-model-detail").html(
//             arrayObject2HtmlTable(sheetDatas, HEADER)
//         );

//         $(".btn-current-page").text(1);
//         $(".btn-current-limit").text(sheetDatas.length);
//         $(".btn-current-page").show();
//         $(".btn-current-limit").show();

//         // Desktop Mode Only
//         $("#table-datatables")
//             // .addClass('reflow-table-customized-style')
//             .reflowTable({
//                 autoWidth: false,
//             })
//             .mobileMode(false);
//     }
// }

// // hàm lấy cấu trúc của một bảng bằng lệnh ajax get theo link tạo sẵn phiên trước
// function getHEADERTableConfig(headerLink) {
//     return new Promise((rs, rj) => {
//         let url = `${SOCKET_PARAMS.getKey("SERVER_DOMAIN", true) || SOCKET_PARAMS.SERVER_DOMAIN
//             }${SOCKET_PARAMS.getKey("BASE_DIRECTORY", true) ||
//             SOCKET_PARAMS.BASE_DIRECTORY
//             }${headerLink}`;
//         // console.log("URL", url);
//         $("body").addClass("loading");
//         $.ajax({
//             type: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//             url,
//             dataType: "json", // what you expect the server to return
//             success: (result) => {
//                 $("body").removeClass("loading");
//                 let headerFields = {};
//                 let uniqueList = []; // chứa các liệt kê mệnh đề where ["username","table_name,field_name"] ==> wheres=["username"] or wheres=["table_name,field_name"]
//                 let autoIncrementList = [];

//                 if (result && result.data && Array.isArray(result.data)) {
//                     // console.log("All_HEADER", result.data); // in xem dữ liệu sinh ra như nào???
//                     for (let row of result.data) {
//                         if (row["field_name"]
//                             && row["orm_data_type"]
//                             && row["field_name"].replace(/\s/g, "")
//                             && row["orm_data_type"].replace(/\s/g, "")) {
//                             headerFields[row["field_name"].replace(/\s/g, "")] = {
//                                 description: row["description"] && row["description"].replace(/^\s/g, "") ? row["description"].replace(/^\s/g, "") : undefined, // đưa vào toolTip trên header cho biết ý nghĩa của trường này là gì 
//                                 data_type: row["orm_data_type"].replace(/\s/g, ""),                            // kiểu dữ liệu đưa toolTip và validate khi nhập liệu trước khi lưu
//                                 default_value: row["orm_default_value"] && row["orm_default_value"].replace(/^\s/g, "") ? row["orm_default_value"].replace(/^\s/g, "") : undefined,                    // giá trị mặt định gán vào
//                                 length: row["orm_length"] && row["orm_length"] ? parseInt(row["orm_length"]) : undefined                  // độ dài trường nhập liệu tối đa
//                             }; // thiết lập một tên trường nhận được và kiểu dữ liệu của nó

//                             // kiểm tra lấy ra các nhóm unique được thiết kế - xóa bỏ tất cả các ký tự trống nếu có trong trường này
//                             if (parseInt(row["orm_is_unique"]) === 1) {
//                                 uniqueList.push(row["field_name"].replace(/\s/g, ""));
//                             }
//                             if (row["orm_unique_multi"] && row["orm_unique_multi"].replace(/\s/g, "")) {
//                                 uniqueList.push(row["orm_unique_multi"].replace(/\s/g, ""));
//                             }
//                             // lấy các trường dữ liệu tự sinh để không phải nhập liệu - liệt kê để trống
//                             if (parseInt(row["orm_auto_increment"])) {
//                                 autoIncrementList.push(row["field_name"].replace(/\s/g, ""));
//                             }
//                         }
//                     }
//                     // console.log("uniqueList", uniqueList); // in xem dữ liệu sinh ra như nào???
//                 }

//                 // chuyển đổi toàn bộ các giá trị của header sang = 1 để lọc theo trường fields
//                 let fields = {};
//                 Object.keys(headerFields).forEach(v => fields[v] = 1);
//                 $("#sample-data").html(`"fields": ${JSON.stringify(fields, null, 1)}`);

//                 rs({
//                     headerFields,
//                     uniqueList,
//                     autoIncrementList
//                 });

//             },
//             error: (err) => {
//                 $("body").removeClass("loading");
//                 rj(err)
//             },
//         });
//     });
// }

// // gọi ajax lấy dữ liệu theo phương thức get
// function callAjaxGETApi(apiPath, params, nextPage, HEADER) {
//     let newParams = params;
//     if (nextPage) {
//         // nếu có tham số, thì split với dấu & để lấy ra các nhóm biến,
//         // tìm biến có page= thì bỏ đi và thay bằng page=nextPage rồi join lại ra param gửi đi
//         let oldParams = (params ? params.split("&") : []).filter(
//             (x) => x.indexOf("page=") !== 0
//         );
//         oldParams.splice(0, 0, `page=${nextPage}`);
//         newParams = oldParams.join("&");
//     }

//     let url = `${SOCKET_PARAMS.getKey("SERVER_DOMAIN", true) || SOCKET_PARAMS.SERVER_DOMAIN
//         }${SOCKET_PARAMS.getKey("BASE_DIRECTORY", true) ||
//         SOCKET_PARAMS.BASE_DIRECTORY
//         }${apiPath}${newParams ? "?" : ""}${newParams}`;
//     // console.log("URL", url);
//     $("body").addClass("loading");

//     $.ajax({
//         type: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//         url,
//         dataType: "json", // what you expect the server to return

//         success: (result) => {
//             showResults(result, HEADER);
//             $("body").removeClass("loading");
//         },
//         error: (err) => {
//             // console.log(err);
//             $("#dynamic-table-model-detail").html(
//                 `<span class="text-danger">${err.responseJSON && err.responseJSON.message
//                     ? err.responseJSON.message
//                     : "Lỗi truy vấp API"
//                 }</span>`
//             );
//             $("body").removeClass("loading");
//         },
//     });
// }


// // post lên dòng
// function callAjaxPostRowCRUD(linkPost, jsonData) {
//     let apiPathFull = linkPost;
//     apiPathFull = apiPathFull.replace(":model_name", $(`#${"var-model_name"}`).val());
//     apiPathFull = apiPathFull.replace(":table_name", $(`#${"var-table_name"}`).val());
//     return new Promise((rs, rj) => {
//         let url = `${SOCKET_PARAMS.getKey("SERVER_DOMAIN", true) || SOCKET_PARAMS.SERVER_DOMAIN
//             }${SOCKET_PARAMS.getKey("BASE_DIRECTORY", true) ||
//             SOCKET_PARAMS.BASE_DIRECTORY
//             }${apiPathFull}`;
//         // console.log("URL", url);
//         $("body").addClass("loading");
//         $.ajax({
//             type: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//             url,
//             dataType: "json", // what you expect the server to return
//             contentType: "application/json", // what you are sending - để bỏ qua chuỗi json có nhiều hơn một dấu ? liên tiếp
//             data: JSON.stringify(
//                 jsonData,
//                 (key, value) => {
//                     // lượt bỏ ký tự trống phía trước - do td.text() trả về
//                     if (typeof value === "string") return value.replace(/^\s/g, "");
//                     return value;
//                 },
//                 2
//             ),
//             success: (result) => {
//                 $("body").removeClass("loading");
//                 rs(result);
//             },
//             error: (err) => {
//                 $("body").removeClass("loading");
//                 rj(err)
//             },
//         });
//     });
// }

// // gọi hàm lấy dữ liệu theo phương thức post
// function callAjaxPOSTApi(apiPath, params, nextPage, HEADER) {
//     let newParams = params;
//     if (nextPage) {
//         newParams = {
//             ...params,
//             page: nextPage,
//         };
//     }
//     // console.log("NEXT PAGE", newParams);

//     let url = `${SOCKET_PARAMS.getKey("SERVER_DOMAIN", true) || SOCKET_PARAMS.SERVER_DOMAIN
//         }${SOCKET_PARAMS.getKey("BASE_DIRECTORY", true) ||
//         SOCKET_PARAMS.BASE_DIRECTORY
//         }${apiPath}`;
//     // console.log("URL", url);
//     $("body").addClass("loading");

//     $.ajax({
//         type: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         url,
//         dataType: "json", // what you expect the server to return
//         contentType: "application/json", // what you are sending - để bỏ qua chuỗi json có nhiều hơn một dấu ? liên tiếp
//         data: JSON.stringify(newParams),
//         success: (result) => {
//             showResults(result, HEADER);
//             $("body").removeClass("loading");
//         },
//         error: (err) => {
//             // console.log(err);
//             $("#dynamic-table-model-detail").html(
//                 `<span class="text-danger">${err.responseJSON && err.responseJSON.message
//                     ? err.responseJSON.message
//                     : "Lỗi truy vấp API"
//                 }</span>`
//             );
//             $("body").removeClass("loading");
//         },
//     });
// }