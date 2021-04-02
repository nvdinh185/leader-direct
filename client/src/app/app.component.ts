import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, CommonsService } from 'ngxi4-dynamic-service';
import { MainService } from './services/main.service';

import { environment } from './../environments/environment'
import { environment_web } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  //cây này sẽ nhúng vào component tree-menu để hiển thị menu
  treeMenu: any = [];

  //Thông tin người dùng login vào chương trình
  userInfo: any;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private apiAuth: AuthService,
    private apiCommons: CommonsService,
    private mainService: MainService
  ) { this.init() }

  /**
   * Khởi tạo các biến đầu tiên
   */
  async init() {
    this.apiAuth.serviceUrls.AUTH_SERVER = environment.AUTH_SERVER;
    this.apiAuth.serviceUrls.RESOURCE_SERVER = environment.RESOURCE_SERVER;

    // this.apiAuth.serviceUrls.AUTH_SERVER = environment_web.AUTH_SERVER;
    // this.apiAuth.serviceUrls.RESOURCE_SERVER = environment_web.RESOURCE_SERVER;

    this.apiCommons.subscribe('event-login-ok', userInfo => {
      this.userInfo = userInfo
      // gọi tổ chức menu khi login thành công
      this.refresh();
    })

    this.apiCommons.subscribe('event-logout-ok', () => {
      this.userInfo = null
      this.refresh();
    })

    this.userInfo = await this.mainService.getTokenInfo();
    // console.log(this.userInfo);
    this.refresh();

  }

  /**
   * Làm mới menu sau khi load, login hoặc logout
   */
  refresh() {
    // Khai báo menu Mặc định
    this.treeMenu = [
      {
        id: 1,
        name: 'Văn phòng sáng tạo',
        size: '1.1em',
        type: 'route',
        url: '/home',
        icon: 'home'
      }
      ,
      {
        id: 2,
        name: 'Login/Logout',
        type: 'route',
        url: '/login',
        icon: 'log-in'
      }
    ];

    if (this.userInfo) {
      // thêm menu phòng ý tưởng
      this.treeMenu.push({
        id: 3,
        name: 'Phòng ý tưởng',
        size: '1.1em',
        type: 'route',
        url: '/idea',
        icon: 'md-alarm'
      })
    }

  }

  /**
   * Bấm gọi trang login
   */
  onClickLogin() {
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

}
