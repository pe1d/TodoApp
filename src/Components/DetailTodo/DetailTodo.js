import React, { useEffect, useState } from "react";
import { Checkbox, Layout, Button, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeCollapseDetailTodo } from "../../Redux/Slices/appSlice";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { getListTodoGroup } from "../../Redux/Slices/todoSlice";

const { TextArea } = Input;
const DetailTodo = () => {
  const { collapseDetailTodo, todoSelection } = useSelector((state) => ({
    collapseDetailTodo: state.app.collapseDetailTodo,
    todoSelection: state.todo.todoSelection
  }))
  //console.log("Check todo selection:", !todoSelection.keyGroup);
  const [todoSelectionState, setTodoSelectionState] = useState({});
  const { listTodoGroup } = useSelector((state) => ({
    listTodoGroup: state.todo.listTodoGroup
  }))
  //console.log('Check change group: ', chageGroup);
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchListTodoGroup() {
      dispatch(getListTodoGroup())
    }
    fetchListTodoGroup()
    setTodoSelectionState(todoSelection)
  }, [todoSelection])
  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }
  const onChangeDescirption = (e) => {
    //console.log('Change:', e.target.value);
    setTodoSelectionState({ ...todoSelectionState, description: e.target.value })
  }
  const onChangeSelect = (value) => {
    //console.log("check e: ", value);

    setTodoSelectionState({ ...todoSelectionState, keyGroup: value })
  }
  //console.log("check todo: ", todoSelectionState);
  return (
    <Layout.Sider
      className="sidebar-right"
      //breakpoint={"lg"}
      width={300}
      theme="light"
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={collapseDetailTodo}
      defaultCollapsed={true}
      onCollapse={(value) => dispatch(changeCollapseDetailTodo(value))}
    >
      <div className="container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Checkbox onChange={onChangeCheckBox} /><Input value={todoSelectionState.nameTodo} variant="borderless" />
          <div style={{ cursor: 'pointer' }} onClick={() => setTodoSelectionState({ ...todoSelectionState, important: !todoSelectionState.important })}>
            {!todoSelectionState.important ? <StarOutlined style={{ color: "#1677ff", fontSize: '1.2rem' }} /> : <StarFilled style={{ color: "#1677ff", fontSize: '1.2rem' }} />}
          </div>

        </div>
        {/* Change Group */}
        <div>
          <Select
            value={todoSelectionState.keyGroup}
            showSearch
            placeholder="Select a todo group"
            optionFilterProp="label"
            style={{ width: '100%' }}
            onChange={onChangeSelect}
            options={(listTodoGroup || []).map((item) => ({
              value: item.keyGroup,
              label: item.nameGroup,
            }))}
          >
          </Select>
        </div>
        {/* Change description */}
        <div>
          <TextArea
            value={todoSelectionState.description}
            showCount
            maxLength={100}
            onChange={onChangeDescirption}
            placeholder="Descirption"
            style={{
              height: 120,
              resize: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', gap: '10px', marginTop: 15 }}>
          <Button type={todoSelectionState.complete ? "dashed" : "primary"} size="middle">
            {todoSelectionState.complete ? "UnCompelete" : "Compelete"}
          </Button>
          <Button type={todoSelectionState.complete ? "dashed" : "primary"} size="middle">
            Update
          </Button>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default DetailTodo;