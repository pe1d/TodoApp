import React from "react";
import { Layout } from "antd";
import "./SideBar.css"
import MenuApp from "./Menu/MenuApp";
import { useSelector, useDispatch } from "react-redux";
import { changeCollapseMenu } from "../../Redux/Slices/appSlice";
import { stateCollapseMenu } from "../../Redux/selector/appSelector";
const SideBar = ({ items }) => {
  const collapseMenu = useSelector(stateCollapseMenu)
  const dispatch = useDispatch();
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapseMenu}
      onCollapse={(value) => dispatch(changeCollapseMenu(value))}
    >
      <MenuApp items={items} />
    </Layout.Sider>
  );
};

export default SideBar;