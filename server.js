// add libs
const path = require("path");

// add root
const ROOT_DIR = __dirname
  .split(path.sep)
  .slice(0, __dirname.split(path.sep).length - 0)
  .join(path.sep);

const expressCfg = {
  port: 8080
  // base API/www server
  , baseDirectory: "/build"
  // redirect when no path in request
  , redirectUrl: "/"
  // view page when 404 api
  , default404Page: `<h1>Máy chủ www</h1>
    <p>Xin lỗi trang bạn yêu cầu không tìm thấy và đừng cố dò thử các trang bạn nhé</p>`
  // root page when http(s)://<hostname:port>/ with index.html
  , staticRoot: `${ROOT_DIR}/client-test-api`
  // subdirectory when http(s)://<hostname:port>/<baseDirectory> with index.html
  , staticHtml: `${ROOT_DIR}/client-www-sample`
  // include cors for API server
  , domainIncludeCors: ["localhost"]
};

// block ddos for client try to scan api server
const ddosUse = null; // = require("./ddos/ddos-config").express("ip", "path");


// routes --> routers --> handlers --> midlewares --> models --> database
const apiRoutes = null; // = require("./routes/apis-route-2.0.js");

// socketIO class
const socketIoCfg = null; // = require("./server-socketio");

// main libs
const { ExpressServer } = require("cng-node-js-utils");

// block when fail request more than below:
const cfgFail = {
  checkInterval: 5000,    // trong thời gian kiểm tra này mà
  maxCountFail4Block: 20, // số lần gõ địa chỉ bị sai quá 20 lần sẽ bị block
};

// log for request in this server --> save to logs db or log in text or console log
const logViewer = null; //= require("./logs-viewer");

// main server
const expressServer = new ExpressServer(expressCfg, ddosUse, apiRoutes, socketIoCfg, cfgFail, logViewer);

//start server
expressServer.start();