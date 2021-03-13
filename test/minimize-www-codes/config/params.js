module.exports = {
    // đường dẫn gốc để thực thi đọc src và tạo des
    rootEntry: __dirname.substring(0, __dirname.length - 31),
    srcDir: "/midlewares", // đường dẫn cần tối giảm source - để trình webclient nhẹ nhàn khi load và làm khó cho hacker muốn nghiên cứu code vì nó không tường minh
    desDir: "/build",      // đường dẫn code đã tối giảm - xóa tất cả các comment

};
