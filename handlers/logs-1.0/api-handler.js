// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/sqlite-inovation-manager-v2.xlsx
// Được tạo và lúc 2021-04-05 15:06:29


"use strict";

// nối csdl thông qua mô hình
// const dbOrm = require("../../db/db-connection-pool-main");
// trả lại DAO của database nguyên gốc như cũ để sử dụng các lệnh
// const db = dbOrm.getDbInstance();

// hoặc sử dụng trực tiếp mô hình để giao tiếp csdl 
// (nó hỗ trợ tự ràng buộc kiểu dữ liệu trước khi insert, update)
// const { your_model, your_model_1 } = require("../../midleware/your-model/models");

class ApiHandler {

    constructor() { }


    /**
     * (3) GET /innovations/api/get-idea-parameters
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    getIdeaParameters(req, res, next) {

        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getIdeaParameters từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (4) GET /innovations/api/get-ideas
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    getIdeas(req, res, next) {

        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getIdeas từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (5) GET /innovations/api/get-idea
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    getIdea(req, res, next) {

        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getIdea từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (6) GET /innovations/api/get-attach-files
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    getAttachFiles(req, res, next) {

        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getAttachFiles từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (7) GET /innovations/api/get-file-id
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    getFileId(req, res, next) {

        // thực hiện lấy các dữ liệu đầu theo phương thức GET, 
        // Có thể sử dụng theo mô hình phân trang để lấy giới hạn trang 
        // khi truy vấn một bảng với số lượng bảng ghi nhiều gây chậm trả kết quả, và xử lý tràn bộ nhớ server và client

        // let { page, limit, your_param , ...} = req.paramS;
        // page = page || 1;
        // limit = limit || 100;

        // ràng buộc kiểm tra dữ liệu yêu cầu
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getFileId từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (12) POST /innovations/api/create-idea
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    createIdea(req, res, next) {

        
        // if (!req.json_data) {
        //   req.error = "Dữ liệu post req.json_data không hợp lệ";
        //   next();
        //   return;
        // }

        // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
        // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS
    
        // let { your_param } = req.json_data;
    
        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createIdea từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (13) POST /innovations/api/edit-idea
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    editIdea(req, res, next) {

        
        // if (!req.json_data) {
        //   req.error = "Dữ liệu post req.json_data không hợp lệ";
        //   next();
        //   return;
        // }

        // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
        // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS
    
        // let { your_param } = req.json_data;
    
        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: editIdea từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (14) POST /innovations/api/delete-idea
     * 
     * 
     * 
     * 
     * 
     * 
     * SAMPLE INPUTS:  
     */
    deleteIdea(req, res, next) {

        
        // if (!req.json_data) {
        //   req.error = "Dữ liệu post req.json_data không hợp lệ";
        //   next();
        //   return;
        // }

        // thực hiện lấy các dữ liệu đầu vào tùy vào theo phương thức POST theo json_data hoặc form_data
        // hoặc có thể lấy theo phương thức tham số trên link sau dấu ? bằng req.paramS
    
        // let { your_param } = req.json_data;
    
        // yêu cầu ràng buộc các dữ liệu đầu vào phải có đầy đủ
        // if (!your_param) {
        //   req.error = "Không có dữ liệu theo yêu cầu";
        //   next();
        //   return;
        // }

        // yêu cầu ràng buộc user phải được login trước đó để lấy thông tin username
        // if (!req.user || !req.user.username) {
        //   req.error = "Bạn phải thực hiện login trước khi thực hiện chức năng này";
        //   next();
        //   return;
        // }


        // // Sử dụng các mẫu của mô hình để truy vấn (select), chèn mới (insert), cập nhập (update), xóa (delete) như sau:
        // 
        // // lấy 1 bảng ghi đầu tiên hợp lệ theo mệnh đề where
        // your_model.getFirstRecord(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //   ) 

        // // lấy các bảng ghi trong bảng theo phân trang trả về {page, data:[<mảng dữ liệu của bảng đọc được>], limit, length, next} ... xem hướng dẫn của mô hình
        // your_model.getPage(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc  
        //     // , { page, limit }                         // truy vấn trang số page, và giới hạn hiển thị limit bảng ghi 
        //    ) 

        // // trả về số lượng bảng ghi hợp lệ theo mệnh đề where
        // your_model.getCount(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // update 1 bảng ghi vào csdl
        // your_model.updateOneRecord(
        //    jsonData ,  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 

        // // xóa một bảng ghi
        // your_model.deleteOneRecord(
        //     {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //    ) 
        // // chèn một bảng ghi vào csdl
        // your_model.insertOneRecord(
        //    jsonData  // trong đó jsonData chứa các key là tên trường của bảng (your_model = tên bảng), nếu jsonData có các trường không khai báo ở mô hình thì sẽ tự bỏ qua
        //    ) 

        // // lấy toàn bộ bảng ghi trong bảng trả về mảng [] theo điều kiện where và giới hạn limit, cùng index của bảng ghi tại offset số nếu có
        // // ví dụ: select field_1, field_2 from your_model where key = 'value' order by field_1 asc, field_2 desc limit 5 offset 0
        // your_model.getAllData(
        //     // {key: "value" | {$<operator>: "value" } } // jsonWhere  = where key = 'value' | where key <operator> "value" trong đó <operator> gồm <, <=, >, >=, !=, in, not in, like, is null, is not null, ...
        //     // , { field_1: 1, field_2: 1, _id: 0 }      // jsonFields = list field to select field_1, field_2 from <table>
        //     // , { field_1: 1, field_2: -1 }             // jsonSort = order by field_1 asc, field_2 desc
        //     // , { limit: 5, offset: 0}                   // jsonPaging = limit 5 offset 0
        //   )

        //      // trả kết quả truy vấn cho api trực tiếp bằng cách sau
        //     .then(data => {
        //       // console.log('Data: ', data);
        //       req.finalJson = data;
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        //     // hoặc xử lý theo kiểu kiểm tra bảng ghi tồn tại hay không trước khi chèn hoặc update như sau
        //     .then(async data => {
        //       let message = "Đã truy vấn dữ liệu thành công";
        //       if (!data || !data.id){ // trong đó data.id là tên trường của bảng dữ liệu chắc chắn có để biết bảng ghi tồn tại
        //          // dữ liệu không tìm thấy khi kiểm tra 1 bảng ghi ... nếu kiểm tra nhiều bảng ghi thì phải xử lý kiểu mảng và lấy đối tượng đầu tiên
        //         await your_model.insertOneRecord({...jsonData})
        //               .catch(err=> { throw err });
        //         message = "Đã chèn mới dữ liệu thành công";
        //       }else{
        //          // dữ liệu có tìm thấy theo id, thực hiện update theo id
        //          await your_model.updateOneRecord({...jsonData}, {id})
        //               .catch(err=> { throw err });
        //         message = "Đã cập nhập lại dữ liệu thành công";
        //       }
        //       // console.log('Data: ', data);
        //       req.finalJson = {status:"OK",message};
        //       next();
        //     })
        //     .catch(err => {
        //       // console.log('Lỗi: ', err);
        //       req.error = err;
        //       next();
        //     });

        // mặt định chuyển tiếp sang hàm cuối cùng để trả kết quả
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: deleteIdea từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


}

module.exports = new ApiHandler();