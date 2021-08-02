###### tags: `六角學院` `Vue 3 新手夏令營`

# :tent: Vue 3 Options API

[![week3](https://i.imgur.com/s0FUJXG.png)](https://johnsonmao.github.io/summer-camp-vue3/week3/)
*第三週作業展示，運用了 Vue computed 與完整的 CRUD 功能，點擊圖片可察看成果*
## Vue 常用指令

### v-model 修飾符

```javascript
Vue.createApp({
  data() {
    return {
      // ...
    }
  },
  methods:{
	  // 是由一堆 function 組成的物件
	},
  mounted() {
    // ...
  }
}).mount('#yourId');
```

:::danger
:warning: 要記得加 `mount()` 才會掛載在畫面上！
:::

:::warning
生命週期函數在發生後就會被釋放
:::

## 雙向綁定

![](https://i.imgur.com/ogKK8jt.png)

:::success
- 只讀出渲染
:::
:::danger
- 可讀可寫
:::
:::info
- 利用事件觸發調整 data，再利用渲染方法渲染到畫面上
:::

---

## 指令常見三大情境

- 透過指令，觸發特定事件
  - `@click="functionName()"`
- 透過其他 Option API，觸發特定事件
  - `this.functionName()`
- 作為畫面上的資料運算 (俗稱 filter)
  - 新版的 Vue 沒有 `filter`

### methods

```htmlembedded
<!-- html -->
{{toCurrency(cash)}}
```

```javascript
// js
Vue.createApp({
  data() {
   // ...
  },
  methods: {
    toCurrency(num) {
    // 如何加入千分位
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=\d{3})+(?!\d))/g, ',');
      return `$${parts.join('.')}`;
    }
  }
})
```

### computed

- 不修改原始數值的情況產生新值

```javascript
// js
Vue.createApp({
  data() {
   // ...
  },
  computed: {
    doubleNum() {
      return this.num * 2;
    },
    filterData() {
      const newData = this.data.filter(item => {
        // data 所選擇的性別 & ajax 所取得的資料性別
        return item.gender === this.genderFilter;
      })
      if(!this.genderFilter) return this.data;
      return newData;
    }
  }
})
```

---

## CRUD

```javascript
Vue.createApp({
  data() {
   // ...
  },
  methods: {
    // #1 如何新增資料
    addItem() {},
    // #2 如何移除資料
    removeItem(item) {
      // 1 陣列索引
      // 2 id
      const index = this.data.filter(obj => obj.id === item.id);
    },
    // #3 如何編輯資料
    
    // #4 如何避免雙向綁定
  }
})
```



---
## 卡斯伯補充直播程式碼


#### Methods 運用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  <!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
  <div id="app" class="container">
    <div class="row">
      <div class="col-3 mb-3" v-for="item in data" :key="item.cell">
        <div class="card">
          <img :src="item.picture.large" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ item.email }}</h5>
            <p class="card-text">
              <!-- #3 把 age * 100 當作金額吧（套用 toCurrency 的方法） -->
              {{ toCurrency(item.dob.age * 100) }}
              <!-- {{ cash }} -->
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>

    <hr>
    dollarSign: {{ num }}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.global.min.js"></script>
  <script>
    // 當我們在 Vue 的
    const app = Vue.createApp({
      data() {
        // 資料集
        return {
          text: '我是卡斯伯',
          num: 10000.01,
          person: {
            name: '小明',
            image: 'https://images.unsplash.com/photo-1593052393678-d1c690c76071?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            cash: 1000,
            gender: 'male'
          },
          data: []
        };
      },
      methods: {
        getRandomUser() {
          axios.get('https://randomuser.me/api/?results=10')
            .then((res) => {
              // #2 如何把資料加入至 data 內
              console.log(res);
              this.data = res.data.results
            })
        },
        // #3 如何加入千分號
        toCurrency(num) {
          const parts = num.toString().split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return `$${parts.join('.')}`;
        }
      },
      mounted() {
        // #1 觸發取得遠端資料
        this.getRandomUser()
      }
    });
    app.mount('#app');

  </script>
</body>
</html>
```

#### Computed

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
  <div id="app" class="container">
    <button type="button" @click="addNum">累加數值 {{ num }}</button>
    computed: {{ doubleNum }}
    <hr>
    
    <select class="form-select mb-3" v-model="genderFilter">
      <option selected value="">請選擇</option>
      <option value="male">男生</option>
      <option value="female">女生</option>
    </select>
    <div class="row">
      <div class="col-3 mb-3" v-for="item in filterData" :key="item.cell">
        <div class="card">
          <img :src="item.picture.large" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ item.email }}</h5>
            <p class="card-text">
              <!-- #3 把 age * 100 當作金額吧（套用 toCurrency 的方法） -->
              {{ item.dob.age * 100 }}
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <script>
    // 當我們在 Vue 的
    const app = Vue.createApp({
      data() {
        // 資料集
        return {
          text: '我是卡斯伯',
          num: 1,
          person: {
            name: '小明',
            image: 'https://images.unsplash.com/photo-1593052393678-d1c690c76071?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            cash: 1000,
            gender: 'male'
          },
          data: [],
          genderFilter: ''
        };
      },
      methods: {
        addNum() {
          this.num++
        },
        getRandomUser() {
          axios.get('https://randomuser.me/api/?results=10')
            .then((res) => {
              this.data = res.data.results;
              console.log(this.data);
            })
        }
      },
      computed: {
        // computed 不會改動原始值
        // watch 類似 methods, 會更動原始值
        // “不修改原始數值” 的情況產生 “新值” （此值只為了渲染使用）
        // #1 雙倍運算 num
        // #2 過濾性別
        doubleNum() {
          return this.num * 2;
        },
        // 過濾列表
        filterData() {
          const newData = this.data.filter(item => {
            // data 所選擇的性別 vs Ajax 所取得的資料性別
            return item.gender === this.genderFilter // 判斷
          })
          if (!this.genderFilter) {
            return this.data; // 是否有被變更
          }
          return newData;
        }
      },
      mounted() {
        this.getRandomUser();
        
      }
    });
    app.mount('#app');

  </script>
</body>
</html>
```


#### Todos

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
  <!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
  <div id="app" class="container">
    <input type="text" v-model="text"> <button type="button"
    @click="addItem">增加文字</button>

    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.text }}
        <button type="button" 
        @click="editItem(item)">編輯品項</button>
        <button type="button" @click="removeItem(item)">移除品項</button>
      </li>
    </ul>

    <hr>
    <input type="text" v-model="temp.text">
    <button type="button"
    @click="doneEdit">編輯完成</button>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.global.min.js"></script>
  <script>
    // 當我們在 Vue 的
    const app = Vue.createApp({
      data() {
        // 資料集
        return {
          text: '我是卡斯伯',
          data: [],
          temp: {}
        };
      },
      methods: {
        // #1 如何新增資料
        addItem() {
          this.data.push({
            id: this.data.length + 1,
            text: this.text
          });
          this.text = '';
        },
        // #2 如何移除資料
        removeItem(item) {
          // 1 陣列索引
          // 2 id
          const index = this.data.findIndex(obj => obj.id === item.id);
          console.log(index);
          this.data.splice(index, 1);
        },
        // #3 如何編輯資料
        editItem(item) {
          this.temp = { ...item }; // ES6
        },
        // #4 把資料寫回
        doneEdit() {
          const index = this.data.findIndex(obj => obj.id === this.temp.id);

          // 把資料寫回索引
          this.data[index] = this.temp

          // this.temp 清空
          this.temp = {};
        }
      },
    });
    app.mount('#app');

    // Vue 2

  </script>
</body>
</html>
```