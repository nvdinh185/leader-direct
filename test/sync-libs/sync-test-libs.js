// liệt kê tất cả các file mẫu trong thư viện
// copy vào dự án này - copy đè các file mẫu chuẩn - không copy các file cấu hình đã chỉnh sửa
const { ROOT_LIB } = require("cng-auto-server");

// bước 1: liệt kê tất cả các file ở thư mục src
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const {
    createSubFolder,
    convertPath2ObjectName,
    createEntryIndex,
    arrObj,
} = require("cng-node-js-utils");

// khai báo đường dẫn cần copy
const { EXCLUDE_FILES, SUB_DIR, ROOT } = require("./config");


console.log("***> cp SRC --> DES ==>", ROOT_LIB, ROOT, SUB_DIR);


// khai báo đường dẫn nguồn cần copy file
const srcDir = `${ROOT_LIB}${path.sep}create-server${path.sep}sample-server${path.sep}${SUB_DIR}`;
// khai báo đường dẫn đích cần đưa file đến
const desRoot = `${ROOT}${path.sep}${SUB_DIR}`;
if (fs.existsSync(srcDir) && !fs.existsSync(desRoot)) {
    createSubFolder(ROOT, `${SUB_DIR}`);
    console.log(`***> Tạo đường dẫn gốc ${SUB_DIR} OK!`);
}

// liệt kê tất cả các file, đường dẫn trong nguồn và copy vào thư mục đích
processCopyFile(srcDir, desRoot);

function processCopyFile(srcRootDir, desRootDir) {
    // 1. đọc thư mục gốc duyệt toàn bộ các thư mục và file
    let subFolders = fs.readdirSync(srcRootDir);
    for (let subFolder of subFolders) {
        let srcfileName = `${srcRootDir}${path.sep}${subFolder}`;
        let desFilename = `${desRootDir}${path.sep}${subFolder}`;
        let stats = fs.statSync(srcfileName);
        if (subFolder) {
            if (stats.isDirectory()) {
                // là thư mục nên sẽ tạo tiếp đường dẫn phụ ở đích
                if (!fs.existsSync(desFilename)) {
                    createSubFolder(desRootDir, `${path.sep}${subFolder}`);
                }
                // là thư mục thì đọc tiếp cho cấp sâu hơn để lấy file
                processCopyFile(srcfileName, desFilename);
            } else {
                // là file, kiểm tra kiểu file rồi tiến hành đọc 
                let fileType = mime.lookup(subFolder);
                // console.log("---> loại file và tên file", fileType, `${subFolder}`, EXCLUDE_FILES.includes(subFolder));
                if (!EXCLUDE_FILES.includes(subFolder)) {
                    // copy trực tiếp lên đè file cũ luôn luôn
                    fs.copyFile(srcfileName, desFilename, (err) => {
                        if (err) throw err;
                        console.log("+++> cp: ", fileType, `${desFilename}`);
                        return;
                    });
                } else {
                    // bỏ qua các file này không copy sang nếu nó đã tồn tại rồi
                    if (!fs.existsSync(desFilename)) {
                        fs.copyFile(srcfileName, desFilename, (err) => {
                            if (err) throw err;
                            console.log("+++> cp WHEN NO EXIST: ", fileType, `${desFilename}`);
                            return;
                        });
                    }else{
                        console.log("---> NO cp: ", fileType, `${desFilename}`);
                    }
                }

            }
        }
    }
    return ;
}

// copy tất cả các thư viện của một máy chủ mẫu:
