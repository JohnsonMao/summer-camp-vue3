import {
  createApp,
  ref,
  computed,
  onMounted,
  watch,
} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.0-beta.7/vue.esm-browser.min.js";

const STORAGE_KEY = "todolist_history";

const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const filters = {
  all: (todos) => todos,
  done: (todos) => todos.filter((todo) => todo.done),
  undone: (todos) => todos.filter((todo) => !todo.done),
};

const App = createApp({
  setup() {
    const todos = ref([]);
    const filterType = ref("all");
    const filterTodos = computed(() => filters[filterType.value](todos.value));
    const total = computed(() => todos.value.length);
    const doneCount = computed(() => filters.done(todos.value).length);

    const newTodo = ref("");
    const addTodo = () => {
      const { value } = newTodo;
      if (!value.trim) return;
      const todoObj = {
        id: Date.now(),
        name: value,
        done: false,
      };
      todos.value = [todoObj, ...todos.value];
      newTodo.value = "";
    };

    const deleteTodo = (todo) => {
      if (window.confirm("確定刪除嗎？")) {
        const index = todos.value.indexOf(todo);
        todos.value.splice(index, 1);
      } else {
        cancelEdit(todo);
      }
    };

    const cacheTodo = ref(null);
    let beforeName = null;
    const editTodo = (todo) => {
      cacheTodo.value = todo;
      beforeName = todo.name;
    };

    const doneEdit = (todo) => {
      if (!todo.name.trim()) deleteTodo(todo);
      cacheTodo.value = null;
    };

    const cancelEdit = (todo) => {
      todo.name = beforeName;
      cacheTodo.value = null;
    };

    const toggleAllTodo = () => {
      const checkAllTodo = doneCount.value === total.value;
      todos.value.forEach((todo) => (todo.done = !checkAllTodo));
    };

    const clearAllDone = () => {
      if (window.confirm("你確定要刪除已完成的任務？")) {
        todos.value = filters.undone(todos.value);
        filterType.value = "all";
      }
    };

    onMounted(() => (todos.value = todoStorage.fetch()));
    watch(
      todos,
      () => {
        todoStorage.save(todos.value);
      },
      {
        deep: true,
      }
    );
    return {
      filterType,
      newTodo,
      cacheTodo,

      filterTodos,
      total,
      doneCount,

      addTodo,
      deleteTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      toggleAllTodo,
      clearAllDone,
    };
  },
});
App.mount("#app");
