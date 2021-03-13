// 1. đọc thư mục muốn làm gọn code - duyệt danh sách file đầy đủ
// 2. đọc nội dung từng file text (code)
// 3. sử dụng công cụ xóa comment
// 4. tạo lại file mới trong thư mục đích để đưa lên web server

const fs = require("fs");
const path = require("path");
const mime = require("mime-types");


const {
    createSubFolder,
    convertPath2ObjectName,
    createEntryIndex,
    arrObj,
} = require("cng-node-js-utils");


const {
    rootEntry,
    srcDir,
    desDir
} = require("./config/params");

const orgDir = `${rootEntry}${srcDir}`;
const desRoot = `${rootEntry}${desDir}${srcDir}`;
if (!fs.existsSync(desRoot)) {
    createSubFolder(rootEntry, `${desDir}${srcDir}`);
}

// gọi đọc đường dẫn gốc
removeComments(orgDir, desRoot);

// bên trong nó đọc luôn đường dẫn con cấp sâu nhất
async function removeComments(srcRootDir, desRootDir) {
    // console.log(srcRootDir);
    // 1. đọc thư mục muốn làm gọn code - duyệt danh sách file đầy đủ
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
                removeComments(srcfileName, desFilename);
            } else {
                // là file, kiểm tra kiểu file rồi tiến hành đọc 
                let fileType = mime.lookup(subFolder);
                console.log("--->", fileType, `${subFolder}`);
                // nếu xác định các loại file này thì làm nhỏ code
                if (fileType === "text/html"
                    || fileType === "application/javascript"
                ) {

                    const minify = require('minify');
                    const tryToCatch = require('try-to-catch');
                    const options = {
                        html: {
                            removeAttributeQuotes: false,
                            removeOptionalTags: false
                        }
                    };
                    const [error, data] = await tryToCatch(minify, srcfileName, options);

                    if (error)
                        return console.error("Lỗi", error.message);

                    // và tạo ra file mới tại thư mục desDir
                    // if (!fs.existsSync(desFilename)) {
                    fs.writeFileSync(
                        desFilename, `${data}`);
                    // }

                } else {
                    // copy trực tiếp luôn
                    fs.copyFile(srcfileName, desFilename, (err) => {
                        if (err) throw err;
                        console.log("+++> cp: ", fileType, `${desFilename}`);
                    });
                }
            }
        }
    }
}

// 2. đọc nội dung từng file text (code)
// 3. sử dụng công cụ xóa comment
// 4. tạo lại file mới trong thư mục đích để đưa lên web server

// const str = strip('const foo = "bar";// this is a comment\n /* me too *\/');

// console.log(str);
