###### tags: `六角學院` `Vue 3 新手夏令營`

# :tent: Vue 3 與指令

[![week2](https://i.imgur.com/Xd2g377.png)](https://johnsonmao.github.io/summer-camp-vue3/week2/)
*第二週作業展示，運用了 Vue 進階指令與 localStrage，點擊圖片可察看成果*

## Vue 常用指令

### v-model 修飾符

- number：限制只有數值型別的資料才能寫入
    `v-model` 預設是字串型別

  ```HTML
  <div id="app">
      <input type="text" v-model.number="number" >
      {{ number }}
      {{ typeof number }}
  </div>
  ```

- trim：去除字串前後多於的空白

    ```HTML
    const text = '   六角學院 Vue 3 夏令營   '
    console.log( text.trim() ) 
    // 顯示'六角學院 Vue 3 夏令營'
    ```

### v-on：事件觸發器

- 最常用：prevent（去除預設事件）

### v-bind

- 縮寫：`:`

### v-for

- ==key 唯一且必填==

- 當 input 輸入內容後，按下反轉陣列時：
    1. 如果沒有 key 時，則 input 位置不會被同時更動
    2. 當有加上 key 時，input 位置會與原本的資料內容位置一起變動
![key](https://i.imgur.com/Gbdl20j.gif)

        ```HTML
        <div id="app">
            <h4>缺少 key</h4>
                <ul>
                    <li v-for="( item, key ) in arrayData" 
                        class="pb-1">
                    {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
                    </li>
                </ul>

            <h4>加上 key</h4>
                <ul>
                    <li v-for="( item, key ) in arrayData" 
                        class="pb-1" :key="item.age">
                    {{ key }} - {{ item.name }} {{ item.age }} 歲 <input type="text" />
                    </li>
                </ul>
            <button class="btn btn-outline-primary" 
                @click="reverseArray">
                反轉陣列
            </button>
        </div>
        ```

        ```JS
        Vue.createApp({
            data(){
                return{
                    arrayData: [
                        { name:"魯夫", age: 19 },
                        { name:"索隆", age: 21 },
                        { name:"娜美", age: 20 },
                    ],
                }
            },
            methods: {
                reverseArray() {
                    this.arrayData.reverse()
                    console.log( this.arrayData )
                }
            },
        }).mount('#app')
        ```

### v-class

- 範例一 按鈕樣式 - 按下去自動 active
    ![active](https://i.imgur.com/eo8pNrp.gif)

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
        methods: {}
    }

    Vue.createApp(app).mount('#app')
    ```

- 範例二 頁籤切換 - 達到頁籤效果
    ![page](https://i.imgur.com/O9kfLAx.gif)

    ```HTML
    <div id="app">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Home'}"
                    @click="isActive = 'Home'">
                    Home
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Profile'}"
                    @click="isActive = 'Profile'">
                    Profile
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    :class="{active: isActive === 'Casper'}"
                    @click="isActive = 'Casper'">
                    Casper
                </button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane" 
                :class="{active: isActive === 'Home'}">
            Home
            </div>
            <div class="tab-pane" 
                :class="{active: isActive === 'Profile'}">
            Profile
            </div>
            <div class="tab-pane" 
                :class="{active: isActive === 'Casper'}">
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
        methods: {}
    }

    Vue.createApp(app).mount('#app')
    ```

## 雙向綁定

> ![v-model](https://i.imgur.com/ogKK8jt.png)
> [name=卡斯伯]

綠色：**只能讀出**資料渲染

紅色：**雙向**綁定可讀可寫

藍色：利用**事件觸發**調整 data，再利用渲染方法渲染到畫面上

黑色：**初始化**渲染畫面 ( 1 次 )

{%hackmd @JohnsonMao/theme-Wood-Fired %}
