/**
 * Hàm tạo mã uuid v4 duy nhất dùng để trả về id cho các hàm cần
 * @returns {string} uuid -> Trả về mã uuid v4
 */
const generateUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = Math.random() * 1000;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

// ---------------------------------------------------------------------------------
function convertDateToDDMMYYY(dateObj = null) {
  // Nếu có đối tượng Date truyền vào thì convert theo đối tượng đó
  if (dateObj) {
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = dateObj.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  // Nếu ko có đối tượng Date truyền vào thì cứ dùng ngày hiện tại mà phang vào
  const dd = String(new Date().getDate()).padStart(2, "0");
  const mm = String(new Date().getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = new Date().getFullYear();
  // String(dateStr.toDate().getDate()).padStart(2, "0")
  return `${dd}/${mm}/${yyyy}`;
}

module.exports = { generateUUID, convertDateToDDMMYYY };
