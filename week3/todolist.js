Vue.createApp({
    // 定義資料
    data() {
        // 必須 return
        return {
            // 接收新 todo 的 todo
            newTodo: '',
            // 集中所有 todo 的 array
            todos: [],
            // 完成 todo 的數量
            doneCount: 0,
            // 所有 todo 的數量
            total: 0,
            // 抓取資料的名稱
            cacheName: '',
            // 抓取資料的 ID
            cacheId: '',
            // 當前的過濾模式
            filterType: 'all',
            // 當前所有 todo 的進度
            checkAllTodo: false,
        }
    },
    // 刷新畫面不會修改原資料
    computed: {
        // 過濾分類清單
        filterTodos() {
            // 清單目前模式
            switch ( this.filterType ) {
                case 'undone':
                    return this.todos.filter( item => !item.done);
                case 'done':
                    return this.todos.filter( item => item.done);
                default:
                    return this.todos;
            }
        }
    },
    // 方法集
    methods: {
        // 新增 todo
        addTodo() {
            // 添加的 todo 名字不能空白
            if( !this.newTodo.trim() ){
                alert('請輸入代辦事項');
                return
            }
            // 準備好一個 todo 物件
            const item = { id: Date.now(), name: this.newTodo, done: false };
            // 把 item 新增到 todos
            this.todos = [item,...this.todos];
            // 輸入完清空
            this.newTodo = '';
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 刪除 todo
        deleteTodo( id ) {
            // 刪除前確認一下
            if( window.confirm('確定刪除嗎？') ){
                // 找到當前按鈕那列的 index
                const index = this.todos.findIndex( item => item.id === id);
                // 刪除
                this.todos.splice(index, 1);
            }
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 切換 todo
        toggleDone( id, done ) {
            // 找到當前按鈕那列的 index
            const index = this.todos.findIndex( item => item.id === id);
            this.todos[ index ].done = !done
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 編輯 todo
        editTodo( id, name ) {
            // 取得 name 與 id
            this.cacheName = name;
            this.cacheId = id;
        },
        // 編輯完成
        doneEdit( item ) {
            // 編輯的 todo 不能空白
            if ( !this.cacheName.trim() ) {
                alert('編輯的事項不能空白');
                return;
            }
            // 取得當前編輯的 index
            const index = this.todos.findIndex( item => item.id === this.cacheId);
            // 將編輯好的的資料回傳到列表中
            this.todos[ index ].name = this.cacheName;
            // 清空抓取的資料
            this.cacheName = '';
            this.cacheId = '';
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 取消編輯
        cancelEdit() {
            // 清空抓取的資料
            this.cacheName = '';
            this.cacheId = '';
        },
        // 全選
        toggleAllTodo() {
            // 調整全體
            this.checkAllTodo = !this.checkAllTodo
            this.todos = this.todos.map( item => {
                return {...item, done : this.checkAllTodo }
            })
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 清除已完成的 todo
        clearAllDone() {
            if ( window.confirm( '你確定要刪除已完成的任務?' ) ) {
                this.todos = this.todos.filter( item => !item.done )
                this.filterType = 'all'
            }
            // 刷新歷史紀錄
            this.pushHistory()
        },
        // 接收歷史紀錄
        getHistory() {
            if ( localStorage.getItem('todo_list_history') ) {
                this.todos = JSON.parse( localStorage.getItem( 'todo_list_history' ) );
            };
        },
        // 傳送歷史紀錄
        pushHistory() {
            // 將資料轉成字串型式
            const localHistory = JSON.stringify( this.todos );
            // 存入 localStorage
            localStorage.setItem( 'todo_list_history', localHistory );
        },
    },
    // 初始化
    mounted() {
        // 初始化接收歷史紀錄
        this.getHistory();
    },
}).mount('#app');