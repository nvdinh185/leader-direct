import React from "react";
import { Input, Switch, InputNumber, DatePicker, Tooltip, Button, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import * as COMMON from "@constants/common";
import * as datatypes from "@constants/datatypes";
import moment from "moment";
import DateCell from "@components/Admin/DateCell";

export const reCreateOrderSttArray = (array) => {
  if (array[0]["stt"] !== undefined || array[0]["order"] !== undefined) {
    let incrementCount = 1;
    array.forEach((element) => {
      element.stt = incrementCount;
      incrementCount += 1;
    });
    return array;
  }
};

/**
 * Nhận vào mảng các object và trả về các unique của mảng object này
 * @param {obj[]} objArr Mảng object cần dựng table col
 * @returns {string[]}
 */
const returnUniqueKeyOfObjArr = (objArr) => {
  return objArr.reduce((aggr, obj) => {
    for (let key of Object.keys(obj)) {
      if (!aggr.includes(key)) {
        aggr.push(key);
      }
    }
    return aggr;
  }, []);
};

// ------------------------------------------------------------------------------------------
// ------------- CREATE COLUMNS CONFIG BASE ON OBJECT OR PRE CONFIG OBJ ---------------------

/**
 * Trả về mảng đối tượng là các header config cho table của antd
 * @param {object[]} objArr Đối tượng chứa các key cần để render lên 1 dòng của table
 * @param {object} fnHandleChange Hàm để handle sự kiện khi click vào nút sửa đổi thông tin
 * @returns trả về mảng là config các cột cho antd table
 */
export const createColumnsFromObj = (objArr, fnHandleChange) => {
  let columns = [];
  for (const key of returnUniqueKeyOfObjArr(objArr)) {
    if (key === "_id") {
      continue;
    }
    let defaultCol = {
      title: key,
      width: key === "id" || key === "is_active" ? 2 : 5,
      dataIndex: key,
      key: key,
    };
    if (key === "status") {
      defaultCol = {
        ...defaultCol,
        render: (col) => {
          return (
            <Tag color={parseInt(col) === 1 ? "green" : "volcano"}>{parseInt(col) === 1 ? "Hoạt Động" : "Không Hoạt Động"}</Tag>
          );
        },
      };
    }
    if (COMMON.DATETIME_COLUMNS.includes(key)) {
      defaultCol = {
        ...defaultCol,
        render: (col) => {
          return <DateCell date={col} format="DD/MM/YYYY HH:mm"></DateCell>;
        },
      };
    }
    if (COMMON.TOOLTIP_COLS.includes(key)) {
      columns.push({
        ...defaultCol,
        width: 7,
        ellipsis: {
          showTitle: true,
        },
        render: (col) => (
          <Tooltip placement="topLeft" title={col}>
            {col}
          </Tooltip>
        ),
      });
    } else {
      columns.push(defaultCol);
    }
  }
  if (fnHandleChange) {
    columns.push({
      title: "Hành Động",
      key: "operation",
      fixed: "right",
      width: 3,
      render: (text, record, idx) => (
        <Button type="primary" shape="round" icon={<EditOutlined />} onClick={() => fnHandleChange(record)}>
          Sửa
        </Button>
      ),
    });
  }
  return columns;
};

/**
 * Trả về mảng đối tượng là các header config cho table của antd
 * @param {object} config Đối tượng chứa các config cần để render lên 1 dòng của table
 * @returns trả về mảng là config các cột cho antd table
 */
export const createColumnsFromConfig = (config, fnCallbackSwitch, fnHandleChange) => {
  let columns = [];
  // Case1: Tạo cột từ đối tượng config là dữ liệu lấy từ db
  if (config) {
    for (const [key, _value] of Object.entries(config)) {
      // Case 1.1: Nếu trường hợp trong table config trường display là false thì không hiển thị field này
      if (!_value.display) {
        continue;
      }
      // Case 1.2: Nếu table config field có thể sort được
      const sortObj = _value.isSort ? returnColumnWithSortable(key) : null;
      // Case 1.2: Nếu table config field có thể sort được
      const innerSwitch = _value.isSwitch
        ? renderEditCellBaseOnDatatype(_value.datatype, key, fnHandleChange, fnCallbackSwitch)
        : null;
      // Case 1.3: Nếu table config field có cấu hình có thể edit được
      const innerEditable = _value.isEdit
        ? renderEditCellBaseOnDatatype(_value.datatype, key, fnHandleChange, fnCallbackSwitch)
        : null;
      // Case 1.4: Nếu table config field có cấu hình có thể ellip  sis được
      const innerEllipsis = _value.isEllipsis ? returnColumnWithEllipsisCell() : null;
      columns.push({
        title: _value.headerName,
        width: _value.width ? parseInt(_value.width) : 100,
        dataIndex: key,
        key: key,
        stt: _value.stt,
        ...sortObj,
        ...innerSwitch,
        ...innerEditable,
        ...innerEllipsis,
      });
    }
    columns.sort((a, b) => a.stt - b.stt);
  }
  return columns;
};

function returnColumnWithSortable(key) {
  return {
    sorter: (a, b) => {
      // Case1: Sort if value is boolean
      if (typeof a[key] === "boolean") {
        return a === b ? 0 : a ? -1 : 1;
      }
      // Case2: Sort if value is string
      if (isNaN(parseInt(a[key]))) {
        if (a[key] < b[key]) {
          return -1;
        }
        return 1;
      }
      // Case3: Sort if value is number
      return parseInt(a[key]) - parseInt(b[key]);
    },
    // sortDirections: ["ascend"],
  };
}

function returnColumnWithEllipsisCell() {
  return {
    ellipsis: {
      showTitle: true,
    },
  };
}

// ---------------------------------- CREATE OF CONFIG TABLE -------------------------------------
export function createDataTableConfig(defaultObj, configState) {
  let count = 1;
  let data = [];
  // If full and nothing to compare -> get from firestore (redux as well)
  if (configState && Object.entries(configState).length >= Object.entries(defaultObj).length) {
    for (const [key, value] of Object.entries(configState)) {
      data.push(value);
      count += 1;
    }
    data.sort((a, b) => {
      return a.stt - b.stt;
    });
    return [data, count];
  }
  if (configState) {
    for (const [key, _value] of Object.entries(defaultObj)) {
      if (configState.hasOwnProperty(key)) {
        data.push(configState[key]);
      } else {
        data.push({
          field: key,
          headerName: "",
          display: false,
          stt: count,
        });
      }
      count += 1;
    }
    reCreateOrderSttArray(data);
    return [data, count];
  }
  for (const [key, _value] of Object.entries(defaultObj)) {
    data.push({
      field: key,
      headerName: "",
      display: false,
      stt: count,
    });
    count += 1;
  }
  return [data, count];
}

// ------------------------------------ RENDER EDIT FOR SPECIFIC DATATYPE --------------------------------
const dateFormat = "DD/MM/YYYY";

export const renderEditCellBaseOnDatatype = (datatype = "STRING", field, handleChangeMethod, fnCallbackSwitch) => {
  // Return the component base on the specific datatype
  switch (datatype) {
    case datatypes.STRING:
      return {
        render: (_, row) => {
          return (
            <Input
              prefix={row.icon ? row.icon : null}
              onChange={(e) => handleChangeMethod(_, row, field, e.target.value)}
              defaultValue={row[field] ? row[field] : ""}
            ></Input>
          );
        },
      };
    case datatypes.NUMBER:
      return {
        render: (_, row) => {
          return (
            <InputNumber
              prefix={row.icon ? row.icon : null}
              onChange={(e) => handleChangeMethod(_, row, field, e)}
              defaultValue={row[field] ? row[field] : ""}
            ></InputNumber>
          );
        },
      };
    case datatypes.DATE_STR:
      return {
        render: (_, row) => {
          return (
            <DatePicker
              disabled={row.disabled ? row.disabled : null}
              onChange={(e) => handleChangeMethod(_, row, field, e.format(dateFormat))}
              defaultValue={row[field] ? moment(row[field], dateFormat) : moment(new Date(), dateFormat)}
              format={dateFormat}
            ></DatePicker>
          );
        },
      };

    case datatypes.BOOLEAN:
      return {
        width: 8,
        render: (cell, row) => (
          <Switch
            onChange={(e) => {
              fnCallbackSwitch(cell, row, field, e);
            }}
            defaultChecked={row[field]}
          ></Switch>
        ),
      };

    case datatypes.MAP:
      return {
        // TODO: check store or call api to get select data
      };

    default:
      return {
        render: () => {
          return <Input></Input>;
        },
      };
  }
};
