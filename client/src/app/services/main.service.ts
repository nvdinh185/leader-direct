import { Injectable } from '@angular/core';
import { ApiStorageService, AuthService, CommonsService } from 'ngxi4-dynamic-service';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  token: string;
  userInfo: any;

  constructor(
    private apiStorage: ApiStorageService,
    private apiAuth: AuthService,
    private apiCommons: CommonsService
  ) { }

  /**
   * Đọc token từ đĩa, nếu có thì đẩy lên server để xác thực
   * Nếu xác thực thành công thì trả về userInfo
   */
  async getTokenInfo() {
    if (this.token && this.userInfo) {
      return this.userInfo;
    } else {
      let token = this.apiStorage.read("TOKEN");
      // console.log(token);
      if (token) {
        try {
          let result = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info', token)
          // console.log(result);
          if (result && result.status === 'OK' && result.data) {
            this.userInfo = result.data;
            this.token = token;
            this.apiAuth.token = token;
            return this.userInfo;
          }
        } catch (e) {
          console.log("Lỗi get-user-info: ", e);
        }
      }
    }
  }

  saveUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    this.apiCommons.publish('event-login-ok', this.userInfo);
  }

  /**
   * Lưu token xuống đĩa
   * @param token
   */
  saveToken(token: string, userInfo: any) {
    this.apiStorage.save("TOKEN", token);
    this.userInfo = userInfo;
    this.token = token;
    // Lưu token trong interceptor để sử dụng post, request tự động chèn token
    this.apiAuth.token = token;
    this.apiCommons.publish('event-login-ok', this.userInfo);
  }

  /**
   * Xóa token khỏi đĩa
   * Gán các thông số bằng null
   */
  logout() {
    this.apiStorage.delete("TOKEN");
    this.token = null;
    this.userInfo = null;
    this.apiAuth.token = null;
    this.apiCommons.publish('event-logout-ok');
  }

  getUserInfo() {
    return this.userInfo;
  }
}
