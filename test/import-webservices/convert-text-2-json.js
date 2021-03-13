const fs = require('fs');
const readline = require('readline');

// const fileInput = './bk/log-SSLVPN-tungay20210106-test.csv';
// const fileInput = './bk/log-SSLVPN-tungay20210106.csv';
const fileInput = './bk/log.MAG6610_01-Sat-2021-01-09_21_48_37-(GMT+07_00)-guiCuongDQ.access';
const fileOutput = './bk/all-vpn-log-01-Sat-2021-01-09_21_48_37.csv';

const ipV4Mask = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

function readTxtFile(filename) {
    var lineReader = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    let i = 0;
    lineReader.on('line', function (line) {
        i++;
        let arrData = line.split(" - ");
        let time = arrData[0];
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

        let jsonData = {
            time,
            user,
            organization,
            ip,
            event,
            client_ip,
            device,
            org: line
        }
        fs.appendFileSync(fileOutput, `${time},${ip},${client_ip},${user},${organization},${event},${device}\n`);
    });

    lineReader.on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
      });
}



fs.writeFileSync(fileOutput, `time,ip,client_ip,user,organization,event,device\n`);
readTxtFile(fileInput);



// const userNameMask =  /([a-z\.]+)/;

// var a = "[180.93.32.182] be.phan(C_�ng ty 3)[] - Primary authentication successful for be.phan/LDAP2 from 180.93.32.182";

// var userArr = a.split(" ");
// // var userArr = a.match(userNameMask);
// console.log(userArr[1].substring(0,userArr[1].indexOf("(")))

// var ipV4Arr = a.match(ipV4Mask);
// console.log(ipV4Arr[0])
