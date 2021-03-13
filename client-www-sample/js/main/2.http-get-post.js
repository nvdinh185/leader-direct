/**
 * Hàm kiểm soát gõ phím, nếu ngừng gõ sau thời gian trễ sẽ trả kết quả
 * Cách sử dụng:
 * let $Input = $(`#${rowForm.id}`);
   $Input.keyup(
    debounce(function (event) {
      let value = event.target.value;

      // thực hiện validate nếu lỗi thì hiển thị lỗi luôn

      // $Input.addClass("is-invalid");
      // $Input.removeClass("is-valid");

      $Input.addClass("is-valid");
      $Input.removeClass("is-invalid");

      // console.log("Đối tượng này",value);
    }, 500)
  );
 */
function debounce(fn, delay) {
  return (args) => {
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}

/**
 * apiPath: là đường dẫn api phía sau đường dẫn cơ bản - đã bao gồm /router_api và /function_api/:param?paramS
 * getParamS: abc=xyz&cde=123 là chuỗi tham số get lên máy chủ bổ sung thêm
 * baseUrlFull: là đường dẫn máy chủ chứa cả đường dẫn cơ sở thì ưu tiên, nó bao gồm http trong đó rồi thì sử dụng nó, không lấy từ tham số
 */
function callAjaxGETApiAny(apiPath, getParamS, baseUrlFull, noToken) {
  let url = `${baseUrlFull
    ? baseUrlFull
    : `${API_PARAMS.getKey("SERVER_DOMAIN", true) || API_PARAMS.SERVER_DOMAIN
    }${API_PARAMS.getKey("BASE_DIRECTORY", true) || API_PARAMS.BASE_DIRECTORY
    }`
    }${apiPath || ""}${getParamS && typeof getParamS === "string"
      ? `${(apiPath && apiPath.indexOf("?") >= 0) || (baseUrlFull && baseUrlFull.indexOf("?") >= 0) ? "&" : "?"}${getParamS || ""}`
      : ``
    }`;
  return new Promise((rs, rj) => {
    $.ajax({
      type: "GET",
      headers: { Authorization: `Bearer ${noToken ? "" : HOME_PARAMS.token}` },
      url,
      dataType: "json",
      success: (result) => {
        rs(result); // trả kết quả cho nơi gọi nó kiểu promise nhé
      },
      error: (err) => {
        rj(err); // trả kết quả cho nơi gọi nó
      },
    });
  });
}

/**
 * apiPath: là đường dẫn api phía sau đường dẫn cơ bản - đã bao gồm /router_api và /function_api/:param?paramS
 * jsonParams: {} || [] là chuỗi tham số json post lên máy chủ api
 * baseUrlFull: là đường dẫn máy chủ chứa cả đường dẫn cơ sở thì ưu tiên, nó bao gồm http trong đó rồi thì sử dụng nó, không lấy từ tham số
 */
function callAjaxPOSTApiAny(apiPath, jsonParams, baseUrlFull, noToken) {
  let url = `${baseUrlFull
    ? baseUrlFull
    : `${API_PARAMS.getKey("SERVER_DOMAIN", true) || API_PARAMS.SERVER_DOMAIN
    }${API_PARAMS.getKey("BASE_DIRECTORY", true) || API_PARAMS.BASE_DIRECTORY
    }`
    }${apiPath || ""}`;


  return new Promise((rs, rj) => {
    $.ajax({
      type: "POST",
      headers: { Authorization: `Bearer ${noToken ? "" : HOME_PARAMS.token}` },
      url,
      dataType: "json", // what you expect the server to return
      contentType: "application/json", // what you are sending - để bỏ qua chuỗi json có nhiều hơn một dấu ? liên tiếp
      data: JSON.stringify(jsonParams),
      success: (result) => {
        rs(result); // trả kết quả cho nơi gọi nó kiểu promise nhé
      },
      error: (err) => {
        rj(err); // trả kết quả cho nơi gọi nó
      },
    });
  });
}

/**
 * Nhúng các trang html tĩnh vào trang web chính bằng cách sử dụng thẻ thuộc tính
 *  <div c3-include-html="./popups/modal.html"></div>
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("c3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("c3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}
