const { exec, spawn } = require("child_process");
const seqCommands = [
    "npm i cng-auto-server@latest cng-node-js-utils@latest node-js-orm@latest client-socket-nodejs@latest", // cài thư viện mới nhất cho dự án
    "node ./sync-libs/sync-test-libs.js" // đồng bộ copy đè các file mẫu thư viện test chuẩn
];

// cấu hình tạo file
const SERVER_CFG = {
    ROOT: __dirname.substring(0, __dirname.length - 5),
    PORT: 9231,
    BASE: "/git-server",
    NAME: "git-server-1.0"
}

function execPromise(cmd) {
    return new Promise((rs, rj) => {

        const bat = spawn(cmd, [], { shell: true });
        // console.log("xxx", bat);
        bat.stdout.on('data', (data) => {
            console.log(`***> OK:> ${cmd}`,data.toString());
            rs(data);
        });

        bat.stderr.on('data', (data) => {
            console.error(`---> ERROR: ${cmd}`,data.toString());
            rs(data);
        });

        bat.on('exit', (code) => {
            console.log(`+++> ${cmd} Child exited with code ${code}`);
            rs(code);
        });
    })
}


(async () => {
    console.log("xxx START");
    for (let cmd of seqCommands) {
        try {
            console.log("Bắt đầu lệnh:", cmd);
            let result = await execPromise(cmd);
            console.log("Chạy xong lệnh: ", cmd);
        } catch (err) {
            console.log("Lỗi thực thi LỆNH: ", cmd, `***>ERR:\n\n`, err);
        }
    }
})();