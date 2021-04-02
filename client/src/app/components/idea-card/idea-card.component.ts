import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss'],
})
export class IdeaCardComponent implements OnInit {

  //các biến dữ liệu đầu vào
  @Input() cardData: any; // Dữ liệu đầu vào

  @Input() callback: any; // Hàm gọi callback nếu có

  // Sự kiện sinh ra khi các tác động lên các nút lệnh ở card này
  @Output() onClickSub = new EventEmitter();

  demoCard: any = {
    background: "#ffffff", // màu nền của card 
    // nếu truyền vào là image thì ưu tiên lấy image làm nền nhé
    // image:"/assets/imgs/icon.png",
    color: "black", // màu chữ sẽ tương phản với màu nền
    //- tùy thuộc vào nền mà chữ sẽ lấy theo các tông màu khác nhau
    //, tùy vào bộ màu đưa vào mà chọn hợp lý
    title: 'Nhân sự',
    items: [
      {
        icon: 'wifi',
        title: '12 Nhân sự',
        color: 'light' // màu trong theme
      }
      ,
      {
        icon: 'wifi',
        title: '1 psc',
        color: 'light'
      }
      ,
      {
        icon: 'wifi',
        title: '7 C',
        color: 'light'
      }
      ,
      {
        icon: 'wifi',
        title: '6 s',
        color: 'light'
      }
    ]
    ,
    button: {
      color: 'secondary',
      icon: {
        name: 'book',
        color: 'light'
      }
    }
  }

  commandCardForm: any; // form biến đổi để có màu nền hợp lý

  constructor() { }

  ngOnInit() {
    this.commandCardForm = this.cardData ? this.cardData : this.demoCard;
    // console.log('form',this.commandCardForm);
    this.commandCardForm.background = this.commandCardForm.background ? this.commandCardForm.background : 'red';
  }

  /**
   * Lệnh khi click vào lệnh chính, và các lệnh con
   * @param item 
   */
  onClickView(item) {
    //   if (this.callback) this.callback(item);
    this.onClickSub.emit({
      idea: item,
      command: 'VIEW'
    });
  }

  onClickLike(item) {
    //   if (this.callback) this.callback(item);
    this.onClickSub.emit({
      idea: item,
      command: 'LIKE'
    });
  }

  onClickComment(item) {
    //   if (this.callback) this.callback(item);
    this.onClickSub.emit({
      idea: item,
      command: 'COMMENT'
    });
  }

}
