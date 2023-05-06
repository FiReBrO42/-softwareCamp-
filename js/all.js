const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'firebro42';

Vue.createApp({
    data() {
      return {
        categoryCard:false,
        categoryTag:[
            {name: '全部', active: true},
            {name: '聊天', active: false},
            {name: '影像辨識', active: false},
            {name: '翻譯', active: false},
            {name: '行銷', active: false},
            {name: '客服', active: false},
            {name: '生產力', active: false},        ]
      }
    },
    methods: {
        categoryCardOpen () {
            this.categoryCard = !this.categoryCard
            console.log(this.categoryCard)
        },
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
        }
    },
    mounted() {
        
    },
  })

  .mount('#app')