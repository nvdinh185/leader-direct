// các tên toán tử so sánh trong sql của mệnh đề where
const OPERATORS = [
    "$lt",
    "$lte",
    "$gt",
    "$gte",
    "$in",
    "$nin",
    "$ne",
    "$exist",
    "$null",
    "$like",
];

/**
 * Xác nhận tính hợp lệ của mệnh đề where
 * @param {*} where
 * Mệnh đề where phải có dạng {key:value} hoặc {key:{$OPERATORS:value}}
 * OUTPUT: trả về {error và jsonWhere}, nếu có lỗi thì không có jsonWhere
 */
module.exports = (where) => {
    let jsonWhere = {};
    if (!where || !Object.keys(where).length) {
        return {
            error: `Không có mệnh đề wheres để cập nhập dữ liệu`,
        };
    }
    // console.log("Where", where);
    // nếu số lượng key của
    for (let key in where) {
        let value = where[key];
        // kiểm tra tính hợp lệ của giá trị trong mệnh đề where
        if (
            (typeof value !== "string" &&
                typeof value !== "number" &&
                typeof value !== "object") ||
            (typeof value === "object" && !Object.keys(value).length) ||
            (typeof value === "object" &&
                Object.keys(value).length &&
                (Object.keys(value).filter((x) => !OPERATORS.includes(x)).length ||
                    !Object.keys(value).filter((x) => OPERATORS.includes(x)).length))
        ) {
            return {
                error: `Giá trị của mệnh đề where không hợp lệ`,
            };
        }
        jsonWhere[key] = value;
    }
    // console.log("where:", where, jsonWhere);
    return {
        jsonWhere,
    };
};