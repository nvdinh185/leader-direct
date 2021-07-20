const ORG_ROLE = {
  ASSESSOR: 21,
  EXECUTOR: 22,
};

const DX_STATUS = {
  CREATE_DIRECT: 51,
  UPDATE_EXE_STATUS: 52,
  UPDATE_CMPLT_PRCT: 53,
  UPDATE_CMPLT: 54,
  REQ_EXT1: 55,
  UPDATE_DELAY_REASON: 56,
};

const ASS_TYPES = {
  UPDATE_CRIT: 61,
  ASS_EXE: 62,
  ASS_EXE_CMPLT: 63,
  ACCEPT_EXT1: 64,
  UPDATE_LEADER_OPINION: 65,
};

const DO_STATUS = {
  NEW: 11,
  ONGOING: 12,
  COMPLETE_PRCT: 13,
  COMPLETE: 14,
  EXTEND1: 15,
  ASS_UP_CRIT: 111,
  ASS_EXE: 112,
  ASS_EXE_CMPLT: 114,
  ASS_ACC_EX1: 115,
};

const DO_DX_STT_MAP = {
  11: { DX: 51, DO_ASS: 111 },
  12: { DX: 52, DO_ASS: 112 },
  13: { DX: 53, DO_ASS: 113 },
  14: { DX: 54, DO_ASS: 113 },
  15: { DX: 55, DO_ASS: 115 },
  111: { DX: 61 },
  112: { DX: 62 },
  113: { DX: 63 },
  114: { DX: 64 },
};

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

module.exports = { generateUUID, ORG_ROLE, DX_STATUS, DO_STATUS, DO_DX_STT_MAP, ASS_TYPES };
