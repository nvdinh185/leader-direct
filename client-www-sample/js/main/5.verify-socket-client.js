// bắt đầu chờ kết nối máy chủ
// fake loading để gọi thời gian kiểm tra socket
fakeLoading(1000, 100);
showToast("info", "Bắt đầu kiểm tra kết nối máy chủ xác thực", "toast-top-right", 1000);
HOME_PARAMS.client.getDeviceId().then(async (deviceId) => {
    // console.log("Device ready: #", deviceId);
    showHideLoading(false); // nếu kết nối trước loading thì nó sẽ trả lại màn hình
    // kiểm tra xem login với token để lưu giữ socket với máy chủ theo user
    if (HOME_PARAMS.token)
        HOME_PARAMS.client
            .loginByToken(HOME_PARAMS.token)
            .then((tokenData) => {
                // console.log("login token by socket:",tokenData);
                showToast(
                    "success",
                    `Bạn đã đăng nhập thành công qua socket với username=${tokenData.userInfo.username}`,
                    "toast-top-right",
                    2000
                );
            })
            .catch((err) => {
                // console.log("Login token by socket error:", err);
                showToast("warning", err, "toast-top-right", 1000);
            });
});