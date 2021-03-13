const MAIN_MENU = {
  brand: {
    next: "./c3-contents/show-content.html",
    name: "C",
    logo: "./icon/favicon.png",
  },
  // bắt đầu các menu kiểu li bên phải
  menu: [
    {
      id: "admin-users",
      active: 0,
      name: "Users",
      children_id: "admin-users-menu",
      next: [
        {
          active: 0,
          name: "Đăng ký user mới",
          next: "./c3-contents/show-register.html",
        },
        {
          active: 0,
          name: "User quên mật khẩu",
          next: "./c3-contents/show-forgot-pass.html",
        },
      ],
    },
  ],
};

$(function () {
  // menu này chỉ xuất hiện khi đã login thành công
  let mediaMenu = [
    {
      id: "admin-media",
      active: 0,
      name: "Medias",
      children_id: "admin-media-menu",
      next: [
        {
          active: 0,
          name: "Gửi file lên cloud",
          api: {
            // link: linkPage,
            method: "POST",
            api_router: "/files",
            api_function: "/post-chunk",
            name: `Upload một hoặc nhiều file kiểu theo dõi trạng thái theo chunk`,
            form_data: `{"image": "@'./Procfile'","id": 123 }`,
          },
          api_params: {
            params: `{"image": "@'./Procfile'","id": 123 }`, // đây là các tham số truyền sang
          },
          next: "./c3-contents/show-upload-chunk.html",
        },
        {
          active: 0,
          name: "---",
          next: null,
        },
        {
          active: 0,
          name: "Quản trị file cá nhân",
          api: {
            // link: linkPage,
            method: "POST",
            api_router: "/files",
            api_function: "/post-owner-page",
            name: `Xem danh sách các file cá nhân đã upload`,
            sample_data: `{"page":1."limit":100,"wheres":{"id":{"$gte":1}}}`,
          },
          api_params: {
            params: `{"page":1."limit":100,"wheres":{"id":{"$gte":1}}}`, // đây là các tham số truyền sang
          },
          next: "./c3-contents/show-list-files.html",
        },
        {
          active: 0,
          name: "Xem hình ảnh các file",
          next: "./c3-contents/show-media-files.html",
        },
      ],
    },
  ];

  // user có role 99 thì cho hiển thị menu đầy đủ
  let userInfo = API_PARAMS.getUserInfo();
  if (userInfo && userInfo.role === 99) {
    MAIN_MENU.menu = [
      {
        id: "admin-users",
        active: 0,
        name: "Users",
        children_id: "admin-users-menu",
        next: [
          {
            active: 0,
            name: "Đăng ký user mới",
            next: "./c3-contents/show-register.html",
          },
          {
            active: 0,
            name: "User quên mật khẩu",
            next: "./c3-contents/show-forgot-pass.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "(-)Reset mật khẩu cho user",
            next: "./c3-contents/show-reset-pass.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Danh sách các Users được phân quyền trong hệ thống",
            api: {
              method: "GET",
              api_router: "/user-rights",
              api_function: "/get-granted-users",
              name:
                "Danh sách các user đã được cấp quyền APIs và TABLEs vào hệ thống",
              sample_data: "page=1&limit=100",
            },
            api_params: {
              params: "page=1&limit=100",
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "Danh sách quyền APIs của User",
            api: {
              method: "GET",
              api_router: "/user-rights",
              api_function: "/get-granted-user",
              name: "Danh sách quyền API của user",
              sample_data: "username=0123456789&page=1&limit=100",
            },
            api_params: {
              params: "username=0123456789&page=1&limit=100",
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Gán quyền truy cập một API cho User",
            api: {
              method: "POST",
              api_router: "/user-rights",
              api_function: "/add-function-2-user",
              name: "Gán quyền truy cập một API cho user",
              sample_data: `{"username":"0123456789","method":"GET","api_function":"/get-granted-users"}`,
            },
            api_params: {
              params: `{"username":"0123456789","method":"GET","api_function":"/get-granted-users"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "Thu hồi quyền truy cập API của User",
            api: {
              method: "POST",
              api_router: "/user-rights",
              api_function: "/remove-function-2-user",
              name: "Thu hồi quyền truy cập một API của user",
              sample_data: `{"username":"0123456789","method":"GET","api_function":"/get-granted-users"}`,
            },
            api_params: {
              params: `{"username":"0123456789","method":"GET","api_function":"/get-granted-users"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Gán quyền ROOT API cho User",
            api: {
              method: "POST",
              api_router: "/user-rights",
              api_function: "/grant-function-root-2-user",
              name: "Gán quyền ROOT API cho user",
              sample_data: `{"username":"0903500888"}`,
            },
            api_params: {
              params: `{"username":"cuong.dq"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "Thu hồi quyền ROOT API của User",
            api: {
              method: "POST",
              api_router: "/user-rights",
              api_function: "/revoke-function-root-2-user",
              name: "Thu hồi quyền ROOT API của user",
              sample_data: `{"username":"0903500888"}`,
            },
            api_params: {
              params: `{"username":"0123456789","method":"GET","api_function":"/get-granted-users"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
        ],
      },
      {
        id: "admin-tables",
        active: 0,
        name: "Tables",
        children_id: "admin-tables-menu",
        next: [
          {
            active: 0,
            name: "1.Quản lý Mô hình giao tiếp CSDL",
            api: {
              // link: linkPage,
              method: "GET",
              api_router: "/models",
              api_function: "/get-models",
              name: `Xem danh sách các mô hình đã được khai báo. Hoặc khai báo một mô hình mới với kết nối csdl xác định (pool), hoặc csdl tự tạo ra (sqlte3 | mongodb | oracle)`,
              sample_data: `page=1&limit=100`,
            },
            api_params: {
              params: `page=1&limit=100`,
            },
            next: "./home-contents/show-models.html",
          },
          {
            active: 0,
            name: "2.Tổ chức cấu trúc CSDL mô hình",
            api: {
              // link: linkPage,
              method: "GET",
              api_router: "/models",
              api_function: "/get-detail-model/:model_name",
              name: `Tổ chức cấu trúc csdl cho mô hình cụ thể đã khai. Tên mô hình tương ứng với một csdl đã định nghĩa trước ở Quản lý mô hình động - với kết nối csdl hợp lệ`,
              sample_data: `page=1&limit=100`,
            },
            api_params: {
              params: `page=1&limit=100`,
            },
            next: "./home-contents/show-model-detail.html",
          },
          {
            active: 0,
            name: "3.Tạo bảng csdl theo cấu trúc đã khai",
            api: {
              // link: linkPage,
              id: 37,
              method: "POST",
              api_router: "/models",
              api_function: "/sync-model/:model_name",
              name: `Thực thi lệnh sync() của mô hình để tự động tạo bảng (xem tham số table_name ở dưới) theo cấu trúc đã định nghĩa ở phần 2.Tổ chức cấu trúc cho một mô hình đã khai`,
              sample_data: `{"table_name":"test_table"}`,
            },
            api_params: {
              params: `{"table_name":"test_table"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Danh sách quyền truy cập BẢNG của User",
            api: {
              // link: linkPage,
              method: "GET",
              api_router: "/user-tables",
              api_function: "/get-granted-table-4-user",
              name: `Danh sách quyền Bảng của user`,
              sample_data: `username=${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }`,
            },
            api_params: {
              params: `username=${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }`, // đây là các tham số truyền sang
            },
            next: "./home-contents/show-user-crud-tables.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Thực thi CRUD-DML đến bảng của mô hình",
            api: {
              method: "POST",
              api_router: "/models",
              api_function: "/post-page/:model_name/:table_name",
              name: `Thực thi các lệnh DML (Data Manipulation Language) - CRUD (Insert/Import, Select, Update, Delete)`,
              sample_data: `{"page":1,"limit":100,"wheres":{"id":{"$like":"10*","$gte":100,"$lte":105,"$ne":101,"$in":[100,102],"$exists":1}},"fields":{"id":1,"status":1},"sorts":{"id":-1}}
                            hoặc {"page":1,"limit":100,"wheres":{"site_id":{"$like":"DNTK0*"}},"fields":{"id":1,"site_id":1,"name":1},"sorts":{"site_id":-1}}`,
            },
            api_params: {
              params: `{"page":1,"limit":100,"wheres":{},"fields":{},"sorts":{}}`,
            },
            next: "./home-contents/do-crud-ddl-api.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Gán quyền truy cập một BẢNG cho User",
            api: {
              method: "POST",
              api_router: "/user-tables",
              api_function: "/add-table-2-user",
              name: "Gán quyền tác động CRUD `table_name` cho User",
              sample_data: `{"username":"0123456789","privileges":"CRUD","model_name":"granted_users","table_name":"models"}`,
            },
            api_params: {
              params: `{"username":"0123456789","privileges":"CRUD","model_name":"granted_users","table_name":"models"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "Thu hồi quyền truy cập một BẢNG của User",
            api: {
              method: "POST",
              api_router: "/user-tables",
              api_function: "/remove-table-2-user",
              name: "Thu hồi quyền tác động CRUD `table_name` của User",
              sample_data: `{"username":"0123456789","privileges":"CRUD","model_name":"granted_users","table_name":"models"}`,
            },
            api_params: {
              params: `{"username":"0123456789","privileges":"CRUD","model_name":"granted_users","table_name":"models"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Gán quyền ROOT thuộc BẢNG cho User",
            api: {
              method: "POST",
              api_router: "/user-tables",
              api_function: "/grant-table-root-2-user",
              name: `Gán quyền ROOT Table cho user`,
              sample_data: `{"username":"${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }"}`,
            },
            api_params: {
              params: `{"username":"${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }"}`,
            },
            next: "./home-contents/show-check-api.html",
          },
          {
            active: 0,
            name: "Thu hồi quyền ROOT thuộc BẢNG của User",
            api: {
              method: "POST",
              api_router: "/user-tables",
              api_function: "/revoke-table-root-2-user",
              name: `Thu hồi quyền ROOT Table của user`,
              sample_data: `{"username":"${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }"}`,
            },
            api_params: {
              params: `{"username":"${
                HOME_PARAMS.userInfo
                  ? HOME_PARAMS.userInfo.username
                  : "0123456789"
              }"}`, // đây là các tham số truyền sang
            },
            next: "./home-contents/show-check-api.html",
          },
        ],
      },
      {
        id: "admin-logs",
        active: 0,
        name: "Logs",
        children_id: "admin-logs-menu",
        next: [
          {
            active: 0,
            name: "Danh sách Logs truy cập",
            api: {
              // link: linkPage,
              method: "GET",
              api_router: "/api",
              api_function: "/get-page-logs/:event",
              name: `Tra cứu danh sách các sự kiện truy cập APIs`,
              sample_data: `page=1&limit=5&fields=id,app,event,method,origin,url,path,ip,device,username,time&wheres={app:{$like:*api_}}`,
            },
            api_params: {
              params: `page=1&limit=5&fields=id,app,event,method,origin,url,path,ip,device,username,time&wheres={app:{$like:*api_}}`, 
            },
            next: "./c3-contents/show-api-logs.html",
          },
          {
            active: 0,
            name: "---",
            next: null,
          },
          {
            active: 0,
            name: "Thống kê truy cập của một lớp IPs",
            api: {
              method: "GET",
              api_router: "/api",
              api_function: "/get-events-ip/:ips",
              name: `Thống kê truy cập của một lớp IPs. Phương thức POST là tấn công của hacker`,
              sample_data: `wheres=method:POST`,
            },
            api_params: {
              params: `wheres=method:POST`, 
            },
            next: "./c3-contents/show-ips-logs.html",
          },
          {
            active: 0,
            name: "Thống kê truy cập của 1 username",
            api: {
              method: "GET",
              api_router: "/api",
              api_function: "/get-events-user/:username",
              name: `Thống kê truy cập của 1 username, phát hiện username có truy cập bất thường không?`,
              sample_data: `wheres={ip:{$like:10.*}}`,
            },
            api_params: {
              params: `wheres={ip:{$like:10.*}}`, 
            },
            next: "./c3-contents/show-users-logs.html",
          },
        ],
      },
    ];
  }

  // có user login thì mới hiển thị menu phương tiện
  if (userInfo) {
    MAIN_MENU.menu.splice(MAIN_MENU.menu.length, 0, ...mediaMenu);
  }

  MAIN_MENU.flat_menu = new JSCngArray2Tree().tree2Array(
    MAIN_MENU.menu,
    "next"
  );
  MAIN_MENU.tree_menu = new JSCngArray2Tree().array2Tree(
    MAIN_MENU.flat_menu,
    "$id",
    "$parent_id"
  );

  // console.log('Chuyển đổi cấu trúc cây sang mảng', MAIN_MENU.flat_menu, MAIN_MENU.tree_menu);

  // tạo menu động
  let html = ``;

  for (let item of MAIN_MENU.tree_menu) {
    if (typeof item.next === "string") {
      html += `
            <li class="nav-item${item.active ? " active" : ""}">
                <a class="nav-link" href="#" onclick="doSomeThing('${
                  item.next
                }',${item.$id})" class="nav-home">${item.name} ${
        item.active
          ? `<span
                class="sr-only">(current)</span>`
          : ""
      }</a>
            </li>
            `;
    }

    if (Array.isArray(item.$children)) {
      html += `
            <li id="${item.id}" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="${item.id}-menu" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                ${item.name}
                </a>
                <div id="${item.children_id}" class="dropdown-menu" aria-labelledby="${item.id}-menu">
            `;

      for (let child of item.$children) {
        if (child.name === "---") {
          html += `
                    <div class="dropdown-divider"></div>
                    `;
        } else {
          html += `
                    <a href="#" onclick="doSomeThing('${child.next}',${child.$id})" class="dropdown-item">${child.name}</a>
                    `;
        }
      }

      html += `
                </div>
            </li>`;
    }
  }

  $("#nav-bar-menu").append(html);
  // $("#nav-bar-menu").html(html);
});
