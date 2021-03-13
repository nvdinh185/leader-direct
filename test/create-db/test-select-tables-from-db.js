const { db } = require("./config");

const { waiting } = require("cng-node-js-utils");
waiting(20000, { hasData: () => db.isConnected() }).then(async (timeoutMsg) => {
  if (!timeoutMsg) {
    db.selectAll("organizations")
      .then((data) => {
        console.log("Data: ", data);
        process.exit(0);
      })
      .catch((err) => {
        console.log("Lỗi: ", err);
        process.exit(0);
      });
  }
});
