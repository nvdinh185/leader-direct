/**
 * Đây là một đối tượng JSCngDynamicForm sử dụng để tạo các form nhập liệu động kiểu bootstrap
 * let cngDynamicForm = new JSCngDynamicForm()
 *
 * let htmlForm = cngDynamicForm.createFormInput(formData)
 *
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
      ? define(["exports"], factory)
      : factory((global.JSCngDynamicForm = {}));
})(this, function (exports) {
  "use strict";
  var JSCngDynamicForm = /** @class */ (function () {
    function JSCngDynamicForm() { }

    /**
     * Tích hợp gọi debounce để kiểm chứng dữ liệu sau sự kiện keyup hoặc scroll
     * @param {*} fn
     * @param {*} delay
     */
    JSCngDynamicForm.prototype.debounce = function (fn, delay) {
      return (args) => {
        clearTimeout(fn.id);
        fn.id = setTimeout(() => {
          fn.call(this, args);
        }, delay);
      };
    };

    /**
     * Lấy jsonData nếu hợp lệ sau validatord
     * @param {*} formData
     */
    JSCngDynamicForm.prototype.getFormData = function (formData = []) {
      let jsonData = {};
      let valid = true;
      for (let el of formData) {
        let $Input = $(`#${el.key}`);
        el.invalid = false;
        if (el.validator) {
          if (el.validator.required && !$Input.val()) el.invalid = true;
          if (
            el.validator.min &&
            (!$Input.val() || $Input.val().length < el.validator.min)
          )
            el.invalid = true;
          if (
            el.validator.max &&
            (!$Input.val() || $Input.val().length > el.validator.max)
          )
            el.invalid = true;
          if (el.validator.pattern && $Input.val()) {
            let reg = new RegExp(el.validator.pattern);
            if (!reg.test($Input.val())) el.invalid = true;
          }
        }

        if (!el.invalid && el.key && el.value !== undefined) {
          jsonData[el.key] = $Input.val();
          $Input.addClass("is-valid");
          $Input.removeClass("is-invalid");
        } else {
          $Input.removeClass("is-valid");
          $Input.addClass("is-invalid");
          valid = false;
        }
      }

      return valid ? jsonData : valid;
    };

    /**
     * Tạo tiêu đề và nút lệnh bên trên
     * @param {*} header
     */
    JSCngDynamicForm.prototype.createHeader = function (header = {}) {
      let html = ``;
      if (
        !header ||
        typeof header !== "object" ||
        !Object.keys(header).length
      ) {
        return html;
      }

      if (header.title) {
        html += `<h5 class="modal-title text-center text-uppercase ${header.color || ""}">${header.title
          }</h5>`;
      }

      if (header.bg) {
        $(".modal-header").addClass(header.bg);
      }

      if (
        !header.buttons ||
        !Array.isArray(header.buttons) ||
        !header.buttons.length
      ) {
        return html;
      }

      for (let el of header.buttons) {
        switch (el.cmd) {
          case "CLOSE":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-cancel" data-dismiss="modal" aria-label="Close">
            ${el.icon
                ? `<i class="fa ${el.icon} icon"></i>&nbsp;`
                : `<span aria-hidden="true">&times;</span>`
              }
            ${el.name || ""}
          </button>`;
            break;
          case "POST":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-send-api" command-do="${el.cmd || ""}" command-next="${el.next || ""
              }" command-url="${el.url || ""}" command-token="${el.token || ""}">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;
          case "GET":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-send-api" command-do="${el.cmd || ""}" command-next="${el.next || ""
              }" command-url="${el.url || ""}" command-token="${el.token || ""}">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;

          default:
            break;
        }
      }
      return html;
    };

    /**
     * Tạo form nhập liệu
     * @param {*} formData
     */
    JSCngDynamicForm.prototype.createFormInput = function (formData = []) {
      let html = ``;
      if (!formData || !Array.isArray(formData) || !formData.length) {
        return html;
      }

      for (let el of formData) {
        switch (el.type) {
          case "textarea":
            html += `<div class="input-group-prepend">
                        <span
                          class="input-group-text input-params"
                          >${el.icon
                ? `<i class="fa ${el.icon} icon"></i>&nbsp;`
                : ``
              }${el.name || ""}</span
                        >
                      </div>
                      <textarea 
                      class="form-control textarea-autosize"
                      id="${el.key}"
                      rows="3"
                      placeholder="${el.hint || ""}">${el.value || ""}</textarea>
                      <div class="invalid-feedback">${el.hint || ""}</div>
                    </div>`;
            break;
          case "text":
            html += `<div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text input-params"
                          >${el.icon
                ? `<i class="fa ${el.icon} icon"></i>&nbsp;`
                : ``
              }${el.name || ``}</span
                        >
                      </div>
                      <input
                        type="${el.type}"
                        class="form-control"
                        id="${el.key}"
                        value='${el.value}'
                        aria-label="Default"
                        placeholder="${el.hint}"
                      />
                      <div class="invalid-feedback">${el.hint}</div>
                    </div>`;
            break;
          case "password":
            html += `<div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text input-params"
                          >${el.icon
                ? `<i class="fa ${el.icon} icon"></i>&nbsp;`
                : ``
              }${el.name || ``}</span
                        >
                      </div>
                      <input
                        type="${el.type}"
                        class="form-control"
                        id="${el.key}"
                        value="${el.value}"
                        aria-label="Default"
                        placeholder="${el.hint}"
                      />
                      <div class="invalid-feedback">${el.hint}</div>
                    </div>`;

            break;
          case "select":
            let options = ``;
            for (let opt of el.options) {
              options += `<option value="${opt.value}" ${el.value === opt.value ? `selected` : ``
                }>
                    ${opt.name}
                </option>`;
            }
            html += `<div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text"
                  >${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``
              }${el.name || ``}</label
                >
              </div>
              <select class="custom-select" id="${el.key}" value="${el.value}">
                ${options}
              </select>
              <div class="invalid-feedback">${el.hint}</div>
            </div>`;
            break;
          case "checkbox":
            html += `<div class="input-group mb-3">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="${el.value}" id="${el.key}">
                          <label class="form-check-label" for="${el.key}">
                            <i class="fa fa-clock-o icon"></i> ${el.name}
                          </label>
                          <div class="invalid-feedback">${el.hint || ""}</div>
                        </div>
                      </div>`;
            break;
          case "info":
            html += `<div class="row">
                        <div class="col-sm-4">${el.key}</div>
                        <div class="col-sm-8">${el.value || ""}</div>
                      </div>`;
            break;

          default:
            break;
        }
      }
      return html;
    };

    /**
     * Tạo nút lệnh bên dưới
     * @param {*} footerButtons
     */
    JSCngDynamicForm.prototype.createFooter = function (footerButtons = []) {
      let html = ``;
      if (
        !footerButtons ||
        !Array.isArray(footerButtons) ||
        !footerButtons.length
      ) {
        return html;
      }

      for (let el of footerButtons) {
        switch (el.cmd) {
          case "CLOSE":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-cancel">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;
          case "POST":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-send-api" command-do="${el.cmd || ""}" command-next="${el.next || ""
              }" command-url="${el.url || ""}" command-token="${el.token || ""}">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;
          case "GET":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-send-api" command-do="${el.cmd || ""}" command-next="${el.next || ""
              }" command-url="${el.url || ""}" command-token="${el.token || ""}">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;
          case "DO-ANY":
            html += `<button type="button" class="btn ${el.class || ""
              } btn-md btn-send-api" command-do="${el.cmd || ""}" command-next="${el.next || ""
              }" command-url="${el.url || ""}" command-token="${el.token || ""}">
            ${el.icon ? `<i class="fa ${el.icon} icon"></i>&nbsp;` : ``}
            ${el.name || ""}
          </button>`;
            break;

          default:
            break;
        }
      }
      return html;
    };

    /**
     * Tạo một table động theo cột cố định hoặc cột được tạo theo array đầu vào
     *
     * @param {*} rows mảng chứa các dòng dữ liệu bất kỳ kiểu json {keys:values}
     * @param {*} HEADER đối tượng chứa tên cột cố định sắp đặt trước
     * @param {*} cmdButtons các nút lệnh cần hiển thị ở cột đầu tiên sử dụng để thao tác từng dòng dữ liệu
     * @param {*} isEditable Khả năng cho phép chỉnh sửa dữ liệu (hoặc có thể định nghĩa ngay header)
     * @param {*} isRowId Hiển thị số thứ tự theo mảng dữ liệu
     * @param {*} idKey khóa chính truy vấn duy nhất theo key để tham chiếu row và lấy toàn bộ dữ liệu khi bấm nút
     * @param {*} cmdCellPopup Nút lệnh để gọi popup hiển thị chi tiết kết quả kiểu đối tượng (object)
     */
    JSCngDynamicForm.prototype.arrayObject2HtmlTable = function (
      rowsInput = [],
      HEADER = {},
      cmdButtons = "",
      isEditable = false,
      isRowId = false,
      idKey,
      cmdCellPopup
    ) {
      // tổ chức lại dòng hiển thị theo kết quả đưa vào
      let rows = Array.isArray(rowsInput)
        ? rowsInput
        : typeof rowsInput === "object" && Object.keys(rowsInput).length
          ? [rowsInput]
          : [{ data: JSON.stringify(rowsInput) }];

      if (!rowsInput || !Array.isArray(rows) || !rows.length) {
        return ``;
      }
      // sửa soạn tổ chức bảng theo tham số đưa vào
      let html = `<table cellspacing="0" id="table-datatables" class="table table-bordered table-striped">`;
      let header = {
        row_id: isRowId ? 1 : 0,
        commands: cmdButtons ? 1 : 0,
        ...HEADER,
      };

      // tổ chức sắp xếp thứ tự cột theo đối tượng headers đưa vào và kết quả lấy được
      for (let row of rows) {
        let r = {};
        for (let key in row) {
          if (key !== "_id")
            r[key] = HEADER[key] !== undefined ? HEADER[key] : 1;
        }
        header = { ...header, ...r };
      }

      // bắt đầu tạo header cho bảng
      html += "<thead><tr>";
      for (let key in header) {
        // chỉ tạo những cột có yêu cầu >0 thôi nhé 1 chỉ đọc, 2 cho phép edit
        if (header[key] > 0) html += "<th>" + key + "</th>";
      }
      html += "</tr></thead>";

      // bắt đầu in dữ liệu ra bảng
      html += "<tbody>";
      let rowId = 0; // thứ tự dòng
      for (let row of rows) {
        html += `<tr ${idKey && row[idKey] ? ` id="row-${row[idKey]}"` : ``}>`;
        // let i = 0; // thứ tự cột
        for (let key in header) {
          // chỉ tạo những cột có yêu cầu >0 thôi nhé 1 chỉ đọc, 2 cho phép edit
          if (header[key] > 0) {
            if (key === "row_id") {
              // đây là tên cột là stt ban đầu
              html += `<td class="text-nowrap"><span class="co-name">${(
                "" +
                (rowId + 1)
              ).padStart(3, 0)}</span></td>`;
            } else if (key === "commands") {
              // đây là tên cột chứa các lệnh thực thi
              html += `<td class="text-nowrap"><span class="co-name">${cmdButtons}</span></td>`;
            } else if (row[key] && typeof row[key] === "object" && cmdCellPopup) {
              // bổ sung ngày 23/01/2021 by cuong.dq
              // khóa chính để tham chiếu đến cell này để truy vấn được từ mảng kết quả ghi được là = row_id,col_key 
              // giá trị của cột là đối tượng (không phải null) thì - chuyển string (xấu), hoặc hiển thị lệnh để mở ra xem kết quả đó (popup (ok) - hoặc chuyển trang (xấu))
              html += `<td class="text-nowrap" col_key="${key}" row_id="${rowId}"><span class="co-name">${cmdCellPopup}</span></td>`;
            } else {
              // đây là tên cột bình thường (xét cho phép edit hay không?)
              html += `<td class="pt-3-half ${isEditable || header[key] === 2 ? `bg-warning` : ``}" contenteditable="${isEditable || header[key] === 2 ? `true` : `false`
                }">${row[key] === undefined || row[key] === null ? "" : row[key]
                }</td>`;
            }
          }
        }
        html += "</tr>";
      }
      html += "</tbody>";
      html += "</table>";
      return html;
    };

    return JSCngDynamicForm;
  })();
  window.JSCngDynamicForm = JSCngDynamicForm;
  exports.JSCngDynamicForm = JSCngDynamicForm;
  exports.default = JSCngDynamicForm;
  Object.defineProperty(exports, "__esModule", { value: true });
});
