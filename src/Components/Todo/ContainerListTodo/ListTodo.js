import {Divider,Table } from 'antd';
import AddTodo from '../AddTodo';
import { StarOutlined,StarFilled } from '@ant-design/icons';
const columns =[
    {title: 'Title', dataIndex: 'nameTodo'},
    {title: 'Due to', dataIndex:'dateTo'},
    {title: 'Importance', dataIndex:'important', align:'center', render: (important) =>{
        if(important){
            return <StarFilled style={{color:"#1677ff"}}/>
        }else{
            return <StarOutlined style={{color:"#1677ff"}}/>
        }
    }},
    {title: 'Description', dataIndex:'description'},
]
const data =[
    {key:1,nameTodo:'Todo 1', dateTo:'15/10/2024',important: true, description:"description todo 1"},
    {key:2,nameTodo:'Todo 2', dateTo:'15/10/2024',important: false, description:"description todo 1"},
    {key:3,nameTodo:'Todo 3', dateTo:'15/10/2024',important: true, description:"description todo 1"},
    {key:4,nameTodo:'Todo 4', dateTo:'15/10/2024',important: true, description:"description todo 1"},
    {key:5,nameTodo:'Todo 5', dateTo:'15/10/2024',important: false, description:"description todo 1"},
    {key:6,nameTodo:'Todo 6', dateTo:'15/10/2024',important: true, description:"description todo 1"},
]
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
const ListTodo = ({onClick})=>{
    return(
        <>
            <AddTodo/>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                style={{width:'80%',marginTop:'20px'}}
            />
        </>
    )
}
export default ListTodo;