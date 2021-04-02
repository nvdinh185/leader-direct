import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  homeForm: any = {
    title: 'Văn phòng sáng tạo',
    card: {
      image: 'assets/imgs/background-idea.jpg',
      title: 'Văn phòng sáng tạo cho mọi người',
      subtitle: 'INOVATION',
      content: `Chương trình hỗ trợ sáng tạo và quản lý ý tưởng.`
    }
    ,
    list: {
      title: 'Tài liệu:',
      items: [
        {
          url: 'assets/docs/ManualGuide_v1.1.pdf',
          title: 'Hướng dẫn sử dụng chương trình',
          icon: { slot: 'start', color: 'medium', name: 'book' }
        }
      ]
    }
  }
  userInfo: any;
  constructor(
    private router: Router
    , private mainService: MainService
  ) { }

  // Đợi 1s để xác nhận đăng nhập (nếu có)
  // để lấy userInfo
  ngOnInit() {
    setTimeout(() => {
      this.userInfo = this.mainService.getUserInfo();
    }, 1000)
  }

  // gọi đến trang login
  onClickLogin() {
    this.router.navigate(['/login']);
  }

}
