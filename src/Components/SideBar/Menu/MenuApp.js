import React, { useEffect, useState } from "react";
import { Divider, Menu, Button, Input } from "antd";
import { UnorderedListOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { changeCollapseMenu, changeSelectedMenu } from "../../../Redux/Slices/appSlice";
import "./MenuApp.css"
import { addNewTodoGroup, getListTodoGroup } from "../../../Redux/Slices/todoSlice";
import IconRender from "../../Icon/IconRender";
import { stateCollapseMenu, stateSelectedMenu } from "../../../Redux/selector/appSelector";
import { stateListTodoGroup } from "../../../Redux/selector/todoSelector";
const MenuApp = ({ items }) => {
  const listTodoGroup = useSelector(stateListTodoGroup)
  const selectedMenu = useSelector(stateSelectedMenu);
  const collapseMenu = useSelector(stateCollapseMenu);
  const [addTodoGroup, setAddTodoGroup] = useState(false)
  const [nameTodoGroup, setNameTodoGroup] = useState("")
  const dispatch = useDispatch();
  const hanldClickBtnChangeCollapseMenu = () => {
    dispatch(changeCollapseMenu(!collapseMenu))
    setAddTodoGroup(false)
  }
  const hanldeClickBtnAddTodoGroup = () => {
    const todoGroup = { keyGroup: 'l-' + (new Date().getTime().toString()), nameGroup: nameTodoGroup }
    //console.log(todoGroup);
    if (!nameTodoGroup) {
      console.log("Name todo group is required value!");
      return
    }
    dispatch(addNewTodoGroup(todoGroup))
    setNameTodoGroup("")
  }
  useEffect(() => {
    const fetchListTodoGroup = () => {
      dispatch(getListTodoGroup());
    }
    fetchListTodoGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Menu mode="inline" selectedKeys={[selectedMenu.key]}
          items={(items || []).map((item, index) => ({
            key: item.key,
            label: item.label,
            icon: <IconRender selectedIcon={item.icon} />,
            onClick: () => dispatch(changeSelectedMenu(item))
          }))}
        >
        </Menu>
        <div style={{ width: '80%', margin: '0px auto' }}>
          <Divider style={{ borderColor: 'gray' }} type="horizontal" />
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu.keyGroup]}
          items={(listTodoGroup || []).map((item, index) => ({
            key: item.keyGroup,
            label: item.nameGroup,
            icon: <UnorderedListOutlined />,
            onClick: () => dispatch(changeSelectedMenu(item))
          }))}
        >
        </Menu>
      </div>
      <div className="header-menu" style={{ position: 'relative' }}>
        {addTodoGroup &&
          <div className="box-add-todoGroup" style={{ display: 'flex', position: 'absolute', top: -50, left: 0, padding: 10, width: "100%", backgroundColor: "#FFFFFF" }}>
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