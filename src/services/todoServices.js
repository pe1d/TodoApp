

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
        console.log("Check todo from saga", todo);
        const todoList = (JSON.parse(localStorage.getItem("listTodo")) || []).filter(item => item.key !== todo.key);
        console.log(todoList);
        localStorage.setItem('listTodo', JSON.stringify(todoList))
        return ({ message: "Remove todo success", errCode: 0 })
    } catch (e) {
        console.log('error: ', e);
    }

}
const updateTodoApi = (todo) => {
    try {
        const todoList = JSON.parse(localStorage.getItem("listTodo")) || [];
        const index = todoList.findIndex((item) => item.key === todo.key)
        if (index >= 0) {
            todoList[index] = todo
            //console.log("Check todo list on services: ", todoList);
            localStorage.setItem('listTodo', JSON.stringify(todoList))
            return ({ message: "Update todo success", errCode: 0 })
        }
        return ({ message: "Update todo fail", errCode: 1 })
    } catch (e) {
        console.log('error: ', e);
    }
}
const updateTodoGroupApi = (todoGroup) => {
    try {
        const todoGroupList = JSON.parse(localStorage.getItem("listTodoGroup")) || [];
        const index = todoGroupList.findIndex((item) => item.keyGroup === todoGroup.keyGroup)
        if (index >= 0) {
            todoGroupList[index] = todoGroup
            //console.log("Check todo list on services: ", todoList);
            localStorage.setItem('listTodoGroup', JSON.stringify(todoGroupList))
            return ({ message: "Update todo group success", errCode: 0 })
        }
        return ({ message: "Update todo group fail", errCode: 1 })
    } catch (e) {
        console.log('error: ', e);
    }
}
const removeTodoGroupApi = (todoGroup) => {
    try {
        const todoGroupList = (JSON.parse(localStorage.getItem("listTodoGroup")) || []).filter(item => item.keyGroup !== todoGroup.keyGroup);
        //TH1: Xoa tat ca cac todo co trong todoGroup
        // const todoList = (JSON.parse(localStorage.getItem("listTodo")) || []).filter(item => item.keyGroup !== todoGroup.keyGroup);
        //TH2: Chuyen tat ca cac todo co trong todoGroup ra ngoai
        const todoList = (JSON.parse(localStorage.getItem("listTodo")) || [])
        const listTodoUpdate = todoList.map(item => {
            if (item.keyGroup === todoGroup.keyGroup) {
                item.keyGroup = ""
            }
            return item
        })
        //Save todo List
        localStorage.setItem('listTodo', JSON.stringify(listTodoUpdate))
        //Save todo Group List
        localStorage.setItem('listTodoGroup', JSON.stringify(todoGroupList))
        return ({ message: "Remove todo group success", errCode: 0 })
    } catch (e) {
        console.log('error on delete todo group: ', e);
    }
}
export { addTodoApi, removeTodoApi, updateTodoApi, updateTodoGroupApi, removeTodoGroupApi }