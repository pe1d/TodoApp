import {Table } from 'antd';
import AddTodo from '../AddTodo';
import { StarOutlined,StarFilled,CheckCircleTwoTone } from '@ant-design/icons';
import { Typography,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollapseDetailTodo } from '../../../Redux/Slices/appSlice';
import { addTodoSelection, getListTodo } from '../../../Redux/Slices/todoSlice';
import { useEffect } from 'react';

const { Title } = Typography;
const data =[
    {key:1,nameTodo:'Todo 1',dateCreate:"", dateTo:'24/10/2024',important: true, complete:false, description:"description todo 1",groupKey:""},
    {key:2,nameTodo:'Todo 2',dateCreate:"", dateTo:'25/10/2024',important: false, complete:false,description:"description todo 1",groupKey:""},
    {key:3,nameTodo:'Todo 3',dateCreate:"", dateTo:'25/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:4,nameTodo:'Todo 4',dateCreate:"", dateTo:'15/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:5,nameTodo:'Todo 5',dateCreate:"", dateTo:'15/10/2024',important: false, complete:true,description:"description todo 1",groupKey:""},
    {key:6,nameTodo:'Todo 6',dateCreate:"", dateTo:'18/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:7,nameTodo:'Todo 7',dateCreate:"", dateTo:'12/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:8,nameTodo:'Todo 8',dateCreate:"", dateTo:'13/10/2024',important: false, complete:true,description:"description todo 1",groupKey:""},
    {key:9,nameTodo:'Todo 9',dateCreate:"", dateTo:'11/11/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:10,nameTodo:'Todo 10',dateCreate:"", dateTo:'12/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:11,nameTodo:'Todo 11',dateCreate:"", dateTo:'12/12/2024',important: false, complete:false,description:"description todo 1",groupKey:""},
    {key:12,nameTodo:'Todo 12',dateCreate:"", dateTo:'11/10/2024',important: true, complete:true,description:"description todo 1",groupKey:""},
    {key:13,nameTodo:'Todo 13',dateCreate:"", dateTo:'13/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:14,nameTodo:'Todo 14',dateCreate:"", dateTo:'12/10/2024',important: false, complete:false,description:"description todo 1",groupKey:""},
    {key:15,nameTodo:'Todo 15',dateCreate:"", dateTo:'11/10/2024',important: true, complete:true,description:"description todo 1",groupKey:""},
    {key:16,nameTodo:'Todo 16',dateCreate:"", dateTo:'13/11/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
    {key:17,nameTodo:'Todo 17',dateCreate:"", dateTo:'11/10/2024',important: false, complete:false,description:"description todo 1",groupKey:""},
    {key:18,nameTodo:'Todo 18',dateCreate:"", dateTo:'09/10/2024',important: true, complete:false,description:"description todo 1",groupKey:""},
]
const ListTodo = ({item})=>{
    const dispatch = useDispatch();
    const {collapseDetailTodo} = useSelector((state)=>({
        collapseDetailTodo: state.app.collapseDetailTodo
    }))
    const {listTodo} = useSelector((state)=>({
        listTodo: state.todo.listTodo
    }))
    useEffect(()=>{
        dispatch(getListTodo())
    },[])
    console.log("Check list todo",listTodo);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if(collapseDetailTodo === true){
                dispatch(changeCollapseDetailTodo(false))
            }
            dispatch(addTodoSelection(selectedRows[0]))
        },
    };
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
        {title: 'Completed', dataIndex:'complete',align:'center',
            render:(complete)=>{
                return complete === true ? <CheckCircleTwoTone /> : '';
            }
        },
        {title: 'Description', dataIndex:'description'},
        {title: 'Action', key: 'action', 
            render: (_, record) => {
                //console.log("check record",record); 
                return(
                    <Button type={record.complete ? "dashed" :"primary"} size="middle">
                        {record.complete ?"UnCompelete" :"Compelete"}
                    </Button>
                )
            },
          },
    ]
    return(
        <div className='container'>
            <Title level={2} style={{color:"#1677ff", display:'flex', gap:'20px'}}>{item.icon} {item.label}</Title>          
            <AddTodo/>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{
                    x:0,
                    y:"70vh"
                }}
                style={{marginTop:'20px'}}
            />
        </div>
    )
}
export default ListTodo;