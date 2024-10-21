import { UnorderedListOutlined } from "@ant-design/icons";

const TodoList =({nameListTodo})=>{
    return(
        <>
            <div style={{marginRight:"10px"}}><UnorderedListOutlined/></div>
            <div>{nameListTodo}</div>
        </>
    )
    
}
export default TodoList;