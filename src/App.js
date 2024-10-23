import React from "react";
import { Layout } from "antd";
import "./App.css";
import {StarOutlined,CloseCircleOutlined,ProfileOutlined,CheckCircleOutlined } from "@ant-design/icons";
import SideBar from "./Components/SideBar/SideBar";
import ListTodo from "./Components/Todo/ContainerListTodo/ListTodo";
import {useSelector} from 'react-redux'
import DetailTodo from "./Components/DetailTodo/DetailTodo";
function App() {
  const items = [
    {key:"d04" , label: "All",icon:<ProfileOutlined/>},
    {key:"d02" , label: "Important",icon:<StarOutlined/>},
    {key:"d05" , label: "Compeleted",icon:<CheckCircleOutlined/>},
    {key:"d03" , label: "Uncompeleted",icon:<CloseCircleOutlined />},
  ];
  const {selectedMenuKey} = useSelector((state)=>({
    selectedMenuKey: state.app.selectedMenuKey
  }))
  const getItemBySelectedMenuKey = () =>{
    return items.find(item=> item.key === selectedMenuKey)
  }
  return (
    <div className="App">
      <Layout>
        <SideBar items={items}/>
        <Layout.Content className="content">
          {selectedMenuKey && selectedMenuKey.includes("d") &&
            <div>
              <ListTodo item={getItemBySelectedMenuKey()} />
            </div>
          }
        </Layout.Content>
        <DetailTodo/>
      </Layout>
    </div>
  );
}

export default App;
