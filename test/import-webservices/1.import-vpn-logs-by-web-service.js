/**
 * Thủ tục này khai báo để import sheet chứa cấu trúc csdl của mô hình vào csdl api chứa cấu trúc mô hình
 * 1. Đọc file excel - tên sheet chứa cấu trúc csdl của mô hình
 * 2. Import cấu trúc bằng dịch vụ web-api trực tiếp bằng nodejs luôn
 */

const fs = require('fs');
const readline = require('readline');

const { main_link, FILE_INPUT, token } = require("./config");

const { webService, md5 } = require("cng-node-js-utils");

const ipV4Mask = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

const arrDataAll = [];

function readTxtFile(filename) {

    return new Promise((rs, rj) => {
        try {

            var lineReader = readline.createInterface({
                input: fs.createReadStream(filename)
            });

            let i = 0;

            lineReader.on('line', function (org_line) {
                i++;
                let arrData = org_line.split(" - ");
                let date_time = arrData[0];
                let user = arrData[2] ? (arrData[2].split(" ")[1]).substring(0, (arrData[2].split(" ")[1]).indexOf("(")) : "";
                let organization = arrData[2] ? arrData[2].match(/(\()(.*?)(\))/)[0] : "";
                let ip = arrData[2] ? arrData[2].match(ipV4Mask)[0] : "";
                let event = arrData[3] ? arrData[3].indexOf('logged out') > 0 ? "Logged out" : arrData[3].split(" ").slice(0, 2).join(" ") : "";
                let client_ip = arrData[3] ? arrData[3].match(ipV4Mask) ? arrData[3].match(ipV4Mask)[0] : "" : "";
                let device = arrData[3];

                if (user === "System" && event === "Agent login") {
                    user = arrData[3].split(" ").slice(4, 5).join("");
                    ip = client_ip;
                    if (user.indexOf("/")) user = user.substring(0, user.indexOf("/"));
                }

                if (event==="VPN Tunneling:"){
                    event = arrData[3].split(" ").slice(2, 4).join(" ");
                }

                let id = md5(`${date_time}${user}${ip}${device}}`);

                let jsonData = {
                    id,
                    date_time,
                    time: (new Date(date_time)).getTime(),
                    user,
                    organization,
                    ip,
                    event,
                    client_ip,
                    device,
                    org_line
                };
                arrDataAll.push(jsonData);
            });

            lineReader.on('close', () => {
                console.log('File Close with count of rows :', i, arrDataAll.length);
                rs(arrDataAll);
            });
        } catch (err) {
            rj(err);
        }
    });
}


(async () => {

    // 1. đọc file để lấy danh sách logs
    let arrTables = await readTxtFile(FILE_INPUT)
        .catch(err => {
            console.log(`1. ***>Lỗi Đọc log file `, err);
        });

    console.log(`1. Kết quả đọc từ FILE_INPUT=${FILE_INPUT} có số bảng ghi là:`, arrTables.length);

    // 2. Import danh sách mô hình được đọc từ excel
    let cSLog = await webService.POST(
        `${main_link}`,
        {
            datas: arrTables
            , where_keys: ["id"]//["date_time", "user", "ip", "event"]
        },
        token
    )
        .catch(err => {
            console.log('2. ***>Lỗi import log vpn', err);
        });
    console.log(`2. Kết quả import file ${FILE_INPUT}`, cSLog);

    console.log(`****> THE END.`);
    process.exit(0);

})();