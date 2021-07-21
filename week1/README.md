# Vue3 practive
## 起手式：
- 使用 createApp 建立起始元件
- 使用 mount 決定 Vue 的應用程式生成位置

## 基本語法與指令

- 請問如何建立一個字串
- 如何建立一個數字
- 數字與畫面上的 v-model

指令小示範：

- v-model
- `{{}}`
- 判斷式 `v-if`
- 迴圈顯示 `v-for`
- HTML 屬性綁定 `:`
- 事件觸發 `@`

## Vue

[CDN 連結](https://v3.vuejs.org/guide/installation.html#vue-devtools)
語法：`<script src="https://unpkg.com/vue@next"></script>
`

請務必記下來，以下三個值，在後續開發會一直出現：
> 起手式 1：data 資料邏輯
> 起手式 2：methods 方法
> 起手式 3：mounted 生命週期

### 關注點分離

![](https://i.imgur.com/zMu6v5x.png)

:::warning
:warning: 重要觀念：先定義資料，才能在 html 中使用
:::

範例程式碼：
```html
<!-- 這裡是 html -->
<div id="app">
    {{ text }}
</div>
```

```javascript
// 這裡是 Vue
Vue.createApp({
  // data 函式
  data: function() {
    // 一定是用 return
    return {
      text: '卡斯伯好帥',
      name: '小明',
      num: 0
    }
  },
  // methods 方法
  methods: {
  
  },
  // mounted 函式
  mounted: function() {
  
  },
}).mount('#app');
```

Q：如何在 html 中讀取 vue data？
A：將 data 的資料掛在到 html 元素中，使用 `{{}}`方法，將 data 資料包在裡面。


### 指令

- v-model：和 html 雙向綁定 data 資料（會同步兩邊資料）
  ```html
  <input type="number" v-model="num">
  ```
- v-bind：在 html 標籤上進行屬性綁定
  ```html
  <img v-bind:src="person.image" :alt="person.name" width="100">
  ```
  - 省略語法：直接在屬性前加上 `:` 省略 `v-bind`
- v-if：將判斷式寫入 `""` 中，若是 true 則會顯示，false 則不會顯示
- v-else：不用加判斷式，但需要搭配 v-if 一起使用（若要還需要判斷，則使用 v-else-if）

```html
<i v-if="person.gender === 'male'"></i>
<i v-else-if="person.gender === 'female'"></i>
<i v-else></i>
```

:::warning
:warning: `v-if` `v-else` 要搭配一起使用才會有效果
:::

- v-for：多筆資料透過迴圈方式將資料迭代出來

  ```html
  <ul>
    <li v-for="item in people">
      {{ item.name }}
      <button type="button">增加</button>
      <img :src="item.image" :alt="item.name">
      <i v-if="item.gender === 'male'"
          class="bi bi-gender-male"
      ></i>
      >
      <i v-else
          class="bi bi-gender-male"
      ></i>
      {{ item.cash }}
    </li>
  </ul>
  ```
  
  - people 是 data 中的陣列
  - item 代表 people 中，每一個獨立的物件， item 可自定義名稱
  - v-for 必須帶 key(下週會說明)

  示意圖：
  - ![](https://i.imgur.com/EHNwlax.png)

- @click
  - 在 DOM 元素上加入監聽事件，下方示範 vue 監聽事件以及 jQuery 監聽事件差異
  ```javascript
  // 這是 jQuery 的寫法
  $(`#button`).on('click', function(){

  });
  ```
  ```html
  <!--  這是 Vue 在 html 上綁定事件的做法  -->
  <button type="button" @click="item.cash++">
    增加
  </button>
  ```
- methods 函式
  ```javascript
  // 這是 Vue 透過 methods 給函式
  methods: {
    clickAlert() { // 建議可以縮寫就縮寫（提升程式碼閱讀性）
      alert('我被觸發了');
    },
  }
  ```
- mounted 生命週期
  - 使用 this 方式取 data 的值
  ```javascript
  mounted: funtcion() {
    console.log(this.text);
    // this.clickAlert();
    console.log(this.name);
    
    // this 本身是個很複雜的知識，但在 Vue 中把它簡單化了。    
    console.log(this.person.image);
    // 修改資料範例    
    this.text = '我叫小賀'
    // Ajax 取的的資料放在這邊
  }
  ```
  - 網頁載入後只會執行一次，適合做初始化


### 延伸知識

- 範例
```htmlembedded=
<div id="app">
  {{ text }}
</div>
```
```javascript=
Vue.createApp({
  data() {
    return {
      text: '我叫卡斯伯'
    }
  },
  methods: {

  },
  mounted() {

  }
}).mount('#app')
```


![](https://i.imgur.com/pzMahpd.png)

一般：
- 整包載入

ESModule： vuecli也是使用 ESM
- 單一模組
- 是分別獨立的一個一個方法，ex：createApp、ref、reactive

> 擇一使用，不會同時使用兩種載入方法，建議使用 ESModule 的載入方法。
> [name=卡斯伯]

  ```html
  <script type="module">
  imoport { createApp } from 'url';
  </script>
  ```
  :::danger
  ESM 如果沒有加 `type="module"` 使用 import/export 會報錯
  :::

