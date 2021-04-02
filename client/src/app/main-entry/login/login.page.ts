import { Component, OnInit } from '@angular/core';
import { AuthService, CommonsService, DynamicFormMobilePage } from 'ngxi4-dynamic-service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: any = {
    title: `Login`
  }

  userInfo: any;

  constructor(
    private apiCommons: CommonsService
    , private apiAuth: AuthService
    , private mainService: MainService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.userInfo = this.mainService.getUserInfo();
      this.showUserInfo();
    }, 1000)
  }

  /**
   * xử lý nút bấm
   * @param btn 
   */
  onClick(btn) {

    // lệnh login
    if (btn.command === 'LOGIN') {
      this.login()
    }

    // lệnh logout
    if (btn.command === 'LOGOUT') {
      this.mainService.logout()
      this.userInfo = null
      this.formLogin = {
        title: "LOGIN"
        , color: 'primary'
        , items: [
          {
            type: "button"
            , options: [
              { name: "Đăng nhập", command: "LOGIN" }
            ]
          }
        ]
      }
    }

    // sửa thông tin user
    if (btn.command === 'EDIT' && this.userInfo) {
      this.editUser();
    }
  }

  /**
   * Gọi chức năng login
   */
  login() {

    let form = {
      title: 'Login'
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { type: 'title', name: 'Nhập user của email @mobifone.vn' }
        ,
        // form login gồm nhập username và password
        { type: 'text', key: 'username', name: 'Tên đăng nhập:', hint: 'Vui lòng nhập tên đăng nhập!', icon: 'contact', validators: [{ required: true, min: 1, max: 30 }] }
        , { type: "password", key: "password", name: "Mật khẩu", hint: "Vui lòng nhập mật khẩu!", icon: "key", validators: [{ required: true, min: 1, max: 20 }] }
        ,
        {
          type: 'button'
          , options: [
            {
              name: 'Đăng nhập'
              , next: 'CALLBACK'
              , url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login'
              , command: 'LOGIN'
            }
          ]
        }
      ]
    }

    this.apiCommons.openModal(DynamicFormMobilePage, {
      parent: this,
      callback: this.callbackLogin,
      form: form
    });

  }

  /**
   * Nếu đã đăng nhập thì hiển thị thông tin user đăng nhập
   * Nếu không thì gọi phương thức login() để popup form đăng nhập
   */
  showUserInfo() {

    if (this.userInfo) {
      this.formLogin = {
        title: "ĐÃ ĐĂNG NHẬP"
        , color: 'primary'
        , items: [
          {
            type: 'barcode',
            value: this.userInfo.username
          }
          ,
          {
            type: "details",
            details: [
              {
                name: "Username(*)",
                value: this.userInfo.username
              },
              {
                name: "Họ và tên(*)",
                value: this.userInfo.fullname
              },
              {
                name: "Nickname(*)",
                value: this.userInfo.nickname
              },
              {
                name: "Địa chỉ(*)",
                value: this.userInfo.address
              },
              {
                name: "Điện thoại(*)",
                value: this.userInfo.phone
              },
              {
                name: "Email(*)",
                value: this.userInfo.email
              }
            ]
          },
          { id: "avatar", type: "image-viewer", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg" }
          ,
          { id: "background", type: "image-viewer", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg" }
          ,
          {
            type: "button"
            , options: [
              { name: "Sửa (*)", command: "EDIT" }
              , { name: "Logout", command: "LOGOUT" }
            ]
          }
        ]
      }
    } else {
      this.login()
    }
  }

  /**
   * Lưu trữ token và userInfo
   * @param token 
   * @param userInfo 
   */
  saveToken(token, userInfo) {
    // console.log(token, userInfo);
    this.userInfo = userInfo;
    this.mainService.saveToken(token, userInfo);
    this.showUserInfo();
  }

  /**
   * Sửa thông tin cá nhân
   */
  editUser() {
    let form = {
      title: "SỬA THÔNG TIN CÁ NHÂN"
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { name: "Cập nhập các thông tin sau", type: "title" }
        , { key: "nickname", value: this.userInfo.nickname, name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] }
        , { key: "fullname", value: this.userInfo.fullname, name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 1 }] }
        , { key: "address", value: this.userInfo.address, name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 1 }] }
        , { key: "phone", value: this.userInfo.phone, name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] }
        , { key: "email", value: this.userInfo.email, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] }
        , { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg", options: { ratio: 1 / 1, max_width: 80 } }
        , { key: "background", type: "image", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg", options: { ratio: 16 / 9, max_width: 300 } }
        , {
          type: "button"
          , options: [
            { name: "Reset", next: "RESET" }
            ,
            { name: "Cập nhật", command: "EDIT-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/edit-user", token: true, next: "CALLBACK" }
          ]
        }
      ]
    }

    this.apiCommons.openModal(DynamicFormMobilePage, {
      parent: this,
      callback: this.callbackLogin,
      form: form
    });
  }

  /**
   * Tạo user mới
   * @param token 
   */
  createNewUser(username, token) {

    let form = {
      title: "TẠO THÔNG TIN CÁ NHÂN"
      , buttons: [
        { color: 'danger', icon: 'close', next: 'CLOSE' }
      ]
      , items: [
        { name: "Điền đầy đủ thông tin sau", type: "title" }
        , { key: "nickname", name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] }
        , { key: "fullname", name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 1 }] }
        , { key: "address", name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 1 }] }
        , { key: "phone", name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] }
        , { key: "email", value: username + "@mobifone.vn", name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] }
        , { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: "assets/imgs/avatar.jpg" }
        , { key: "background", type: "image", name: "ẢNH NỀN", value: "assets/imgs/background-idea.jpg" }
        , {
          type: "button"
          , options: [
            { name: "Tạo mới", command: "CREATE-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/create-user", token: token, next: "CALLBACK" }
          ]
        }
      ]
    }

    this.apiCommons.openModal(DynamicFormMobilePage, {
      parent: this,
      callback: this.callbackLogin,
      form: form
    });
  }

  /**
   * Hàm gọi lại cho form popup
   */
  callbackLogin = function (res) {
    return new Promise(resolve => {
      console.log(res);
      if (res.error) {
        this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
      } else if (res.response_data) {
        if (res.button.command === "LOGIN") {
          this.checkRight(res.response_data);
        }
        if (res.button.command === "CREATE-USER") {
          this.saveToken(res.button.token, res.response_data.data);
          this.apiCommons.showToast('Tạo mới thành công', 3000);
        }
        if (res.button.command === "EDIT-USER") {
          this.userInfo = res.response_data.data
          this.mainService.saveUserInfo(this.userInfo)
          this.apiCommons.showToast('Cập nhật thành công', 3000);
          this.showUserInfo()
        }
      }

      // close form
      resolve({ next: "CLOSE" });

    });
  }.bind(this);

  /**
   * Kiểm tra quyền truy cập
   * @param resData 
   */
  checkRight(resData) {
    // Kiểm tra đã có username trong csdl chưa để xác nhận đăng nhập hoặc đăng ký username mới
    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info', resData.token)
      .then(result => {
        // console.log('result: ', result);
        if (result && result.status === 'OK') {
          if (result.data) {
            // login thanh cong
            this.saveToken(resData.token, result.data);
            this.apiCommons.showToast('Login thành công', 3000);
          } else {
            this.apiCommons.showToast('Login thất bại', 2000);
            //Gọi lại form login
            this.login()
          }
        } else {
          // Chưa có user cần khai báo
          this.createNewUser(resData.username, resData.token);
        }
      })
      .catch(err => {
        console.log('Lỗi: ', err);
        this.apiCommons.showToast('Lỗi login!', 3000);
      });
  }

}
