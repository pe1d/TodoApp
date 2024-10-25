import React, { useEffect, useState } from "react";
import { Divider, Menu, Button, Input } from "antd";
import { UnorderedListOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { changeCollapseMenu, changeSelectedMenuKey } from "../../../Redux/Slices/appSlice";
import "./MenuApp.css"
import { addNewTodoGroup, getListTodoGroup } from "../../../Redux/Slices/todoSlice";
const MenuApp = ({ items }) => {
  const { selectedMenuKey, collapseMenu, listTodoGroup } = useSelector((state) => ({
    selectedMenuKey: state.app.selectedMenuKey,
    collapseMenu: state.app.collapseMenu,
    listTodoGroup: state.todo.listTodoGroup
  }))
  const [addTodoGroup, setAddTodoGroup] = useState(false)
  const [nameTodoGroup, setNameTodoGroup] = useState("")
  const dispatch = useDispatch();
  const hanldClickBtnChangeCollapseMenu = () => {
    dispatch(changeCollapseMenu(!collapseMenu))
    setAddTodoGroup(false)
  }
  const hanldeClickBtnAddTodoGroup = () => {
    const todoGroup = { keyGroup: 'l-' + (new Date().getTime().toString()), nameGroup: nameTodoGroup }
    console.log(todoGroup);
    dispatch(addNewTodoGroup(todoGroup))
  }
  useEffect(() => {
    function fetchListTodoGroup() {
      dispatch(getListTodoGroup());
    }
    fetchListTodoGroup()
  }, [])
  //console.log("Check list todo group", listTodoGroup);

  return (
    <>
      <div className="header-menu">
        <Button type="primary" onClick={hanldClickBtnChangeCollapseMenu} style={collapseMenu === true && { width: 32, height: 32, padding: "10px" }}>
          {collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-todo">
        <Menu mode="inline" selectedKeys={[selectedMenuKey.toString()]}>
          {items.map((item, index) =>
            <Menu.Item title={item.label} key={item.key} onClick={() => dispatch(changeSelectedMenuKey(item.key))}>
              <div style={{ marginRight: "10px" }}>{item.icon}</div>
              {collapseMenu === false && <div>{item.label}</div>}
            </Menu.Item>
          )}
        </Menu>
        <div style={{ width: '80%', margin: '0px auto' }}>
          <Divider style={{ borderColor: 'gray' }} type="horizontal" />
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenuKey.toString()]}>
          {listTodoGroup.map((item, index) => {
            return (
              <Menu.Item icon={<UnorderedListOutlined />} title={item.nameGroup} key={item.keyGroup}
                onClick={() => dispatch(changeSelectedMenuKey(item.keyGroup))}>
                <div>{item.nameGroup}</div>
              </Menu.Item>
            )
          })
          }
        </Menu>
      </div>
      <div className="header-menu" style={{ position: 'relative' }}>
        {addTodoGroup &&
          <div className="box-add-todoGroup" style={{ display: 'flex', position: 'absolute', top: -50, left: 0, padding: 10, width: "100%" }}>
            <Input value={nameTodoGroup} onChange={(e) => setNameTodoGroup(e.target.value)} placeholder="Name todo group" variant="borderless">
            </Input>
            <Button onClick={() => hanldeClickBtnAddTodoGroup()} type="primary">Add</Button>
          </div>
        }
        <div style={{ color: "#1677ff", cursor: "pointer", display: 'flex', alignItems: "center", gap: "10px" }}
          onClick={() => { setAddTodoGroup(!addTodoGroup); dispatch(changeCollapseMenu(false)); }}>
          <PlusOutlined /> {!collapseMenu ? 'Add new list' : ''}
        </div>
      </div>
    </>

  );
}
export default MenuApp;