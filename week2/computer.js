Vue.createApp({
    data(){
        return {
            show: 0,
            value: 0,
            symbol: '',
            result: 0,
            valueArray: [],
            history: [],
        }
    },
    methods: {
        // 數字按鈕
        numBtn(e){
            // 測試
            // console.log('按數字', e.target.value);
            // 當運算符號是 '=' 清空
            this.symbol === '=' ? this.clearValue() : '';
            // 初始化，當 value 是 0 時，轉成空字串，避免以數字 0 開頭
            if( this.value == 0 && this.show == 0 ) { 
                this.value = '';
                this.show = '';
            }
            // 在運算中，第二個數以後，當 value 是 0 時，轉成空字串，避免以數字 0 開頭
            if( e.target.value == 0 && this.value === '0' ) return
            else if( e.target.value && this.value === '0' ) {
                this.value = '';
                this.show = this.show.slice(0, -1);
                this.show += this.value;
            }
            // 輸入數字的基礎功能，顯示螢幕上的
            this.show += e.target.value;
            // 這是給程式計算的
            this.value += e.target.value;
            // 剛開始輸入數字，右邊的數字跟著同步
            if( this.valueArray.length === 0 ) this.result = this.value;
        },
        // 倒退按鈕，倒退最後一個數字
        backspace(e){
            // 當運算符號是 '=' 清空
            this.symbol === '=' ? this.clearValue() : '';
            // 一開始螢幕 '=' 兩邊數字同步
            if( this.result === this.show && this.result ){
                // 刪除最後一個數字
                this.show = this.show.slice(0, -1);
                this.value = this.value.slice(0, -1);
                // 剛開始輸入數字，右邊的數字跟著同步
                this.result = this.show;
                return
            }
            // 為了避免顯示螢幕上的數字出現 bug，讓使用者只能刪除當前 value
            if( this.value != '' ){
                // 刪除最後一個數字
                this.show = this.show.slice(0, -1);
                this.value = this.value.slice(0, -1);
            }
        },
        // 清空按鈕，清空 data
        clearValue(){
            this.show = 0;
            this.value = 0;
            this.symbol = '';
            this.result = 0;
            this.valueArray = [];
        },
        // 運算符號按鈕
        symbolBtn(e){
            // console.log('按鍵', e.target.value);
            // 當運算符號是 '=' 清空
            this.symbol === '=' ? this.clearValue() : '';
            // 切換運算符號
            if( this.value === '' ){
                this.show = this.show.slice(0, -1);
                this.symbol = e.target.value;
                this.show += e.target.textContent;
                return
            }
            // 將第一組數字推入數列
            this.valueArray.push( this.value );
            // 當數列有兩個數字時，先進行運算，後面運算才不會出 bug
            if( this.valueArray.length === 2 ) {
                switch( this.symbol ){
                    // 當 symbol 為 '+' 時，從這裡開始，以下 - * / 皆同
                    case '+':
                        // 將運算結果傳給 result
                        this.result = parseFloat(this.valueArray[0]) + parseFloat(this.valueArray[1]);
                        // 將小數點後 2 位四捨五入，再把小數點後面是 0 的去掉
                        this.result = parseFloat( this.result.toFixed(2) );
                        // 將 result 傳回到數列 [0]
                        this.valueArray[0] = this.result;
                        // 刪除數列最後一個值，以達到此數列保持 1 個數字
                        this.valueArray.pop();
                        break
                    case '-':
                        this.result = parseFloat(this.valueArray[0]) - parseFloat(this.valueArray[1]);
                        this.result = parseFloat( this.result.toFixed(2) );
                        this.valueArray[0] = this.result;
                        this.valueArray.pop();
                        
                        break
                    case '*':
                        this.result = parseFloat(this.valueArray[0]) * parseFloat(this.valueArray[1]);
                        this.result = parseFloat( this.result.toFixed(2) );
                        this.valueArray[0] = this.result;
                        this.valueArray.pop();
                        
                        break
                    case '/':
                        this.result = parseFloat(this.valueArray[0]) / parseFloat(this.valueArray[1]);
                        this.result = parseFloat( this.result.toFixed(2) );
                        this.valueArray[0] = this.result;
                        // 當 result 是無限時，顯示 ∞
                        if( this.result == 'Infinity' ) this.result = '∞';
                        this.valueArray.pop();
                        break 
                    default:
                        break
                }
            }
            // 傳運算符號到 symbol
            this.symbol = e.target.value;
            // 螢幕上添加運算符號
            this.show += e.target.textContent;
            // 清空 value 值
            this.value = '';
        },
        // 等於按鈕
        equalBtn(e){   
            // 如果沒有帶入數字，就會按了沒反應
            if( this.value === '' ) return;
            // 依照運算符號進行運算，大致上同上
            switch( this.symbol ){
                case '+':
                    this.result = parseFloat(this.valueArray[0]) + parseFloat(this.value);
                    // 修正數字到小數點後兩位
                    this.result = parseFloat(this.result.toFixed(2));
                    break
                case '-':
                    this.result = parseFloat(this.valueArray[0]) - parseFloat(this.value);
                    this.result = parseFloat(this.result.toFixed(2));
                    break
                case '*':
                    this.result = parseFloat(this.valueArray[0]) * parseFloat(this.value);
                    this.result = parseFloat(this.result.toFixed(2));
                    break
                case '/':
                    this.result = parseFloat(this.valueArray[0]) / parseFloat(this.value);
                    this.result = parseFloat(this.result.toFixed(2));
                    // 假如是無限，替換成符號
                    if( this.result == 'Infinity' ) this.result = '∞';
                    break
                default:
                    break
            };
            // 將運算符號切換成 '='，表示當前計算結束
            this.symbol = '=';
            // 添加
            this.newHistory();
        },
        // 小數點按鈕
        dotBtn(e){
            // 當運算符號是 '=' 清空
            this.symbol === '=' ? this.clearValue() : '';
            // 如果當前沒數字，自動帶入 0
            if( this.value === '' ){
                this.value = '0';
                this.show += this.value;
            }
            if( this.value.indexOf(".") != -1 ) return
            // 顯示螢幕上的
            this.show += e.target.value;
            // 這是給程式計算的
            this.value += e.target.value;
            // 剛開始輸入，右邊的結果跟著同步
            if( this.valueArray.length === 0 ) this.result = this.value;
        },
        // 新紀錄
        newHistory(){
            // 將結果存入字串
            const strHistory = this.show + ' = ' + this.result
            // 如果歷史紀錄超過十個，將刪除第一個
            if (this.history.length > 9) {
                this.history.shift();
            }
            // 使用傳送歷史紀錄方法
            this.pushHistory( strHistory );
        },
        // 接收歷史紀錄
        getHistory() {
            if ( localStorage.getItem('historyList') ) {
                this.history = JSON.parse( localStorage.getItem( 'historyList' ) );
            };
        },
        // 傳送歷史紀錄
        pushHistory( strHistory ) {
            // 將新紀錄加入歷史紀錄中
            this.history.push( strHistory );
            // 將資料轉成字串型式
            const localHistory = JSON.stringify( this.history );
            // 存入 localStorage
            localStorage.setItem( 'historyList', localHistory );
        },
        // 清除歷史紀錄
        clearHistory() {
            this.history = [];
            localStorage.removeItem( 'historyList' );
        }
    },
    mounted(){
        // 宣告 vm
        const vm = this;
        // 游標互動動畫
        VanillaTilt.init(this.$refs.computer,{
            max: 1,
            speed: 400,
            glare: true,
            "max-glare": .5,
        });
        // 獲取歷史紀錄
        this.getHistory();

        // 按鍵觸發，以下略同，keydown 按下按鍵時， keyup 放開按鍵時
        window.addEventListener('keydown', function(e){
            // 鎖定按的按鍵
            const btn = document.querySelector(`button[value="${e.key}"]`);
            // 如果是案 c 執行 clearValue()
            if( e.key === 'c'){
                vm.clearValue();
            }
            // 將沒有宣告的按鍵 return ，避免報錯
            if(!btn) return
            // 將按鍵套 class 達到使用者體感優化
            btn.classList.add('active');
            // 觸發按鍵 click 事件
            btn.click();
            // 測試
            // console.log(e.key);
            console.log(this)
        });
        window.addEventListener('keydown', function(e){
            const ex_btn = document.querySelector(`button[data-key="${e.key}"]`);
            if(!ex_btn) return
            ex_btn.classList.add('active');
            ex_btn.click();
        });
        window.addEventListener('keyup', function(e){
            const btn = document.querySelector(`button[value="${e.key}"]`);
            if(!btn) return
            btn.classList.remove('active');
        });
        window.addEventListener('keyup', function(e){
            const ex_btn = document.querySelector(`button[data-key="${e.key}"]`);
            if(!ex_btn) return
            ex_btn.classList.remove('active');
        });
    },
}).mount('#app');