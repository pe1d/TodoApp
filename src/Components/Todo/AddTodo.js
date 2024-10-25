import { StarOutlined, StarFilled, ReloadOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { addNewTodo } from '../../Redux/Slices/todoSlice';
//{ key: 18, nameTodo: 'Todo 18', dateCreate: "", dateTo: '09/10/2024', important: true, complete: false, description: "description todo 1", keyGroup: "" },
const AddTodo = ({ onClick }) => {
    const [dateAction, setDateAction] = useState(false);
    const [todo, setTodo] = useState({
        key: 't-' + (new Date().getTime().toString()),
        nameTodo: '',
        dateCreate: moment().format('YYYY-MM-DD HH:mm:ss'),
        dateTo: '',
        important: false,
        complete: false,
        description: '',
        keyGroup: ''
    })
    const dispatch = useDispatch()
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setTodo({ ...todo, dateTo: dateString })
    };
    //console.log("check todo", todo);
    const handleClickbtnAddTodo = () => {
        if (!todo.nameTodo) {
            alert("Todo name is required value!")
            return
        }
        if (!todo.dateTo) {
            alert("Due date is required value!")
            return
        }
        dispatch(addNewTodo(todo));
    }
    return (
        <>
            <div className='container' style={{ backgroundColor: "#f0f0f0", borderRadius: '10px', marginTop: '20px' }}>
                <div className='add-new-todo'>
                    <Input onChange={(e) => setTodo({ ...todo, nameTodo: e.target.value })} value={todo.nameTodo} placeholder='Add a task'></Input>
                </div>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }} direction="horizontal">
                    <div style={{ display: 'flex', gap: '20px' }} className='option'>
                        <CalendarOutlined style={dateAction ? { color: '#1677ff' } : {}} onClick={() => setDateAction(!dateAction)} />
                        {dateAction === true &&
                            <DatePicker showTime minDate={dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')} onChange={onChange} />
                        }
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            onClick={() => setTodo({ ...todo, important: !todo.important })}>
                            {!todo.important ? <StarOutlined /> : <StarFilled style={{ color: "#1677ff", fontSize: '1.2rem' }} />}
                        </div>
                        <ReloadOutlined />
                        <p style={{ cursor: 'pointer' }}>Add description</p>
                    </div>
                    <div className='btn-add'>
                        <Button onClick={() => handleClickbtnAddTodo()}>Add</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddTodo;