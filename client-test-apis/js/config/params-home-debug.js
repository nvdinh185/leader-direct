const REG_PARAMS = {
  NUMBER_REG: /^[0-9]*$/,
  DATE_REG: /^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/g, //kiểu ngày dạng dd/mm/yyyy hoặc dd-mm-yyyy hoặc ddmmyyyy
  DATE_REG_FULL: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g, //kiểu ngày dạng dd/mm/yyyy hoặc dd-mm-yyyy hoặc ddmmyyyy
  VN_MOBILE_NUMBER_REG: /^[0]{1}[123456789]{1}[0-9]{8}$/,
  EMAIL_REG: /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,
  WEB_LINK_REG: /((https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.,]*[-A-Z0-9+&@#\/%=~_|])/gim,
  EMAIL_MOBIFONE_REG: /([a-zA-Z0-9\-\_\.])+@mobifone.vn/gim,
  // khai báo các pattern sử dụng trong validator khi nhập liệu
  VALIDATOR_PATTERNS:{
    DATE: "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$",
    NUMBER:"^[0-9]*$",
    MOBIFONE:"^[0]{1}[123456789]{1}[0-9]{8}$",
    EMAIL:"(([a-zA-Z0-9\\-\\_\\.])+@[a-zA-Z\\_]+?(\\.[a-zA-Z]{2,6})+)",
  }
};

// đối tượng dùng chung cho các phiên làm việc trong javascript
const API_PARAMS = {
  SERVER_SOCKET: "https://socket.cng.vn",
  SERVER_DOMAIN: "http://localhost:9234",
  BASE_DIRECTORY: "/media",
  getServerUrl: function () {
    return this.SERVER_DOMAIN + this.BASE_DIRECTORY;
  },
  // các path đầy đủ để quản trị user
  FORGOT_PASS: "/socket/admin-users/user-reset-pass-req", // gửi yêu cầu reset pass
  RESET_PASS: "/socket/admin-users/user-reset-pass-res", // đường dẫn phản hồi reset pass
  REGISTER: "/socket/admin-users/user-create", // đường dẫn tạo user
  CONFIRM: "/socket/admin-users/user-confirm", //  đường dẫn xác nhận user sau khi tạo hoặc đổi
  USER_INFO: "/socket/admin-users/get-token-info", // lấy thông tin về user từ token

  // các đường dẫn từ router đến function của api
  APIs: `/user-rights/get-functions`, // đường dẫn gốc lấy các hàm chức năng

  APP_NAME: "WEB-SOCKET-JQUERY",
  getToken: function () {
    return this.getKey("token", true);
  },
  getUserInfo: function () {
    let strUserInfo = this.getKey("userInfo", true);
    try {
      return JSON.parse(strUserInfo);
    } catch {
      return;
    }
  },
  // cặp mã khóa tự sinh ở thư viện client-socket-nodejs nhé, hoặc tự sinh trên này
  getDeviceKey: function () {
    return {
      created_time: "2020-09-17 22:25:09",
      id:
        "MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAea/IOT6QMv/kw1W8aYzlIG/twyKmjYggL94DbduYC8t7QmZ0JCpK43ugArxzVmXnAU6oe0wiuH57yS4cKLntUQIDAQAB",
      key:
        "MIIBOQIBAAJAea/IOT6QMv/kw1W8aYzlIG/twyKmjYggL94DbduYC8t7QmZ0JCpK43ugArxzVmXnAU6oe0wiuH57yS4cKLntUQIDAQABAkA/81ucif6qbsVAyuwL5Jn95BTmOm2hb+rKfTj8IS3U9EjAMs4ppC79uIMGL8zAQiftY2DOs/QFPgBlHRYBGGlhAiEA6Ar9ZB/Jk/jRvsXfrlbNog95AQrXSsv7ydvsUh9sqrUCIQCGQAVXdSzYBeLaodpatYrrLMRRwOc6iH6rTaYypN3trQIhALhfKxEoNLnPRZEIln9m10MCekn6vC/hPnIYvYBPGb/VAiAHzXbCA4RstcLelCOdvAlr67kpSz3lMAO0rxmmveBMLQIgQx8NQrTVAWvHghZEqEmy/1IAKaziMf4FQQgPt0UGAcc=",
    };
  },
  // đường dẫn socket server
  getSocketLink: function () {
    return {
      url: this.SERVER_SOCKET,
      path: "/socket",
      timeout: 10000,
    };
  },
  saveKey: function (key, value, isLocal) {
    if (typeof Storage === "undefined") {
      // console.log("***", "Sorry! No Web Storage support..");
      return;
    }
    if (isLocal) {
      // Store
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  getKey: function (key, isLocal) {
    if (typeof Storage === "undefined") {
      // Sorry! No Web Storage support..
      return;
    }
    if (isLocal) {
      return localStorage.getItem(key);
    } else {
      return sessionStorage.getItem(key);
    }
  },
  deleteKey: function (key, isLocal) {
    if (typeof Storage === "undefined") {
      // Sorry! No Web Storage support..
      return;
    }
    if (isLocal) {
      return localStorage.removeItem(key);
    } else {
      return sessionStorage.removeItem(key);
    }
  },
  // trả về ban ngày = 1 và ban đêm là = 0
  getDateNight: function () {
    return new Date().getHours() >= 8 && new Date().getHours() <= 16 ? 1 : 0;
  },
  getTimestamp: function () {
    let curDate = new Date();
    return (
      ("" + curDate.getFullYear()).padStart(4, 0) +
      "-" +
      ("" + (curDate.getMonth() + 1)).padStart(2, 0) +
      "-" +
      ("" + curDate.getDate()).padStart(2, 0) +
      "_" +
      ("" + curDate.getHours()).padStart(2, 0) +
      ":" +
      ("" + curDate.getMinutes()).padStart(2, 0) +
      ":" +
      ("" + curDate.getSeconds()).padStart(2, 0)
    );
  },
  sleep: (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
      // cần thay đổi lại trả điều khiển cho cpu nhé
    } while (currentDate - date < milliseconds);
  },
};

// ********************* KHAI BÁO CÁC BIẾN DÙNG CHUNG TOÀN CỤC
// khởi tạo giao tiếp socket, ban đầu chưa lưu sẽ dùng server_socket đã thiết lập trước
// ***** Các biến này dùng chung cho các trang nhúng vào, phía dưới không cần khai biến mà chỉ gán hoặc đọc các biến trên
const HOME_PARAMS = {};

HOME_PARAMS.client = new clientSocketLogin.ClientInputInterface(
  API_PARAMS.APP_NAME,
  API_PARAMS.getDeviceKey(),
  {
    url: API_PARAMS.getKey("SERVER_SOCKET", true) || API_PARAMS.SERVER_SOCKET,
    path: "/socket",
    timeout: 10000,
  }
);
HOME_PARAMS.API_MENU = new Map();
HOME_PARAMS.token = API_PARAMS.getToken();
// thông tin user đã lưu
HOME_PARAMS.userInfo = API_PARAMS.getUserInfo();
// tham số truy vấn theo trang mặt định cho các nút next, prev
HOME_PARAMS.sheetDatas = [];
HOME_PARAMS.currentPage = 1; // trang hiện tại của csdl
HOME_PARAMS.isNextPage = false; // cho phép truy vấn trang tiếp theo trong csdl,
HOME_PARAMS.limit = 100; // giới hạn trên trang

HOME_PARAMS.currentOffset = 0; // contrỏ hiện tại trên web
HOME_PARAMS.ajaxBlock = false; // biến kiểm tra không quét liên tục lên máy chủ

// LẤY CẤU TRÚC HEADER cố định của table - xử lý bảng cố định
HOME_PARAMS.tableConfig = {
  headerFields: {},
  uniqueList: [],
  autoIncrementList: [],
};
// số lượng thanh trạng thái
HOME_PARAMS.totalProgress = 100;
HOME_PARAMS.currentProgress = 0;

HOME_PARAMS.DATA_TABLE_PAGING = {
  pageLength: 10,
  language: {
    oPaginate: {
      sNext: '<i class="fa fa-forward"></i>',
      sPrevious: '<i class="fa fa-backward"></i>',
      sFirst: '<i class="fa fa-step-backward"></i>',
      sLast: '<i class="fa fa-step-forward"></i>',
    },
    lengthMenu: "Xem _MENU_ bản ghi/trang",
    zeroRecords: "Không tìm thấy bản ghi nào",
    info: "Trang số _PAGE_/_PAGES_ của _MAX_ bản ghi",
    infoEmpty: "Không có bản ghi nào",
    infoFiltered: "(Được lọc từ _MAX_ bản ghi)",
    search: "Lọc tìm:",
  },
};


// nếu thiết lập là false thì các trạng thái showtoast sẽ bị hạn chế không hiển thị các thủ tục, trình tự để debug web
// thiết lập true để nó showToast tất cả trường hợp debug

// CHO HIỂN THỊ MENU APIs cho tất cả các user thì thiết lập là TRUE
// ẨN MENU APIs thì thiết lập là false trừ user có role>90
HOME_PARAMS.isDebug = true;
