// Đây là thủ tục tạo tự động từ ./test/create-api-functions/x-create-api-routers-handlers.js by cuong.dq
// Dữ liệu gốc từ file excel ./db/excel/api-function-granted-users-cdld.xlsx
// Được tạo và lúc 2021-05-31 15:44:25


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
     * (101) POST /leader-direct/api/get-meeting
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getMeeting(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getMeeting từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (102) POST /leader-direct/api/create-meeting
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createMeeting(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createMeeting từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (103) POST /leader-direct/api/update-meeting
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateMeeting(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateMeeting từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (104) POST /leader-direct/api/get-direct
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirect(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirect từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (105) POST /leader-direct/api/get-direct-by-cat
     * 
     * Lấy Direct theo Cat -> Truyền cat-id vào
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirectByCat(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirectByCat từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (106) POST /leader-direct/api/create-direct
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createDirect(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createDirect từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (107) POST /leader-direct/api/update-direct
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateDirect(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateDirect từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (108) POST /leader-direct/api/get-direct-org
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirectOrg(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirectOrg từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (109) POST /leader-direct/api/get-direct-by-org
     * 
     * Lấy Chỉ Đạo Đơn Vị Theo Mã Đơn Vị (organization-id)
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirectByOrg(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirectByOrg từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (110) POST /leader-direct/api/get-direct-org-all
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirectOrgAll(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirectOrgAll từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (111) POST /leader-direct/api/create-direct-org
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createDirectOrg(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createDirectOrg từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (112) POST /leader-direct/api/update-direct-org
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateDirectOrg(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateDirectOrg từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (113) POST /leader-direct/api/get-direct-exe
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getDirectExe(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getDirectExe từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (114) POST /leader-direct/api/create-direct-exe
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createDirectExe(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createDirectExe từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (115) POST /leader-direct/api/update-direct-exe
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateDirectExe(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateDirectExe từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (116) POST /leader-direct/api/get-category
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getCategory(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getCategory từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (117) POST /leader-direct/api/create-category
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createCategory(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createCategory từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (118) POST /leader-direct/api/update-category
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateCategory(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateCategory từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (119) POST /leader-direct/api/get-statuses
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getStatuses(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getStatuses từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (120) POST /leader-direct/api/get-status-by-cat-id
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getStatusByCatId(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getStatusByCatId từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (121) POST /leader-direct/api/create-status
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createStatus(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createStatus từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (122) POST /leader-direct/api/update-status
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateStatus(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateStatus từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (123) POST /leader-direct/api/get-users
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getUsers(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getUsers từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (124) POST /leader-direct/api/create-user
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createUser(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createUser từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (125) POST /leader-direct/api/update-user
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateUser(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateUser từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (126) POST /leader-direct/api/get-menus
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getMenus(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getMenus từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (127) POST /leader-direct/api/create-menu
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createMenu(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createMenu từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (128) POST /leader-direct/api/update-menu
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateMenu(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateMenu từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (129) POST /leader-direct/api/get-organizations
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    getOrganizations(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: getOrganizations từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (130) POST /leader-direct/api/create-organization
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    createOrganization(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: createOrganization từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


    /**
     * (131) POST /leader-direct/api/update-organization
     * 
     * 
     * 
     * 
     * - Yêu cầu ĐƯỢC PHÂN QUYỀN
     * 
     * SAMPLE INPUTS:  
     */
    updateOrganization(req, res, next) {

        
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
        req.finalJson = { test: "Đây là dữ liệu test của HÀM: updateOrganization từ lớp: ./handlers/logs-1.0/api-handler.js" }
        next();

    }


}

module.exports = new ApiHandler();