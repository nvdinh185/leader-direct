const DDDoS = require('dddos');
module.exports = new DDDoS({
    errorData: "Đừng cố truy cập với tần suất cao như thế, đợi chút truy cập lại nhé!",
    //Data to be passes to the client on DDoS detection. Default: "Not so fast!".
    errorCode: 429,
    //HTTP error code to be set on DDoS detection. Default: 429 (Too Many Requests)
    // weight: 5,
    // maxWeight: 40,
    checkInterval: 1000,
    rules: [
        {
            regexp: "^/media/user-rights/*",
            maxWeight: 3
        }
        ,
        {
            regexp: "^/media/user-tables/*",
            maxWeight: 5
        }
        ,
        {
            regexp: "^/media/models/*",
            maxWeight: 5
        }
        ,
        {
            string: "/media/files/post-chunk",
            maxWeight: 1000
        }
        ,
        {
            regexp: "^/media/files/get-public-file/*",
            maxWeight: 1000                           // cho phép đọc 20 file trong 1 giây
        },
        {
            regexp: "^/media/files/get-1-file/*",
            maxWeight: 100                           // cho phép đọc 20 file trong 1 giây
        }
        ,
        //cho phép tất cả các đường dẫn còn lại tối đa là 16 phiên/30 giây
        { // Allow up to 10 other requests per check interval.
            regexp: ".*",
            maxWeight: 100
        }
    ]
})
    ;
