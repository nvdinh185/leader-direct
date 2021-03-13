/**
 * Start server rồi khai báo đường dẫn api, token để thực hiện
 */

const { main_link, token } = require("./config");

const { webService } = require("cng-node-js-utils");

const { excell2Database } = require("node-js-orm");

(async () => {
  //1. Liệt kê tất cả các hàm api để test thử
  let apiPage = await webService
    .GET(
      `${main_link}/user-rights/get-functions?limit=500`,
      token  // chỉ cần cung cấp user có token hợp lệ còn hiệu lực, không cần phân quyền
    )
    .catch((err) => {
      console.log("1. Lỗi đọc function_APIs: ", err);
    });
    
    console.log("1. Đọc được số lượng hàm API đọc được: ", `Trang số: ${apiPage.page}, số lượng: ${apiPage.length}/${apiPage.limit}. ${(apiPage.next_page>1?`Trang kế tiếp là: ${apiPage.next_page}`:``)}`);
    
    // 1. Các hàm không cần xác thực
    // let arrWithOutTokens = apiPage.data.filter(x=>!x.has_token&&!x.has_granted);

    // console.log("2. Các hàm không yêu cầu phân quyền và token: ", `Số lượng: ${arrWithOutTokens.length}`);
    // for (let api of arrWithOutTokens){
    //     console.log(`(${api.id}). ${api.name}:\n`, `${api.method} ${main_link}${api.api_router}${api.api_function}\n`,`${api.sample_data}`);
    // }

    
    // 2. Các hàm yêu cầu có token và không cần phân quyền
    // let arrWithTokens = apiPage.data.filter(x=>x.has_token&&!x.has_granted);
    // console.log("3.*** Các hàm yêu cầu cung cấp token trước khi truy vấn dữ liệu: ", `Số lượng: ${arrWithTokens.length}`);
    // for (let api of arrWithTokens){
    //     console.log(`(${api.id}). ${api.name}:\n`, `${api.method} ${main_link}${api.api_router}${api.api_function}\n`,`${api.sample_data}`);
    // }


    // 3. Các hàm yêu cầu phải được phân quyền trước khi sử dụng
    let arrGranteds = apiPage.data.filter(x=>x.has_granted);
    console.log("4. Các hàm yêu cầu phân quyền trước khi sử dụng: ", `Số lượng: ${arrGranteds.length}`);
    for (let api of arrGranteds){
        console.log(`(${api.id}). ${api.name}:\n`, `${api.method} ${main_link}${api.api_router}${api.api_function}\n`,`${api.sample_data}`);
    }
    
    console.log(`****> THE END.`);

    return;

})();
