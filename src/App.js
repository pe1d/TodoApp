import React from "react";
import { Layout } from "antd";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import ListTodo from "./Components/Todo/ContainerListTodo/ListTodo";
import { useSelector } from "react-redux";
import DetailTodo from "./Components/DetailTodo/DetailTodo";
import { stateSelectedMenu } from "./Redux/selector/appSelector";
import { TaskTimeline } from "./Components/Todo/Gantt/TaskTimeline.tsx";
function App() {
  const items = [
    { key: "d04", label: "All", icon: "ProfileOutlined", searchType: "all" },
    {
      key: "d02",
      label: "Important",
      icon: "StarOutlined",
      searchType: "important",
    },
    {
      key: "d05",
      label: "Compeleted",
      icon: "CheckCircleOutlined",
      searchType: "compeleted",
    },
    {
      key: "d03",
      label: "Uncompeleted",
      icon: "CloseCircleOutlined",
      searchType: "uncompeleted",
    },
  ];
  const selectedMenu = useSelector(stateSelectedMenu);
  return (
    <div className="App">
      <Layout>
        <SideBar items={items} />
        <Layout.Content className="content">
          {/* {selectedMenu && (
            <div>
              <ListTodo />
            </div>
          )} */}
          <TaskTimeline />
        </Layout.Content>
        <DetailTodo />
      </Layout>
    </div>
  );
}

export default App;
