import React, { useEffect } from "react";
import { Checkbox, Layout,Button,Input, Select } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { changeCollapseDetailTodo } from "../../Redux/Slices/appSlice";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { getListTodoGroup } from "../../Redux/Slices/todoSlice";
const DetailTodo = () => {
  const {collapseDetailTodo,todoSelection} = useSelector((state)=>({
    collapseDetailTodo: state.app.collapseDetailTodo,
    todoSelection: state.todo.todoSelection
  }))
  const {listTodoGroup} = useSelector((state)=>({
    listTodoGroup: state.todo.listTodoGroup
  }))
  useEffect(()=>{
    dispatch(getListTodoGroup())
  },[])
  const dispatch = useDispatch();
  const onChange = (e) =>{
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <Layout.Sider
      className="sidebar-right"
      //breakpoint={"lg"}
      width={300}
      theme="light"
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={collapseDetailTodo}
      defaultCollapsed={true}
      onCollapse={(value)=>dispatch(changeCollapseDetailTodo(value))}
    >
        {console.log("check todo selection",todoSelection)
        }
        <div className="container"style={{padding:'40px', display:'flex',flexDirection:'column',gap:'10px'}}> 
            <div className="" style={{display:'flex',justifyContent:'space-between'}}>
                <Checkbox onChange={onChange}/><Input value={todoSelection.nameTodo} variant="borderless" />
                {!todoSelection.important ? <StarOutlined style={{color:"#1677ff", fontSize:'1.2rem'}}/> : <StarFilled style={{color:"#1677ff",fontSize:'1.2rem'}}/>}
            </div>
            <div>
                <Select 
                    showSearch
                    placeholder="Select a todo list"
                    optionFilterProp="label"

                >
                    {listTodoGroup && listTodoGroup.length > 0 &&
                        listTodoGroup.map((item,index)=>{
                            return(
                                <Select.Option value={item.keyGroup}>
                                    {item.nameGroup}
                                </Select.Option>
                            )  
                        })
                    }
                    <option></option>
                </Select>
            </div>
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <Button type={todoSelection.complete ? "dashed" :"primary"} size="middle">
                            {todoSelection.complete ?"UnCompelete" :"Compelete"}
                </Button>
                <Button type={todoSelection.complete ? "dashed" :"primary"} size="middle">
                    Update
                </Button>
            </div>
            
        </div>
    </Layout.Sider>
  );
};

export default DetailTodo;