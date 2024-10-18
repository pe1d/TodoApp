import './App.css';
import { useState } from 'react';
import CheckCircleTwoTone from '@ant-design/icons';
import { List, Typography, Button, Input } from 'antd'
const { Title } = Typography;
const { TextArea } = Input
const data = [
  {
    key: '1',
    nameTodo: 'Todo 1',
    date: "",
    due_date: "",
    completed: true,
    important: true,
    description: "Todo 1 description",
    groupId: 1
  },
  {
    key: '2',
    nameTodo: 'Todo 2',
    date: "",
    due_date: "",
    completed: true,
    important: true,
    description: "Todo 2 description",
    groupId: 2
  },
  {
    key: '3',
    nameTodo: 'Todo 3 Todo 3 descriptionTodo 3 descriptionTodo 3 descriptionTodo 3 descriptionTodo 3 descriptionTodo 3 description',
    date: "",
    due_date: "",
    completed: true,
    important: true,
    description: "Todo 3 description",
    groupId: 4
  },
  {
    key: '4',
    nameTodo: 'Todo 4',
    date: "",
    due_date: "",
    completed: true,
    important: true,
    description: "Todo 4 description",
    groupId: 2
  },
];
function App() {
  const deleteTodo = (id) => {
    //setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => deleteTodo(item.key)}>
                Delete
              </Button>,
            ]}
          >
            <div>
              <div>{item.nameTodo}</div>
              <div>{item.description}</div>
              <div>{item.completed === true ? <CheckCircleTwoTone /> : ""}</div>

            </div>
          </List.Item>
        )}
      />
    </>
  );
}

export default App;
