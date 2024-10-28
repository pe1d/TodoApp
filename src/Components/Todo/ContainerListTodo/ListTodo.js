import { Table } from 'antd';
import AddTodo from '../AddTodo';
import Icon, { StarOutlined, StarFilled, CheckCircleTwoTone, UnorderedListOutlined, WarningOutlined } from '@ant-design/icons';
import { Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollapseDetailTodo } from '../../../Redux/Slices/appSlice';
import { addTodoSelection, getListTodo, removeTodo, updateTodo } from '../../../Redux/Slices/todoSlice';
import { useEffect, useState } from 'react';
import { stateListTodo, stateSelectTodo } from '../../../Redux/selector/todoSelector';
import IconRender from '../../Icon/IconRender';
import { stateCollapseDetailTodo, stateSelectedMenu } from '../../../Redux/selector/appSelector';

const { Title } = Typography;
const ListTodo = () => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector(stateSelectedMenu)
    const collapseDetailTodo = useSelector(stateCollapseDetailTodo)
    const listTodo = useSelector(stateListTodo)
    const todoSelection = useSelector(stateSelectTodo)
    const [selectedRowKey, setSelectedRowKey] = useState("")
    useEffect(() => {
        dispatch(getListTodo())
    }, [])
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
                            Delete
                        </Button>
                    </div>
                )
            },
        },
    ]
    const hanldeClickBtnUpdateCom = (event, record) => {
        event.stopPropagation();
        dispatch(updateTodo({ id: record.key, todoUpdate: { ...record, complete: !record.complete } }))
    }
    const hanldeClickDelete = (event, record) => {
        event.stopPropagation();
        console.log("Click delete record", record);
        dispatch(removeTodo(record))
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
    return (
        <div className='container'>
            <Icon type="message" style={{ fontSize: '16px', color: '#08c' }} theme="outlined"></Icon>
            <Title level={2} style={{ color: "#1677ff", display: 'flex', gap: '20px' }}>
                {selectedMenu && selectedMenu.icon ?
                    <div >
                        <IconRender selectedIcon={selectedMenu.icon} />  {selectedMenu.label}
                    </div>
                    :
                    <div>
                        <UnorderedListOutlined />  {selectedMenu.nameGroup}
                    </div>
                }

            </Title>
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
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description ? record.description :
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <WarningOutlined />Don't have description for this todo
                                </div>
                            }

                        </p>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
            />
        </div>
    )
}
export default ListTodo;