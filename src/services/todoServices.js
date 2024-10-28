

const addTodoApi = (todo) => {
    try {
        //console.log("Check todo from saga", todo);
        const todoList = JSON.parse(localStorage.getItem("listTodo")) || [];
        todoList.push(todo);
        localStorage.setItem('listTodo', JSON.stringify(todoList))
        return ({ message: "Add new todo success", errCode: 0 })
    } catch (e) {
        console.log(e);
    }

}
const removeTodoApi = (todo) => {
    try {
        //console.log("Check todo from saga", todo);
        const todoList = JSON.parse(localStorage.getItem("listTodo")) || [];
        todoList.filter(item => item.key !== todo.key);
        localStorage.setItem('listTodo', JSON.stringify(todoList))
        return ({ message: "Remove todo success", errCode: 0 })
    } catch (e) {
        console.log('error: ', e);
    }

}
export { addTodoApi, removeTodoApi }