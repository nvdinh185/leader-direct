import React from "react";
import { Input, Switch, InputNumber, DatePicker } from "antd";
import * as datatypes from "@constants/datatypes";
import moment from "moment";

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

export const createColumnsFromObjOrConfig = (obj, config, fnCallbackSwitch, fnHandleChange) => {
  let count = 0;
  let columns = [];
  // Case1: Tạo cột từ đối tượng config là dữ liệu lấy từ firebase về
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
      // Case 1.4: Nếu table config field có cấu hình có thể ellipsis được
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
      count += 1;
    }
    columns.sort((a, b) => a.stt - b.stt);
    return columns;
  }
  // Case2: Tạo cột từ đối tượng config là dữ liệu của default object (trong thư mục src/utils/default-obj.js)
  // Case này sử dụng lần đầu khi chưa có dữ liệu trên firebase
  for (const [key, _value] of Object.entries(obj)) {
    columns.push({
      title: key,
      width: 15,
      dataIndex: key,
      key: count,
    });
    count += 1;
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
