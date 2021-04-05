import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() { }

}
