import { createApp, ref, computed, onMounted, watch } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js'

const STORAGE_KEY = 'todos_history';

const todoStorage = {
    fetch() {
        const todos = JSON.parse( localStorage.getItem( STORAGE_KEY ) || '[]');
        return todos;
    },
    save( todos ) {
        localStorage.setItem( STORAGE_KEY, JSON.stringify( todos ) );
    }
};

const filters = {
    all: todos => todos,
    undone: todos => todos.filter( todo => !todo.done ),
    done: todos => todos.filter( todo => todo.done ),
};

const App = createApp({
    setup() {

        // 顯示畫面
        const todos = ref([]);
        const filterType = ref('all');
        const filterTodos = computed(() => filters[ filterType.value ]( todos.value ));
        const total = computed(() => todos.value.length);
        const doneCount = computed(() => filters.done( todos.value ).length );

        // 新增 todo
        const newTodo = ref('');
        const addTodo = () => {
            const { value } = newTodo;
            if( !value.trim() ) return;
            const todoObj = {
                id: Date.now(),
                name: value,
                done: false,
            }
            todos.value = [ todoObj,...todos.value ];
            newTodo.value = '';
        }

        // 刪除 todo
        const deleteTodo = todo => {
            if( window.confirm('確定刪除嗎？') ) {
                const index = todos.value.indexOf( todo );
                todos.value.splice( index, 1);
            } else {
                cancelEdit( todo );
            }
        }

        // 編輯 todo
        const cacheTodo = ref( null );
        let beforeName = null;
        const editTodo = todo => {
            cacheTodo.value = todo;
            beforeName = todo.name;
        }
        // 完成編輯
        const doneEdit = todo => {
            if( !todo.name.trim() ) {
                deleteTodo( todo )
            }
            cacheTodo.value = null;
        }

        // 取消編輯
        const cancelEdit = todo => {
            todo.name = beforeName;
            cacheTodo.value = null;
        }

        // 調整所有 todo
        const toggleAllTodo = () => {
            const checkAllTodo = doneCount.value === total.value;
            todos.value.forEach( todo => todo.done = !checkAllTodo );
        }

        // 清除完成 todo
        const clearAllDone = () => {
            if ( window.confirm('你確定要刪除已完成的任務？')) {
                todos.value = filters.undone( todos.value );
                filterType.value = 'all';
            }
        }

        onMounted(() => todos.value = todoStorage.fetch());
        watch(
            todos,
            () => {
                todoStorage.save( todos.value );
            },{
                deep: true
            }
        );
        return {
            // data
            filterType,
            newTodo,
            cacheTodo,

            // computed
            filterTodos,
            total,
            doneCount,

            // methods
            addTodo,
            deleteTodo,
            editTodo,
            doneEdit,
            cancelEdit,
            toggleAllTodo,
            clearAllDone,
        }
    }
});
App.mount('#app');