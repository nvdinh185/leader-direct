import { Component, OnInit } from '@angular/core';
import { AuthService, CommonsService, PopoverCardComponent } from 'ngxi4-dynamic-service';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

// các tùy chọn sắp xếp ý tưởng
const orderList = {
  ORDER_CREATED: 'ORDER_CREATED'   // được tạo ra gần đây nhất
  , ORDER_LIKES: 'ORDER_LIKES'       // được yêu thích nhất
  , ORDER_COMMENTS: 'ORDER_COMMENTS' // được nhiều người bình luận nhất
  , ORDER_MARKS: 'ORDER_MARKS'       // được chấm điểm cao nhất của mọi người
}

// các tùy chọn tìm kiếm ý tưởng
const searchOptions = {
  SEARCH_BY_TITLE: 'SEARCH_BY_TITLE'
  , SEARCH_BY_ID: 'SEARCH_BY_ID'
}

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {

  formIdea: any = {
    title: 'Phòng ý tưởng',
    ideas: []
  }

  // tham số để chọn tùy chọn nhập mới ý tưởng
  parameters: any;

  dynamicFormInput: string;
  dynamicFormValue: string;

  isCardNewShow: boolean = false;

  userInfo: any;
  orderBy: string = orderList.ORDER_CREATED;
  filterCategorySelected: any = [];
  filterStatusSelected: any = [0, 1, 2, 3, 4, 5];

  categoryOptions: any = [];
  statusOptions: any = [];

  pageSize: number = 3;
  currentPage: number = 0;

  isSearch: boolean = false;
  searchString: string;
  searchHint: string = 'Tìm theo chủ đề...';

  searchOption: string = searchOptions.SEARCH_BY_TITLE;

  myIdeaFilterList: any = [];

  constructor(
    private router: Router
    , private apiAuth: AuthService
    , private apiCommons: CommonsService
    , private mainService: MainService
  ) { this.init() }

  ngOnInit() {
    this.refresh();
  }

  async init() {
    // lấy thông tin user đang login có chưa?
    this.userInfo = this.mainService.getUserInfo();

    try {
      this.parameters = await this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
    } catch (err) {
      console.log(err);
    }

    this.categoryOptions = this.parameters && this.parameters.ideas_categories ? this.parameters.ideas_categories : [];

    this.statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];

    //form nhập thông tin ý tưởng mới
    this.dynamicFormInput = JSON.stringify({
      okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/create-idea', type: "FORM-DATA", token: true }
      ,
      cancelButton: { icon: "close", next: "CLOSE" }
      ,
      items: [
        // Danh sách các trường nhập liệu
        { type: "text", key: "title", name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 1-200 ký tự (letters)", input_type: "text", icon: "help", validators: [{ required: true, min: 1, max: 200 }] }
        , { type: "text_area", key: "description", hint: "Mô tả nội dung ý tưởng của bạn từ 1 đến 1000 từ (words)", name: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "information-circle", validators: [{ required: true, min: 1 }] }
        , { type: "select-origin", key: "category_id", name: "Phân loại ý tưởng?", icon: "contrast", options: this.categoryOptions }
        , { type: "select-origin", key: "status", name: "Trạng thái của ý tưởng?", icon: "clock", options: this.statusOptions }
        , {
          type: "upload-files", name: "Files đính kèm"
          , multiple: "multiple"
          , accept: `image/gif, image/jpeg, image/png
                                        , application/pdf
                                        , .txt, .md, .zip, .tar
                                        , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                                        , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`}
      ]
    })

    // giá trị mặc định
    this.dynamicFormValue = JSON.stringify({
      title: '',
      description: '',
      category_id: '' + (this.categoryOptions.find(x => x.is_default === 1) ? this.categoryOptions.find(x => x.is_default === 1).id : 2),
      status: '' + (this.statusOptions.find(x => x.is_default === 1) ? this.statusOptions.find(x => x.is_default === 1).id : 2)
    })

  }

  // hàm gọi lại khi bắt đầu tải, thay đổi bộ lọc, sắp xếp, hoặc làm mới trang
  async refresh(isReset?: boolean, nextPage?: number, direction?: string) {
    if (isReset) this.currentPage = 0;

    // lấy danh sách ý tưởng từ csdl mới nhất
    let countIdeaReturn = 0;
    try {
      if (isReset) this.apiCommons.showLoader('Đang load dữ liệu');
      let ideas = await this.apiAuth.getDynamicUrl(
        this.apiAuth.serviceUrls.RESOURCE_SERVER
        + '/get-ideas?order_by=' + this.orderBy
        + '&filter_category=' + this.filterCategorySelected.toString()
        + '&filter_status=' + this.filterStatusSelected.toString()
        + '&page_size=' + this.pageSize
        + '&page=' + (nextPage ? nextPage : 0)
        , true);
      // console.log(ideas);
      // reset mảng khi thêm mới dữ liệu, thay đổi bộ lọc, sắp xếp
      if (isReset) this.formIdea.ideas = [];

      if (Array.isArray(ideas)) {
        countIdeaReturn = ideas.length;
        if (direction === 'UP') {
          for (let idx = countIdeaReturn - 1; idx >= 0; idx--) {
            let el = ideas[idx]
            if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
            if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
            let findIndex = this.formIdea.ideas.findIndex(x => x.id === el.id);
            if (findIndex < 0) this.formIdea.ideas.unshift(el);
            else this.formIdea.ideas.splice(findIndex, 1, el);
          }
        } else {
          for (let el of ideas) {
            if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
            if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
            let findIndex = this.formIdea.ideas.findIndex(x => x.id === el.id);
            if (findIndex < 0) this.formIdea.ideas.push(el);
            else this.formIdea.ideas.splice(findIndex, 1, el);
          }
        }

      }

      this.myIdeaFilterList = this.formIdea.ideas; // gán dữ liệu lấy về để hiển thị ra
      // console.log(this.myIdeaFilterList);

      if (countIdeaReturn === 0 && this.currentPage === 0) {
        this.apiCommons.showToast('Không tìm thấy ý tưởng nào', 3000, 'danger');
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (isReset) this.apiCommons.hideLoader()
      return countIdeaReturn;
    }
  }

  // lọc theo lĩnh vực
  onClickFilterCategory() {
    let settingsMenu = [];
    this.categoryOptions.forEach(el => {
      settingsMenu.push({
        id: el.id
        , name: el.name
        , isChecked: this.filterCategorySelected.includes(el.id)//Nếu có id trong mảng thì true
        , value: el.id
      })
    })
    this.apiCommons.presentPopover(undefined, PopoverCardComponent, {
      type: 'multi-choice',
      title: "LỌC THEO LĨNH VỰC",
      color: "tertiary",
      menu: settingsMenu
    })
      .then(data => {
        this.processCategoryFilters(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // lọc theo trạng thái
  onClickFilterStatus() {
    let settingsMenu = [];
    this.statusOptions.forEach(el => {
      settingsMenu.push({
        id: el.id
        , name: el.name
        , isChecked: this.filterStatusSelected.includes(el.id)//Nếu có id trong mảng thì true
        , value: el.id
      })
    })
    this.apiCommons.presentPopover(undefined, PopoverCardComponent, {
      type: 'multi-choice',
      title: "LỌC THEO TRẠNG THÁI",
      color: "danger",
      menu: settingsMenu
    })
      .then(data => {
        this.processStatusFilters(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // hiện thị các tùy chọn sắp xếp
  onClickOrder() {
    // console.log(this.orderBy, orderList[this.orderBy]);

    let settingsMenu = [
      {
        id: 1
        , name: "Tạo gần đây nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_CREATED
        , value: orderList.ORDER_CREATED
      }
      ,
      {
        id: 2
        , name: "Nhiều người thích nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_LIKES
        , value: orderList.ORDER_LIKES
      }
      ,
      {
        id: 3
        , name: "Nhiều người bình luận nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_COMMENTS
        , value: orderList.ORDER_COMMENTS
      }
      ,
      {
        id: 4
        , name: "Được chấm điểm cao nhất"
        , isChecked: orderList[this.orderBy] === orderList.ORDER_MARKS
        , value: orderList.ORDER_MARKS
      }
    ]

    this.apiCommons.presentPopover(undefined, PopoverCardComponent, {
      type: 'single-choice',
      title: "SẮP XẾP",
      color: "success",
      menu: settingsMenu
    })
      .then(data => {
        this.processOrderBys(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // xử lý lọc theo lĩnh vực
  processCategoryFilters(data: any) {
    // lọc lấy bộ lọc để lấy dữ liệu, nếu bộ lọc đó không lọc thì xem như lấy hết
    this.filterCategorySelected = [];
    data.forEach(el => {
      this.filterCategorySelected.push(el.value);
    });
    this.refresh(true)
  }

  // hàm xử lý lọc theo trạng thái
  processStatusFilters(data: any) {
    this.filterStatusSelected = [];
    data.forEach(el => {
      this.filterStatusSelected.push(el.value);
    });
    this.refresh(true)
  }

  // hàm xử lý cho sắp xếp
  processOrderBys(data: any) {
    this.orderBy = data.value;
    this.refresh(true)
  }

  // hàm trả kết quả của form nhập mới ý tưởng
  onSelectedFinish(evt) {
    this.isCardNewShow = false;
    // console.log('ghi xong du lieu', evt);
    if (evt) this.refresh(true); // làm mới ý tưởng mới
  }

  // thêm mới ý tưởng
  onClickAddNew() {
    this.isCardNewShow = true;
  }

  // Hàm thực hiện khi kéo xuống hoặc refresh trang
  doRefresh(evt, direction) {
    if (this.isSearch || this.isCardNewShow) {
      evt.target.complete();
      return
    }
    if (direction === 'UP') {
      // đọc dữ liệu mới nhất 
      this.refresh(false, 0, direction)
        .then(data => {
          evt.target.complete();
        })
    }

    if (direction === 'DOWN') {
      // lấy trang tiếp theo
      this.refresh(false, ++this.currentPage)
        .then(count => {
          evt.target.complete();
          if (count < this.pageSize) {
            this.apiCommons.showToast('Hết ý tưởng rồi', 1000, 'success', 'bottom')
          }
        })
    }

  }

  // khi bấm ở card ý tưởng thì có mấy tình huống sinh ra bằng command
  onClickIdeaCard(evt) {
    // console.log(evt);
    if (evt) {
      if (evt.command === 'VIEW') {
        this.viewIdea(evt.idea);
      }
      if (evt.command === 'LIKE') {
        this.likeIdea(evt.idea);
      }
      if (evt.command === 'COMMENT') {
        this.commentIdea(evt.idea);
      }

    }
  }

  // chuyển sang trang chi tiết để hiển thị chi tiết ý tưởng đó
  viewIdea(item) {
    this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });
  }

  // Người dùng bấm nút like
  likeIdea(item) {
    this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
      .then(data => {
        // console.log(data);
        let el = data.idea;
        if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id)) el.isUserVoted = true;
        if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id)) el.isUserCommented = true;
        let index = this.formIdea.ideas.findIndex(x => x.id === el.id)
        this.formIdea.ideas.splice(index, 1, el)
        //tự động thay đổi trong this.myIdeaFilterList để hiển thị
      })
      .catch(err => console.log(err))
  }

  // người dùng bấm nút comment
  commentIdea(item) {
    this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });
  }

  // tùy chọn để tìm kiếm
  onClickSearchOption() {
    let settingsMenu = [
      {
        id: 1
        , name: "Tìm theo chủ đề"
        , isChecked: searchOptions[this.searchOption] === searchOptions.SEARCH_BY_TITLE
        , value: searchOptions.SEARCH_BY_TITLE
      }
      ,
      {
        id: 2
        , name: "Tìm theo mã ý tưởng"
        , isChecked: searchOptions[this.searchOption] === searchOptions.SEARCH_BY_ID
        , value: searchOptions.SEARCH_BY_ID
      }
    ]

    this.apiCommons.presentPopover(undefined, PopoverCardComponent, {
      type: 'single-choice',
      title: "TÙY CHỌN TÌM KIẾM",
      color: "warning",
      menu: settingsMenu
    })
      .then(data => {
        this.processSearchOptions(data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }

  // bộ lọc tìm kiếm
  processSearchOptions(data: any) {
    this.searchOption = data.value;
    if (this.searchOption === searchOptions.SEARCH_BY_TITLE)
      this.searchHint = 'Gõ từ có trong các chủ đề bên dưới';
    if (this.searchOption === searchOptions.SEARCH_BY_ID)
      this.searchHint = 'Gõ mã ý tưởng để tìm';
  }

  // hiển thị ô tìm kiếm 
  goSearch() {
    this.isSearch = true;
  }

  searchEnter() {
    this.isSearch = false;
    this.searchString = "";
  }

  // tìm kiếm theo title hoặc theo id
  onUserEnterSearch(evt) {
    const searchTxt = evt.detail.value;
    if (searchTxt.length > 0) {
      if (this.searchOption === searchOptions.SEARCH_BY_TITLE) {
        this.myIdeaFilterList = this.formIdea.ideas.filter(
          x => x.title.toLowerCase().indexOf(searchTxt.toLowerCase()) >= 0);
      } else if (this.searchOption === searchOptions.SEARCH_BY_ID) {
        this.myIdeaFilterList = this.formIdea.ideas.filter(
          x => ("" + x.id).indexOf(searchTxt) >= 0);
      }
    } else {
      this.myIdeaFilterList = this.formIdea.ideas
    }
  }
}
