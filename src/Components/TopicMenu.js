import React, { Children } from "react";
import {Divider, Menu} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import TodoList from "./ListTodoMenu/TodoList/TodoList";
import "./TopicMenu.css"
const MergeListTodo = [
    {keyMerge:1, nameMerge:"abc1",
        children:[
            {keyList: 1,name:"TodoList1"},
            {keyList: 2,name:"Todolist2"},
            {keyList: 3,name:"TodoList3"},
        ]
    },
    {keyList: 7,name:"Todolist7"},
    {keyList: 6,name:"Todolist6"},
    {keyMerge:2, nameMerge:"abc2",
        children:[
            {keyList: 8,name:"TodoList8"},
            {keyList: 9,name:"Todolist9"},
            {keyList: 10,name:"TodoList10"},
        ]
    },
    {keyList: 4,name:"TodoList4"},
    {keyList: 5,name:"Todolist5"},
    {keyList: 11,name:"TodoList11"},
    {keyList: 12,name:"Todolist12"},
    {keyList: 13,name:"TodoList13"},
];
const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
    const CheckMerge=(key)=>{
        let list = MergeListTodo.filter(item => item.keyMerge === key)
        return list[0].nameMerge;
    }
    return (
    <>
    <div className="menu-todo">
        <Menu mode="inline" selectedKeys={[selectedKey.toString()]}>
            {topics.map((item, index) =>
                <Menu.Item key={"default" + index} onClick={()=>changeSelectedKey(index,"default")}>
                    <div style={{marginRight:"10px"}}>{item.icon}</div>
                    <div>{item.name}</div>
                </Menu.Item>
            )}
        </Menu>
        <div style={{width:'80%',margin:'0px auto'}}> 
            <Divider style={{borderColor: 'gray'}} type="horizontal"/>
        </div>
        <Menu mode="inline" selectedKeys={[selectedKey.toString()]}>
            {MergeListTodo.map((item,index)=>{
                if(item.keyList){
                    return(
                        <Menu.Item key={"todo"+item.keyList} onClick={()=>changeSelectedKey(item.keyList,"todoList")}>
                            <TodoList nameListTodo={item.name}/>
                        </Menu.Item>
                    )
                }else{
                    return(
                        <SubMenu key={"list"+ index + item.keyMerge} title={CheckMerge(item.keyMerge)}>
                            {item.children && item.children.map((list,index)=>{
                                console.log("check list",list);            
                                return(
                                    <Menu.Item key={"todo"+ list.keyList} onClick={()=>changeSelectedKey(list.keyList,"todoList")}>
                                        <TodoList nameListTodo={list.name}></TodoList>
                                    </Menu.Item>
                                )   
                            })}
                        </SubMenu>
                    )
                }
            })}
        </Menu>
    </div>
        
    </>
    
  );
}
export default TopicMenu;