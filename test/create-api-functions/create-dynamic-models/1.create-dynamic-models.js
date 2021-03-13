/**
 * Copy toàn bộ file từ thư mục ./dynamic-models/... sang ../../../midlewares/dynamic-models/... để sử dụng mô hình động
 */
const fs = require("fs");
const path = require("path");

const { createSubFolder } = require("cng-node-js-utils");

const mainDir = `${__dirname.substring(0, __dirname.length - 48)}`;

const dynamicModelFolder = `${path.sep}midlewares${path.sep}dynamic-models`;

const sampleMainDir = `${__dirname}${path.sep}dynamic-models`;

// console.log(mainDir);

function copySampleFile2MainFolder(sampleFolder, mainFolders, rootFolder) {
  
  // tạo thư mục con nếu chưa có
  createSubFolder(rootFolder, mainFolders);

  let subFolders = fs.readdirSync(sampleFolder);
  // liệt kê tất cả các folder hiện có
  for (let folder of subFolders) {
    let state = fs.lstatSync(`${sampleFolder}${path.sep}${folder}`);

    let fullFileName = `${rootFolder}${mainFolders}${path.sep}${folder}`;

    if (state.isDirectory()) {
      console.log("--dir: >", folder);
      createSubFolder(rootFolder, `${mainFolders}${path.sep}${folder}`);
      // thực hiện quét tiếp để tạo thư mục hoặc copy file cấp sâu hơn (đệ quy)
      copySampleFile2MainFolder(`${sampleFolder}${path.sep}${folder}`,`${mainFolders}${path.sep}${folder}`,rootFolder);
    } else {
      console.log("++ Copy sample file to: >", fullFileName);
      // thực hiện copy file mẫu sang đường dẫn kia
      if (!fs.existsSync(fullFileName)) {
        fs.copyFileSync(`${sampleFolder}${path.sep}${folder}`, fullFileName);
      }
    }
  }
}

// thực hiện copy file từ đường dẫn mẫu sang đường dẫn gốc với mức sâu xuống bên dưới thư mục con luôn (n cấp)
copySampleFile2MainFolder(sampleMainDir, dynamicModelFolder, mainDir);
