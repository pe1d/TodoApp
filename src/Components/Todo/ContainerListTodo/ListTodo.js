import { Modal, Table } from 'antd';
import AddTodo from '../AddTodo';
import { StarOutlined, StarFilled, CheckCircleTwoTone, WarningOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollapseDetailTodo } from '../../../Redux/Slices/appSlice';
import { addTodoSelection, getListTodo, removeTodo, updateTodo } from '../../../Redux/Slices/todoSlice';
import { useEffect, useState } from 'react';
import { stateListTodo, stateSelectTodo } from '../../../Redux/selector/todoSelector';
import { stateCollapseDetailTodo, stateSelectedMenu } from '../../../Redux/selector/appSelector';
import TitleSelected from './TitleSelected';
const ListTodo = () => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector(stateSelectedMenu)
    const collapseDetailTodo = useSelector(stateCollapseDetailTodo)
    const listTodo = useSelector(stateListTodo)
    const todoSelection = useSelector(stateSelectTodo)
    const [selectedRowKey, setSelectedRowKey] = useState("")
    const [open, setOpen] = useState(false)
    const [todoRemove, setTodoRemove] = useState({})
    useEffect(() => {
        dispatch(getListTodo())
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        //console.log("check")
        setSelectedRowKey("")
    }, [selectedMenu])
    //console.log("Check list todo", listTodo);
    const columns = [
        { title: 'Title', dataIndex: 'nameTodo' },
        { title: 'Due to', dataIndex: 'dateTo', sorter: (a, b) => new Date(a.dateTo) - new Date(b.dateTo) },
        {
            title: 'Importance', dataIndex: 'important', align: 'center', render: (important) => {
                if (important) {
                    return <StarFilled style={{ color: "#1677ff" }} />
                } else {
                    return <StarOutlined style={{ color: "#1677ff" }} />
                }
            },
            filters: [
                {
                    text: 'Important',
                    value: true,
                },
                {
                    text: 'Unimportant',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.important === value,
        },
        {
            title: 'Completed', dataIndex: 'complete', align: 'center',
            render: (complete) => {
                return complete === true ? <CheckCircleTwoTone /> : '';
            },
            filters: [
                {
                    text: 'Completed',
                    value: true,
                },
                {
                    text: 'Uncompleted',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.complete === value,
        },
        {
            title: 'Action', key: 'action',
            render: (_, record) => {
                //console.log("check record",record); 
                return (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <Button type={record.complete ? "dashed" : "primary"} style={{ width: '100px' }}
                            onClick={(e) => hanldeClickBtnUpdateCom(e, record)}
                        >
                            {record.complete ? "UnCompelete" : "Compelete"}
                        </Button>
                        <Button color="danger" variant="solid"
                            onClick={(e) => hanldeClickDelete(e, record)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </div>
                )
            },
        },
    ]
    const hanldeClickBtnUpdateCom = (event, record) => {
        event.stopPropagation();
        dispatch(updateTodo({ ...record, complete: !record.complete }))
    }
    const hanldeClickDelete = (event, record) => {
        event.stopPropagation();
        // console.log("Click delete record", record);
        // dispatch(removeTodo(record))
        setTodoRemove(record)
        setOpen(true)
    }
    const handleClickRow = (record) => {
        if (collapseDetailTodo === false && todoSelection.key === record.key) {
            dispatch(changeCollapseDetailTodo(true))
            setSelectedRowKey("")
        } else {
            dispatch(changeCollapseDetailTodo(false))
            setSelectedRowKey(record.key)
        }
        dispatch(addTodoSelection(record))
    }
    //console.log("Check list todo on list: ", listTodo);

    return (
        <div className='container'>
            <TitleSelected selectedMenu={selectedMenu} />
            <AddTodo />
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => handleClickRow(record)
                    };
                }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [selectedRowKey],
                    onChange: (keys) => {

                        const selectedKey = keys[0];
                        const selectedRecord = listTodo.find((item) => item.key === selectedKey);
                        if (selectedRecord) {
                            handleClickRow(selectedRecord);
                        }

                    }
                }}
                columns={columns}
                dataSource={listTodo}
                pagination={false}
                scroll={{
                    x: 0,
                    y: "68vh"
                }}
                style={{ marginTop: '20px' }}
                expandable={{
                    expandedRowRender: (record) => (
                        <div
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description ? record.description :
                                <div style={{ display: 'flex', color: 'red', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <WarningOutlined />Don't have description for this todo
                                </div>
                            }

                        </div>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
            />
            <Modal
                open={open}
                title="Delete"
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        No
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => { dispatch(removeTodo(todoRemove)); setOpen(false); }}>
                        Yes
                    </Button>,
                ]}
            >
                Remove todo: {todoRemove.nameTodo}. Yes or No?
            </Modal>
        </div >
    )
}
export default ListTodo;