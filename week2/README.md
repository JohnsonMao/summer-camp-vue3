# Vue3 practive

## Vue 常用指令

### v-model 修飾符

- number：限制只有數值型別的資料才能寫入
  `v-model` 預設是字串型別
- trim：去除字串前後多於的空白
```HTML
<div id="app">
  <input type="text" v-model.number="number" >
  {{ number }}
  {{ typeof number }}
  <hr>
  <input type="text" v-model="number2">
  {{ number2 }}
  {{ typeof number2 }}
</div>
```


### v-on：事件觸發器

- 最常用：prevent（去除預設事件）

### v-bind

- 縮寫：`：`


### v-for

- key 唯一且必填

* 當 input 輸入內容後，按下反轉陣列時：

    * 如果沒有 key 時，則 input 位置不會被同時更動
    * 當有加上 key 時，input 位置會與原本的資料內容位置一起變動

```HTML
<div id="app">
  <h4>缺少 key</h4>
  <ul>
    <li v-for="(item, key) in arrayData">
      {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
    </li>
  </ul>

  <h4>加上 key</h4>
  <ul>
    <li v-for="(item, key) in arrayData" :key="item.age">
      {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
    </li>
  </ul>
  <button class="btn btn-outline-primary" @click="reverseArray">
    反轉陣列
  </button>
</div>
```

```JS
const app = {
  data() {
    return {
      arrayData: [
        {
          name: '卡斯伯',
          age: 35
        },
        {
          name: 'Ray',
          age: 28 // 我還很年輕不要幫我加歲數。
        },
        {
          name: '洧杰',
          age: 33
        }
      ]
    }
  },
  methods: {
    reverseArray: function () {
      this.arrayData.reverse()
      console.log(this.arrayData)
    },
  }
}

Vue.createApp(app).mount('#app')
```

![](https://i.imgur.com/kJ6b5Xf.png)

### v-class

- 範例一 按鈕樣式

    ```HTML
    <button
    type="button"
    class="btn btn-outline-primary"
    :class="{active: isActive}"
    @click="isActive = !isActive"
    >
    Primary
    </button>
    ```

    ```JS
    const app = {
    data() {
        return {
        isActive: false,
        }
    },
    methods: {
    }
    }

    Vue.createApp(app).mount('#app')
    ```

- 範例二 頁籤切換

    ```HTML
    <div id="app">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            :class="{active: isActive === 'Home'}"
            @click="isActive = 'Home'"
        >
            Home
        </button>
        </li>
        <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            :class="{active: isActive === 'Profile'}"
            @click="isActive = 'Profile'"
        >
            Profile
        </button>
        </li>
        <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            :class="{active: isActive === 'Casper'}"
            @click="isActive = 'Casper'"
        >
            Casper
        </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane" :class="{active: isActive === 'Home'}">Home</div>
        <div class="tab-pane" :class="{active: isActive === 'Profile'}">
        Profile
        </div>
        <div class="tab-pane" :class="{active: isActive === 'Casper'}">
        Casper
        </div>
    </div>
    </div>
    ```

    ```JS
    const app = {
    data() {
        return {
        isActive: '',
        }
    },
    methods: {
    }
    }

    Vue.createApp(app).mount('#app')
    ```

## 雙向綁定

![](https://i.imgur.com/ogKK8jt.png)


<table>
    <tr>
        <td bgcolor=#f6a>
        <font color=#fff>只讀出渲染</font>
        </td>
    </tr>
    <tr>
        <td bgcolor=#5d7>
        <font color=#fff>可讀可寫</font>
        </td>
    </tr>
    <tr>
        <td bgcolor=#59f>
        <font color=#fff>利用事件觸發調整 data，再利用渲染方法渲染到畫面上</font>
        </td>
    </tr>
    <tr>
        <td bgcolor=#555>
        <font color=#fff>初始化渲染畫面 ( 1 次 )</font>
        </td>
    </tr>
</table>

