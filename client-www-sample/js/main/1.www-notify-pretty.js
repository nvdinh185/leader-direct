/* 
Các hàm sử dụng để tô điểm không gian của trang web đẹp
Gồm: 
- fakeLoading: Giả lập thanh trạng thái loading 
- showToast: Hiển thị toast đẹp cho 4 trạng thái thực thi tuần tự, thông báo cho người dùng biết các trình tự thực hiện của trang web một cách tường minh
- showHideLoading: Hiển thị thanh trạng thái tiến trình thực thi công việc, để client không bị nhàm chán khi trang web đang thực thi xử lý các tác vụ tốn nhiều thời gian
- showApiError: Hiển thị lỗi nhằm hỗ trợ dev hiểu rõ bản chất lỗi nằm ở khâu nào để hỗ trợ fix lỗi một cách nhanh nhất
*/

/**
 * hàm giả lập loading đợi kết quả trong thời gian, để thanh trạng thái chạy
 * milisecondLoading = 5000; // tối đa một hàm api chạy 5 giây, nếu quá mà hàm đó không trả lời hoặc lỗi thì thoát luôn tự động
 */
function fakeLoading(milisecondLoading = 5000, step = 10) {
  HOME_PARAMS.totalProgress = milisecondLoading; // bắt đầu thực thi
  HOME_PARAMS.currentProgress = 0; // giả lập một timeInterval để chạy %, quá thời gian mà api chưa thực thi xong thì xem timeout và thoát
  showHideLoading(true, HOME_PARAMS.totalProgress, HOME_PARAMS.currentProgress);
  let interval = setInterval(() => {
    // nếu thời gian đã vượt quá
    if (HOME_PARAMS.currentProgress >= HOME_PARAMS.totalProgress) {
      clearInterval(interval);
      showHideLoading(false);
      return;
    }
    HOME_PARAMS.currentProgress += step;
    showHideLoading(
      true,
      HOME_PARAMS.totalProgress,
      HOME_PARAMS.currentProgress
    );
  }, step);
}

/**
     *  Hiển thị trạng thái xuất hiện rồi tự biến mất
     * status = "success" || "info" || "warning" || "error"
     * position = "toast-top-right"
        , "toast-bottom-right"
        , "toast-bottom-left"
        , "toast-top-left"
        , "toast-top-full-width"
        , "toast-bottom-full-width"
        , "toast-top-center"
        , "toast-bottom-center"
     */
function showToast(status, message, position, timeOut, isForce) {
  toastr.options = {
    positionClass: position || "toast-top-right",
    timeOut: timeOut || (status === "error" ? 10000 : 2000),
  };
  if (HOME_PARAMS.isDebug || isForce) {
    toastr[status || "warning"](message || "", status || "warning");
  }
}

/**
 * status = true thì show lên, false thì ẩn đi
 * hiển thị luôn thanh trạng thái để di chuyển
 */
function showHideLoading(status, totalSize, curSize) {
  if (status && totalSize && !curSize) {
    $("body").addClass("loading");
  }
  // hiển thị quá trình loading
  if (status && totalSize && curSize) {
    const $processBar = $(".progress-bar");
    $processBar.css("width", `${((100 * curSize) / totalSize).toFixed()}%`);
    $processBar.html(`${((100 * curSize) / totalSize).toFixed()}%`);
  }
  if (!status) {
    $("body").removeClass("loading");
  }
}

/**
 * Hàm hiển thị lỗi nhúng vào tất cả các hàm gọi trả ra lỗi cho đơn giản
 * @param {*} err 
 * @param {*} isForce = true 
 */
function showApiError(err, isForce = true) {
  if (
    !err.responseJSON ||
    !err.responseJSON.message ||
    typeof err.responseJSON.error === "object"
  )
    console.log(err);
  showToast(
    "error",
    `${err.responseJSON && err.responseJSON.message
      ? `${err.responseJSON.message} ${typeof err.responseJSON.error === "object"
        ? JSON.stringify(err.responseJSON.error)
        : ""
      }`
      : `Lỗi truy vấp API ${JSON.stringify(err)}`
    }`,
    "toast-top-right",
    5000,
    isForce
  );
}
