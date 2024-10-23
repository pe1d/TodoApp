import { BellOutlined, ReloadOutlined,CalendarOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input } from 'antd';
import { useState } from 'react';


const AddTodo = ({onClick})=>{
    const [dateAction, setDateAction] = useState(false);
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };
    return(
        <>
            <div className='container' style={{ backgroundColor:"#f0f0f0", borderRadius:'10px', marginTop:'20px'}}>
                <div className='add-new-todo'>
                    <Input placeholder='Add a task'></Input>
                </div>
                <div style={{padding:'10px',display:'flex',justifyContent:'space-between'}} direction="horizontal">
                    <div style={{display:'flex',gap:'20px'}} className='option'>
                        <CalendarOutlined style={dateAction ? {color:'#1677ff'} :{}} onClick={()=>setDateAction(!dateAction)}/>
                        {dateAction === true && <DatePicker onChange={onChange}/> }
                        <BellOutlined></BellOutlined>
                        <ReloadOutlined/>
                        <p style={{cursor:'pointer'}}>More detail</p>
                    </div>
                    <div className='btn-add'> 
                        <Button>Add</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddTodo;