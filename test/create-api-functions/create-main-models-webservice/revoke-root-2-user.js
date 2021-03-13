const { main_link, token } = require("./config");

const { webService } = require("cng-node-js-utils");

(async () => {
 
  // 2. Thu hồi quyền root TABLE cho user
  let tLog = await webService
    .POST(
      `${main_link}/user-tables/revoke-table-root-2-user`,
      { username: "0903500888" },
      token
    )
    .catch((err) => {
      console.log("2. Lỗi Thu hồi quyền TABLE root cho user: ", err);
    });

    console.log(`2. Kết quả Thu hồi quyền root TABLE`, tLog);


   // 1. Thu hồi quyền root API cho user
   let cLog = await webService
   .POST(
     `${main_link}/user-rights/revoke-function-root-2-user`,
     { username: "0903500888" },
     token
   )
   .catch((err) => {
     console.log("1. Lỗi Thu hồi quyền API root cho user: ", err);
   });

   console.log(`1. Kết quả Thu hồi quyền root API`, cLog);


  console.log(`****> THE END.`);
  process.exit(0);
})();
