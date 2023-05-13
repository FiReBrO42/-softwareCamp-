const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'firebro42';

Vue.createApp({
    data() {
      return {
        /* 漢堡選單 */
        hamMenu:false,
        /* 篩選單切換 */
        categoryCard:false,
        /* 篩選TAG */
        categoryTag:[
            {name: '全部', active: true},
            {name: '聊天', active: false},
            {name: '影像辨識', active: false},
            {name: '翻譯', active: false},
            {name: '行銷', active: false},
            {name: '客服', active: false},
            {name: '生產力', active: false},        ],
        /* 產品卡 */
        productCard: [
            {
                page:'1',
                title:'Chatbot Builder',
                content:'建立智能化的聊天機器人，解答常見問題、提供客戶支援、收集反饋等。',
                name:'卡卡',
                style:'AI 模型',
                tag:'#聊天',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655720837928-38b1a93298ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=555&q=80'
            },
            {
                page:'1',
                title:'Image Recognition Platform',
                content:'專業的圖像識別平台，識別圖像、分類、標記等。',
                name:'杰杰',
                style:'AI 模型',
                tag:'#影像辨識',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655720840699-67e72c0909d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80'
            },
            {
                page:'1',
                title:'Language Translation API',
                content:'專業的語言翻譯 API，實現文本翻譯功能，支援多種格式的文本。',
                name:'琪琪',
                style:'AI 模型',
                tag:'#翻譯',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
            },
            {
                page:'1',
                title:'Sentiment Analysis API',
                content:'自動識別文本中的情感傾向，包括正向、負向和中性等。適用於情感分析、社交媒體監控、市場調查等。',
                name:'昊昊',
                style:'AI 模型',
                tag:'#行銷',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
            },
            {
                page:'1',
                title:'Fraud Detection Platform',
                content:'預防詐騙活動，適用於銀行、金融、電商等。',
                name:'卡卡',
                style:'AI 模型',
                tag:'#客服',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
            },
            {
                page:'1',
                title:'Voice Assistant SDK',
                content:'通過語音控制應用程式、設備，實現多種功能，例如播放音樂、查詢天氣、發送信息等。',
                name:'杰杰',
                style:'AI 模型',
                tag:'#生產力',
                href:'',
                imgUrl:'https://images.unsplash.com/photo-1655721529468-d0d81b2dc489?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
            }
        ],
        /* 分頁 */
        current: 1,
        total: 10,
        pageSize: 5,
        /*常見問題  */
        qAs:[
            {
                question:'如何選擇適合的 AI 模型？',
                answer:'選擇適合的 AI 模型需要考慮您的應用場景、需要解決的問題、可用的資源以及預算等因素。可以通過對比不同模型的性能、準確率、速度等指標，以及與其他用戶的評價與反饋，來選擇最適合的模型。',
                active:false,
            },
            {
                question:'租用模型的費用是如何計算的？',
                answer:'租用模型的費用通常會根據模型的性能和使用時間等因素進行計算。具體而言，模型的性能可以根據其精度、速度、暫用資源等指標來評估；而使用時間可以根據租用時間的長短來計算，通常會按小時、天或月來計算。綜合考慮這些因素，系統會自動算出對應的租用費用。',
                active:false,
            },
            {
                question:'如何進行付款？',
                answer:'付款方式可以通過網站上提供的宴上支付平台進行支付。具體而言，您可以選擇信用卡、銀行轉帳電子錢包等不同的支付方式進行支付。在支付前，您需要先登錄網站並選擇適合的租用方案，系統會自動計算出對應的租用欸用和支付金額，然後您可以選擇適合的支付方式進行支付。完成支付後，系統會自動向您提供相應的服務。',
                active:false,
            },
            {
                question:'租用模型的期限是多久？',
                answer:'租用模型的期限可以根據您的需求進行設置，通常可以選擇幾個小時、幾天或幾個月等不同的時間段。',
                active:false,
            },
            {
                question:'如果在使用的過程中遇到問題，應該怎麼處理？',
                answer:'如果在使用過程中遇到問題，您可以聯繫惡扶或技術支持人員進行諮詢或報告問題。您也可以。您也可以通過網站上的幫助中心或社區論壇尋找相關的解決方案和回答。',
                active:false,
            }
        ]
      }
    },
    computed: {
        startPage() {
            //當前頁碼減去每頁顯示數量的一半，但不低於 1
          return Math.max(1, this.current - Math.floor(this.pageSize / 2))
        },
        endPage() {
            //起始頁碼加上每頁顯示數量減去 1，但不超過總頁數
          return Math.min(this.total, this.startPage + this.pageSize - 1)
        },
        visiblePages() {
            //計算可見的分頁範圍，起始頁數跟最終頁數  
          let pages = []
            //pages 會回傳陣列 [ 起始頁數，中間的數字，最終頁數]
          for (let i = this.startPage; i <= this.endPage; i++) {
            pages.push(i)
          }
          return pages
        }
      },
    methods: {
        /* 漢堡選單 */
        hamMenuSwitch () {
            this.hamMenu = !this.hamMenu
        },
        /* 篩選頁切換 */
        categoryCardOpen () {
            this.categoryCard = !this.categoryCard
            console.log(this.categoryCard)
        },
        /* 篩選TAG */
        categoryTagSwitch (index) {
            /* 處理陣列資料，尋找對應的index 的 資料 */
            this.categoryTag.forEach((tag, i) => {
                /* 如果是該筆資料，就會轉換成true */
                if (i === index) {
                    tag.active = true
                } else {
                    /* 其餘不對的資料，改成false */
                    tag.active = false
                }
            })
        },
        prevPage() {
            this.current = Math.max(1, this.current - 1)
        },
        nextPage() {
            this.current = Math.min(this.total, this.current + 1)
        },
        /* 常見問體切換 */
        qASwitch (index) {
            console.log(`${index}`)
            this.qAs.forEach((item,key) => {
                if( key === index){
                    item.active = !item.active
                    return
                }
            })
        }
    },
    mounted() {
        
    },
  })

  .mount('#app')