const apiUrl = "https://2023-engineer-camp.zeabur.app/api/v1/works";

Vue.createApp({
  data() {
    return {
      /* 漢堡選單 */
      hamMenu: false,
      /* 篩選單切換 */
      categoryCard: false,
      /* 篩選TAG */
      categoryTag: [
        { name: "全部", active: true },
        { name: "問答服務", active: false },
        { name: "虛擬客服", active: false },
        { name: "生活應用", active: false },
        { name: "程式知識", active: false },
        { name: "翻譯助手", active: false },
        { name: "行銷文案", active: false },
      ],
      /* 分頁 */
      current: 1,
      total: 1,
      pageSize: 4,
      has_pre: false,
      has_next: true,
      /*常見問題  */
      qAs: [
        {
          question: "如何選擇適合的 AI 模型？",
          answer:
            "選擇適合的 AI 模型需要考慮您的應用場景、需要解決的問題、可用的資源以及預算等因素。可以通過對比不同模型的性能、準確率、速度等指標，以及與其他用戶的評價與反饋，來選擇最適合的模型。",
          active: false,
        },
        {
          question: "租用模型的費用是如何計算的？",
          answer:
            "租用模型的費用通常會根據模型的性能和使用時間等因素進行計算。具體而言，模型的性能可以根據其精度、速度、暫用資源等指標來評估；而使用時間可以根據租用時間的長短來計算，通常會按小時、天或月來計算。綜合考慮這些因素，系統會自動算出對應的租用費用。",
          active: false,
        },
        {
          question: "如何進行付款？",
          answer:
            "付款方式可以通過網站上提供的宴上支付平台進行支付。具體而言，您可以選擇信用卡、銀行轉帳電子錢包等不同的支付方式進行支付。在支付前，您需要先登錄網站並選擇適合的租用方案，系統會自動計算出對應的租用欸用和支付金額，然後您可以選擇適合的支付方式進行支付。完成支付後，系統會自動向您提供相應的服務。",
          active: false,
        },
        {
          question: "租用模型的期限是多久？",
          answer:
            "租用模型的期限可以根據您的需求進行設置，通常可以選擇幾個小時、幾天或幾個月等不同的時間段。",
          active: false,
        },
        {
          question: "如果在使用的過程中遇到問題，應該怎麼處理？",
          answer:
            "如果在使用過程中遇到問題，您可以聯繫惡扶或技術支持人員進行諮詢或報告問題。您也可以。您也可以通過網站上的幫助中心或社區論壇尋找相關的解決方案和回答。",
          active: false,
        },
      ],
      /* API資料 */
      products: [],
      productsRender: [],
      productsPage: [],
      /* 篩選表單 */
      tagIdArray:[],
      tagBtnName: "all",
      tagBtnType:"all",
      tagBtnTypeList: [
        { name: "問答服務" },
        { name: "虛擬客服" },
        { name: "生活應用" },
        { name: "程式知識" },
        { name: "翻譯助手" },
        { name: "行銷文案" },
      ],
      tagBtnNum: 0,
      type:'',
      /* 關鍵字搜尋 */
      searchWord: "",
      /* 排序 */
      sortOrder: "由新到舊",
      sort:0,
    };
  },
  watch: {
    tagBtnNum(){
      console.log(this.tagBtnNum);
    },
    tagBtnName() {
      this.calculateTagBtnNum();
      console.log(this.tagBtnName);

    },
    tagBtnType() {
      this.calculateTagBtnNum();
      console.log(this.tagBtnType);
    },
    /* 排序監測 */
    sortOrder() {
      // 根據時間排序
      if (this.sortOrder === "由新到舊") {
        this.sort = 0
        this.apiRefresh()
      } else if (this.sortOrder === "由舊到新") {
        this.sort = 1
        this.apiRefresh()
      } else {
        // 默認情控下返回原本的
        return this.productsRender.reverse();
      }
    },
  },
  computed: {
    startPage() {
      //當前頁碼減去每頁顯示數量的一半，但不低於 1
      return Math.max(1, this.current - Math.floor(this.pageSize / 2));
    },
    endPage() {
      //起始頁碼加上每頁顯示數量減去 1，但不超過總頁數
      return Math.min(this.total, this.startPage + this.pageSize - 1);
    },
    visiblePages() {
      //計算可見的分頁範圍，起始頁數跟最終頁數
      let pages = [];
      /* 如果當渲染資料為空的時候，直接回傳空陣列，隱藏分頁 */
      if (this.productsRender.length === 0) {
        return pages;
      } else {
        //pages 會回傳陣列 [ 起始頁數，中間的數字，最終頁數]
        for (let i = this.startPage; i <= this.endPage; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
  },
  methods: {
    /* 漢堡選單 */
    hamMenuSwitch() {
      this.hamMenu = !this.hamMenu;
    },
    /* 篩選頁切換 */
    categoryCardOpen() {
      this.categoryCard = !this.categoryCard;
    },
    /* 篩選TAG */
    categoryTagSwitch(index) {
      /* 觸發篩選按鈕是否點擊， 處理陣列資料，尋找對應的index 的 資料 */
      this.categoryTag.forEach((tag, i) => {
        /* 如果是該筆資料，就會轉換成true */
        if (i === index) {
          tag.active = true;
        } else {
          /* 其餘不對的資料，改成false */
          tag.active = false;
        }
      });

      /* 篩選API資料 */
      /* 取得篩選標籤名 */
      let tagName = this.categoryTag[index].name;
      this.type = tagName
      if (tagName === "全部") {
        this.type = ""
        /* 把原始全部資料重新賦予給主要渲染資料 */
        this.apiRefresh()
        return;
      } else {
        /* 篩選資料 */
        this.apiRefresh()
      }
    },
    /* 常見問體切換 */
    qASwitch(index) {
      this.qAs.forEach((item, key) => {
        if (key === index) {
          item.active = !item.active;
          return;
        }
      });
    },
    backToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    /* API */
    getApi() {
      axios.get(`${apiUrl}`)
        .then((res) => {
          /* 產品 */
          this.products = res.data.ai_works;
          /* 主要渲染 */
          this.productsRender = res.data.ai_works.data;
    
          /* 分頁 */
          this.total = res.data.ai_works.page.total_pages;
          this.has_pre = res.data.ai_works.page.has_pre;
          this.has_next = res.data.ai_works.page.has_next;
          this.current = res.data.ai_works.page.current_page;

          this.tagIdArray=[]
          res.data.ai_works.data.forEach((item) => {
            this.tagIdArray.push(item.discordId);
          });
        })
        .catch((err) => {
            alert(err.response.message)
        });
    },
    setCurrentPage(page) {
      this.current = page;
      this.getApiPage(page);
    },
    /* 上下頁 */
    prevPage(CurrentPage) {
      this.current = Math.max(1, this.current - 1);
      this.getApiPage(CurrentPage);
    },
    nextPage(CurrentPage) {
      this.current = Math.min(this.total, this.current + 1);
      this.getApiPage(CurrentPage);
    },
    getApiPage(CurrentPage=1) {
      axios.get(`${apiUrl}?page=${CurrentPage}&search=${this.searchWord}&sort=${this.sort}&type=${this.type}`)
        .then((res) => {
          /* 主要渲染 */
          this.productsRender = res.data.ai_works.data;
          /* 分頁 */
          this.total = res.data.ai_works.page.total_pages;
          this.has_pre = res.data.ai_works.page.has_pre
          this.has_next = res.data.ai_works.page .has_next
          this.total=res.data.ai_works.page.total_pages

          this.tagIdArray=[]
          res.data.ai_works.data.forEach((item) => {
            this.tagIdArray.push(item.discordId);
          });
        });
    },
    toggleTagBtnName_AllOption(tagValue) {
      /* 判斷是否為空陣列，則添加ALL */
      if (this.tagBtnName === "all") {
        this.apiRefresh()
      } else {

      /* 渲染用 */
      let obj = []
      axios.get(`${apiUrl}?page=${this.current}&search=${this.searchWord}&sort=${this.sort}&type=${this.type}`)
      .then((res) => {
        obj = res.data.ai_works.data

        /* 篩選符合ID的項目 */
        this.productsRender = obj.filter((item) => {
          return (
            (this.tagBtnName === "all" ||
              this.tagBtnName === item.discordId)
            &&
            (this.tagBtnType === "" ||
              this.tagBtnType === item.type)
          );
        });
      });
      }
    },
    toggleTagBtnType() {
      if (this.tagBtnType === 'all') {
        this.type = ""
        this.apiRefresh()
      }else {
        this.type = this.tagBtnType
        this.apiRefresh()
      }
      
    },
    searchWordFilter() {
      /* 將資料賦予給obj 已取得完整資料 */
      let obj = this.products.data;
      /* 如果輸入欄為空 */
      if (this.searchWord === "") {
        this.productsRender = obj;
      } else {
        this.apiRefresh()
      }
    },
    apiRefresh () {
      axios.get(`${apiUrl}?page=${this.current}&search=${this.searchWord}&sort=${this.sort}&type=${this.type}`)
      .then((res) => {
        /* 主要渲染 */
        this.productsRender = res.data.ai_works.data;
        this.total=res.data.ai_works.page.total_pages

        this.tagIdArray=[]
        res.data.ai_works.data.forEach((item) => {
          this.tagIdArray.push(item.discordId);
        });
      });
    },
    calculateTagBtnNum() {
      this.tagBtnNum = 2;
      if (this.tagBtnName === "all" && this.tagBtnType === "all") {
        this.tagBtnNum = 0;
      }
      else if (this.tagBtnName === "all" || this.tagBtnType === "all") {
        this.tagBtnNum = 1;
      }
    
      console.log('這個', this.tagBtnNum);
    },    
    init() {
      this.getApi();
    },
  },
  mounted() {
    this.init();

    var swiper = new Swiper(".home_partner_card", {
      slidesPerView: 1, // 一次显示两个幻灯片
      spaceBetween: 24, // 幻灯片之间的间隔
      pagination: {
        el: ".swiper-pagination", // 分页器的容器选择器
        clickable: true, // 允许点击分页器切换幻灯片
      },
      breakpoints: {
        // 大於等於 768px
        993: {
          slidesPerView: 3,
        },
      },
    });
    var brand1Swiper = new Swiper(".home_partner_brand_1", {
      slidesPerView: 3,
      spaceBetween: 20,
      freeMode: true,
      breakpoints: {
        // 大於等於 768px

        768: {
          slidesPerView: 6,
        }
      },
    });
    var brand2Swiper = new Swiper(".home_partner_brand_2", {
      slidesPerView: 2,
      spaceBetween: 20,
      freeMode: true,
      breakpoints: {
        // 大於等於 768px
        768: {
          slidesPerView: 7,
        }
      },
    });
  },
}).mount("#app");
