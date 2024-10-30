
import IconRender from "../../Icon/IconRender"
import { CheckOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Typography, Input, Modal, Button } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getListTodo, removeTodoGroup, updateTodoGroup } from "../../../Redux/Slices/todoSlice"
import { changeSelectedMenu } from "../../../Redux/Slices/appSlice"
const { Title } = Typography;
const TitleSelected = ({ selectedMenu }) => {
    const [editTitleGroup, setEditTitleGroup] = useState(false)
    const [groupEditName, setGroupEditName] = useState('')
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const handleClickUpdateNameTodoGroup = () => {
        dispatch(updateTodoGroup({ keyGroup: selectedMenu.keyGroup, nameGroup: groupEditName }))
        dispatch(changeSelectedMenu({ ...selectedMenu, nameGroup: groupEditName }))
        setEditTitleGroup(false)
    }
    const handleClickDeleteTodo = () => {
        dispatch(removeTodoGroup(selectedMenu));
        setOpen(false);
        dispatch(getListTodo())
    }
    useEffect(() => {
        if (selectedMenu.nameGroup) {
            setGroupEditName(selectedMenu.nameGroup)
        }
        setEditTitleGroup(false)
    }, [selectedMenu])
    return (
        <>
            <Title level={2} style={{ color: "#1677ff", display: 'flex', gap: '20px' }}>
                {selectedMenu && selectedMenu.icon ?
                    <div >
                        <IconRender selectedIcon={selectedMenu.icon} />  {selectedMenu.label}
                    </div>
                    :
                    <div style={{ display: 'flex', gap: 10 }}>
                        <UnorderedListOutlined />
                        {!editTitleGroup ?
                            selectedMenu.nameGroup
                            :
                            <Input value={groupEditName} onChange={(e) => setGroupEditName(e.target.value)} />}
                        {editTitleGroup ?
                            <CheckOutlined style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => handleClickUpdateNameTodoGroup()} />
                            :
                            <EditOutlined style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => setEditTitleGroup(true)} />
                        }
                        <DeleteOutlined onClick={() => setOpen(true)} style={{ fontSize: '18px', cursor: 'pointer' }} />
                    </div>
                }
            </Title>
            <Modal
                open={open}
                title={"Delete"}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        No
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => handleClickDeleteTodo()}>
                        Yes
                    </Button>,
                ]}
            >
                Delete todo group: <strong>{selectedMenu.nameGroup}</strong>! Yes or no?
            </Modal >
        </>

    )

}
export default TitleSelected