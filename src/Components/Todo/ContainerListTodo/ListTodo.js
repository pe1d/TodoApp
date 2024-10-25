import { Table } from 'antd';
import AddTodo from '../AddTodo';
import { StarOutlined, StarFilled, CheckCircleTwoTone } from '@ant-design/icons';
import { Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollapseDetailTodo } from '../../../Redux/Slices/appSlice';
import { addTodoSelection, getListTodo } from '../../../Redux/Slices/todoSlice';
import { useEffect } from 'react';

const { Title } = Typography;
const columns = [
    { title: 'Title', dataIndex: 'nameTodo' },
    { title: 'Due to', dataIndex: 'dateTo' },
    {
        title: 'Importance', dataIndex: 'important', align: 'center', render: (important) => {
            if (important) {
                return <StarFilled style={{ color: "#1677ff" }} />
            } else {
                return <StarOutlined style={{ color: "#1677ff" }} />
            }
        }
    },
    {
        title: 'Completed', dataIndex: 'complete', align: 'center',
        render: (complete) => {
            return complete === true ? <CheckCircleTwoTone /> : '';
        }
    },
    { title: 'Description', dataIndex: 'description' },
    {
        title: 'Action', key: 'action',
        render: (_, record) => {
            //console.log("check record",record); 
            return (
                <Button type={record.complete ? "dashed" : "primary"} size="middle">
                    {record.complete ? "UnCompelete" : "Compelete"}
                </Button>
            )
        },
    },
]
const ListTodo = ({ item }) => {
    const dispatch = useDispatch();
    const { collapseDetailTodo } = useSelector((state) => ({
        collapseDetailTodo: state.app.collapseDetailTodo
    }))
    const { listTodo } = useSelector((state) => ({
        listTodo: state.todo.listTodo
    }))
    useEffect(() => {
        dispatch(getListTodo())
    }, [])
    //console.log("Check list todo", listTodo);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (collapseDetailTodo === true) {
                dispatch(changeCollapseDetailTodo(false))
            }
            dispatch(addTodoSelection(selectedRows[0]))
        },
    };

    return (
        <div className='container'>
            <Title level={2} style={{ color: "#1677ff", display: 'flex', gap: '20px' }}>{item.icon} {item.label}</Title>
            <AddTodo />
            <Table
                // onRow={(record, rowIndex) => {
                //     return {
                //         onClick: (event) => {
                //             if (collapseDetailTodo === true) {
                //                 dispatch(changeCollapseDetailTodo(false))
                //             }
                //             dispatch(addTodoSelection(record))
                //             //console.log(record);

                //         }, // click row
                //     };
                // }}
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={listTodo}
                pagination={false}
                scroll={{
                    x: 0,
                    y: "70vh"
                }}
                style={{ marginTop: '20px' }}
            />
        </div>
    )
}
export default ListTodo;