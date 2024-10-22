import React, { useState } from "react";
import { Layout } from "antd";
import TopicMenu from "./Components/TopicMenu";
import "./App.css";
import { SunOutlined,StarOutlined,CalendarOutlined,ProfileOutlined,CheckCircleOutlined, FireOutlined } from "@ant-design/icons";
import SideBar from "./Components/SideBar/SideBar";
import ListTodo from "./Components/Todo/ContainerListTodo/ListTodo";
function App() {
  const topics = [
    {id:1 , name: "My day",icon:<SunOutlined/>},
    {id:2 , name: "Important",icon:<StarOutlined/>},
    {id:3 , name: "Planned",icon:<CalendarOutlined/>},
    {id:4 , name: "All",icon:<ProfileOutlined/>},
    {id:5 , name: "Compeleted",icon:<CheckCircleOutlined/>},
    {id:6 , name: "Task",icon:<FireOutlined/>},
  ];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("");
  const changeSelectedKey = (index,type) => {
      setSelectedKey(type+index);
  };
  const Menu = (
    <>
      <TopicMenu
        topics={topics}
        selectedKey={selectedKey}
        changeSelectedKey={changeSelectedKey}
      />
    </>
    
  );
  return (
    <div className="App">
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {selectedKey && selectedKey.includes("default") &&
            <div>
              <ListTodo/>
            </div>
          }
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
