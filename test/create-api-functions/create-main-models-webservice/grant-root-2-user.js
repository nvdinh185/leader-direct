const { main_link, token } = require("./config");

const { webService } = require("cng-node-js-utils");

(async () => {
  // 1. Gán quyền root API cho user
  let cLog = await webService
    .POST(
      `${main_link}/user-rights/grant-function-root-2-user`,
      { username: "hieu.quang" },
      token
    )
    .catch((err) => {
      console.log("1. Lỗi Gán quyền API root cho user: ", err);
    });

  console.log(`1. Kết quả Gán quyền root API`, cLog);


  // 2. Gán quyền root TABLE cho user
  let tLog = await webService
    .POST(
      `${main_link}/user-tables/grant-table-root-2-user`,
      { username: "hieu.quang" },
      token
    )
    .catch((err) => {
      console.log("2. Lỗi Gán quyền TABLE root cho user: ", err);
    });

  console.log(`2. Kết quả Gán quyền root TABLE`, tLog);

  console.log(`****> THE END.`);
  process.exit(0);
})();
