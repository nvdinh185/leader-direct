const ORG_ROLE = {
  ASSESSOR: 21,
  EXECUTOR: 22,
};

const D_STATUS = {
  D_DEL: 0,
  D_NEW: 1,
  D_U_CRIT: 2,
  D_U_CMT: 3,
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
  ASS_COMPLETE: 116,
};

const DO_DX_STT_MAP = {
  11: { DX: 51, DO_ASS: 112 },
  12: { DX: 52, DO_ASS: 112 },
  13: { DX: 53, DO_ASS: 112 },
  14: { DX: 54, DO_ASS: 114 },
  15: { DX: 55, DO_ASS: 115 },
  111: { DX: 61 },
  112: { DX: 62 },
  113: { DX: 63 },
  114: { DX: 64 },
};

const DO_DA_MAP = {
  51: { DX: 51, DO_ASS: 112 },
  52: { DX: 52, DO_ASS: 112 },
  53: { DX: 53, DO_ASS: 112 },
  54: { DX: 54, DO_ASS: 114 },
  55: { DX: 55, DO_ASS: 115 },
};

module.exports = {
  ORG_ROLE,
  DX_STATUS,
  DO_STATUS,
  DO_DX_STT_MAP,
  ASS_TYPES,
  D_STATUS,
  DO_DA_MAP,
};
