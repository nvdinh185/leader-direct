const APP_NAME = "git";

const logModels = require("../midlewares/logs/models");

const { md5 } = require("cng-node-js-utils");

// hàm này sẽ được gọi ở trong máy chủ API khi gặp các sự kiện
module.exports = (event, req) => {

  // console.log("***>", event, req);

  // có 03 phương pháp tạo ra mã id duy nhất tại mỗi thời điểm
  // phương pháp tạo mã khóa ngắn nhất
  //   let id = uniqueid.createShortId();

  // phương pháp tạo hash md5 theo thời gian kết hợp ip và đường dẫn truy cập
  let id = md5(`${Date.now()}${event}${req.clientIp}${req.pathName}`);

  // phương pháp tạo hash theo thời gian
  //   let id = secretUtil.sha256(
  //     `${Date.now()}${event}${req.clientIp}${req.pathName}`
  //   );

  let jsonData = {
    id,
    app: APP_NAME,
    event,
    method: req.method,
    origin: req.origin,
    url: req.url,
    path: req.pathName,
    ip: req.clientIp,
    device: req.clientDevice,
    headers: JSON.stringify(req.headers),
    params_get: JSON.stringify(req.paramS),
    params_post: JSON.stringify(req.json_data || req.form_data),
    result:
      req.finalJson && typeof req.finalJson === "object"
        ? JSON.stringify(req.finalJson)
        : req.finalJson,
    user:
      req.user && typeof req.user === "object"
        ? JSON.stringify(req.user)
        : req.user,
    error:
      req.error && typeof req.error === "object"
        ? JSON.stringify(req.error)
        : req.error,
    username: req.user ? req.user.username : undefined,
    time: Date.now(),
  };

  // console.log("***>", event, jsonData);

  // console.log(
  //   "***>Log:",
  //   headers,
  //   id,
  //   event,
  //   jsonData.method,
  //   jsonData.path,
  //   jsonData.ip,
  //   jsonData.username
  // );

  // tùy vào khác hàng có thể thay đổi hàm này để ghi log ở đâu đó
  switch (event) {
    case "HACKER":
      logModels.hacks
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;
    case "ERROR":
      logModels.errors
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;
    case "FAIL":
      logModels.fails
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;
    case "BLOCK":
      logModels.blocks
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;
    case "CORS":
      logModels.cors
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;
    case "ACCESS":
      logModels.access
        .insertOneRecord(jsonData)
        .then((data) => {
          //   console.log("data", data);
        })
        .catch((err) => {
          //   console.log("err", err);
        });
      break;

    default:
      break;
  }
};
