"use client";
import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { TodoProps } from "@/constants/todo.interface";
import { ItemTypes } from "@/constants/itemTypes";
import { deleteTodo, updateTodo } from "@/app-redux/slices/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app-redux/store";
import { Button, Dropdown, Input, MenuProps, Modal } from 'antd';
import { MoreOutlined } from "@ant-design/icons";

const Todo: React.FC<TodoProps> = ({id, name, status}) => {

  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: {id, name, status},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const handleDeleteOk = () => {
    dispatch(deleteTodo(id));
    setDeleting(false);
  };

  const handleDelete = () => {
    if (editing) {
      setInputValue(name);
      setEditing(false);
    } else {
      setDeleting(true);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const handleEdit = () => {
    if (deleting) {
      setDeleting(false);
    } else {
      setEditing(true);
    }
  }

  const handleEditOk = () => {
    if (editing && inputValue.trim() !== '' && inputValue.trim() !== name) {
      dispatch(updateTodo({
        id,
        name: inputValue.trim(),
        status,
      }));
    } else {
      setInputValue(name);
    }
    setEditing(!editing);
  }

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleDeleteCancel = () => {
    setDeleting(false);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
    },
    {
      label: 'Delete',
      key: '2',
    },
  ];

  const onClickMenu: MenuProps['onClick'] = ({key}) => {
    switch (key) {
      case '1':
        handleEdit();
        break;
      case '2':
        handleDelete();
        break;
      default:
        break;
    }
  };

  const ref = useRef(null);
  drag(ref);

  return (
    <div ref={ref}
         style={{
           opacity: isDragging ? 0.5 : 1,
           display: 'flex',
           justifyContent: 'space-between',
           margin: '5px',
         }}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        disabled={!editing}
        style={{
          backgroundColor: 'white',
          color: 'black',
          cursor: 'default',
          marginRight: '2px',
        }}
      />
      <Dropdown menu={{items, onClick: onClickMenu}} trigger={['click']}>
        <Button type='text'
                style={{
                  padding: '4px 4px',
                }}>
          <MoreOutlined style={{padding: '4px 4px',}}/>
        </Button>
      </Dropdown>
      <Modal
        title="Edit Todo"
        open={editing}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </Modal>
      <Modal
        title="Confirm Delete"
        open={deleting}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
};

export default Todo;
