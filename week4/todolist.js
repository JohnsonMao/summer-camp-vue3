import { createApp, ref, computed } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js'

const STORAGE_KEY = 'todos_history';

const todoStorage = {
    fetch() {
        const todos = JSON.parse( localStorage.getItem( STORAGE_KEY ) || '[]');
        return todos;
    },
    save( todos ) {
        localStorage.setItem( STORAGE_KEY, JSON.stringify(todos) );
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
        const todos = ref([
            { id:0, name:'test', done:false },
            { id:1, name:'test', done:true },
        ]);
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
            todos.value.push( todoObj );
            newTodo.value = '';
        }

        // 刪除 todo
        const deleteTodo = ( todo ) => {
            const index = todos.value.indexOf( todo );
            todos.value.splice( index, 1);
        }

        
        return {
            // data
            filterType,
            newTodo,

            // computed
            filterTodos,
            total,
            doneCount,

            // methods
            addTodo,
            deleteTodo,
        }
    }
});
App.mount('#app');