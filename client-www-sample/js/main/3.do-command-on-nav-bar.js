function init() {
  if (!HOME_PARAMS.token) {
    // console.log("SHOW");
    $(".nav-log-in").show();

    $("body").removeClass("loading");
  } else {
    // kiểm tra token còn hiệu lực không?
    let url = `${
      API_PARAMS.getKey("SERVER_SOCKET", true) || API_PARAMS.SERVER_SOCKET
    }${API_PARAMS.USER_INFO}`;
    // gọi hàm kiểm tra lệnh get trên đường dẫn cơ sở gốc luôn
    callAjaxGETApiAny("", "", url)
      .then((result) => {
        // console.log('result: ', result);
        HOME_PARAMS.userInfo = result;
        // hiển thị nút logout - các chức năng login phải được thực thi
        $(".nav-log-out").show();
        $(".nav-user-info").html(
          `<a class="nav-link" href="#" onclick="showUserInfo()"><i class="fa fa-user-circle icon"></i> ${
            HOME_PARAMS.userInfo.nickname ||
            HOME_PARAMS.userInfo.fullname ||
            HOME_PARAMS.userInfo.username
          }</a>`
        );
        // thông báo cho user
        // $(".nav-user-info").html(
        //   `<a class="nav-link" href="#" onclick="showUserInfo()"><span class="badge badge-danger">1</span>${HOME_PARAMS.userInfo.nickname || HOME_PARAMS.userInfo.fullname || HOME_PARAMS.userInfo.username
        //   }</a>`
        // );
        $(".nav-user-info").show();

        $(".nav-apis").show();

        showToast("success", "User đã kết nối!");
        
        
        // ĐỌC MENU VÀ HIỂN THỊ CHỨC NĂNG LÊN ĐỂ DEBUG
        if (HOME_PARAMS.isDebug || HOME_PARAMS.userInfo.role > 90) {
          // gọi hàm đọc các api được phân quyền cho users
          readUserApis();
        }


      })
      .catch((err) => {
        $(".nav-log-in").show();
        if (
          !err.responseJSON ||
          !err.responseJSON.message ||
          typeof err.responseJSON.error === "object"
        )
          console.log(err);
        showToast(
          "error",
          `${
            err.responseJSON && err.responseJSON.message
              ? `${err.responseJSON.message} ${
                  typeof err.responseJSON.error === "object"
                    ? JSON.stringify(err.responseJSON.error)
                    : ""
                }`
              : `Lỗi truy vấp API ${JSON.stringify(err)}`
          }`,
          "toast-top-right",
          5000
        );
      });
  }
}

function showUserInfo() {
  // console.log("userInfo", HOME_PARAMS.userInfo);
  toastr.options = { positionClass: "toast-top-right" };
  toastr["info"](
    `  
  username=${HOME_PARAMS.userInfo.username},<br>
  user_type=${HOME_PARAMS.userInfo.user_type},<br>
  fullname=${HOME_PARAMS.userInfo.fullname},<br>
  device_id=${HOME_PARAMS.userInfo.reg_device_id},<br>
  `,
    "Thông tin đăng nhập"
  );

  // showToast("info",`
  // username=${HOME_PARAMS.userInfo.username},<br>
  // user_type=${HOME_PARAMS.userInfo.user_type},<br>
  // fullname=${HOME_PARAMS.userInfo.fullname},<br>
  // device_id=${HOME_PARAMS.userInfo.reg_device_id},<br>
  // `)

  //   $("#content-nav").load("./home-contents/show-profile.html");
}

/**
 * Trỏ đến file html luôn để hiển thị
 * htmllink: link url
 * options: {api,model_params} là các tham số truyền vào để sử dụng chuyển trang
 */
function doLoadContentDynamicHtml(htmllink, options) {
  // console.log("Tìm nó đây xxx",options, htmllink);
  //  nếu kiểu chuổi truyền vào thì đó là fId trong mảng
  if (
    options &&
    typeof options === "number" &&
    MAIN_MENU &&
    MAIN_MENU.flat_menu &&
    Array.isArray(MAIN_MENU.flat_menu)
  ) {
    let menu = MAIN_MENU.flat_menu.find((x) => x.$id === options);
    // console.log("Tìm nó đây",options, menu);
    API_PARAMS.saveKey("api", JSON.stringify(menu ? menu.api || {} : {}));
    API_PARAMS.saveKey(
      "model-params",
      JSON.stringify(menu ? menu.api_params || {} : {})
    );
  } else {
    API_PARAMS.saveKey("api", JSON.stringify(options ? options.api || {} : {}));
    API_PARAMS.saveKey(
      "model-params",
      JSON.stringify(options ? options.model_params || {} : {})
    );
  }

  $("#content-nav").load(htmllink);
}

/**
 * Thực thi hàm từ nav bấm vào link href="#" onClick="doSomeThing(param)"
 * param : là string chứa link web
 * opts: {api, model_params} || number mã id // chứa tham số link url api, và model_params là tham số mặt định
 */
function doSomeThing(param, opts) {
  doLoadContentDynamicHtml(param, opts);
}

function doLogout() {
  // gọi hàm logout trên máy chủ socket để vô hiệu hóa các token
  let url = `${
    API_PARAMS.getKey("SERVER_SOCKET", true) || API_PARAMS.SERVER_SOCKET
  }/socket/admin-users/logout`;
  callAjaxGETApiAny("", "", url)
    .then((ok) => {
      //   console.log("ok: ", ok);
      API_PARAMS.deleteKey("token", true);
      API_PARAMS.deleteKey("userInfo", true);
      HOME_PARAMS.userInfo = null;
      HOME_PARAMS.token = null;
      $("#dynamic-apis").hide();
      $(".nav-log-out").hide();
      $(".nav-user-info").hide();
      $(".nav-log-in").show();
      $(".scroll-down-content").hide();

      showToast(
        "warning",
        "Bạn đã vô hiệu hóa các phiên làm việc trên tất cả các thiết bị. Để sử dụng, vui lòng đăng nhập lại",
        "toast-top-center",
        3000,
        true
      );

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    })
    .catch((err) => {
      //   console.log("Lỗi: ", err);
      API_PARAMS.deleteKey("token", true);
      API_PARAMS.deleteKey("userInfo", true);
      HOME_PARAMS.userInfo = null;
      HOME_PARAMS.token = null;
      $("#dynamic-apis").hide();
      $(".nav-log-out").hide();
      $(".nav-user-info").hide();
      $(".nav-log-in").show();
      $(".scroll-down-content").hide();
    });
}
