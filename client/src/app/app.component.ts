import { Component } from '@angular/core';
import { AuthService } from 'ngxi4-dynamic-service';
import { environment } from './../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  //cây này sẽ nhúng vào component tree-menu để hiển thị menu
  treeMenu: any = [];

  constructor(
    private apiAuth: AuthService,
  ) { this.init() }

  /**
   * Khởi tạo các biến đầu tiên
   */
  async init() {
    this.apiAuth.serviceUrls.AUTH_SERVER = environment.AUTH_SERVER;
    this.apiAuth.serviceUrls.RESOURCE_SERVER = environment.RESOURCE_SERVER;

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
        name: 'Phòng ý tưởng',
        size: '1.1em',
        type: 'route',
        url: '/idea',
        icon: 'md-alarm'
      }
    ];

  }

}
