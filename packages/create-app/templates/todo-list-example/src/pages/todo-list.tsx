/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './todo-list.css';
import { nanoid } from 'nanoid';
import isEmpty from 'lodash/isEmpty';
import type { AxiosResponse } from 'axios';
import { useSessionContext } from '../contexts/session';
import RequiredLogin from './required-login';
import axios from '../libs/api';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  updatedAt: string;
};
type FilterType = 'all' | 'uncompleted' | 'completed';

function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [editTaskId, setEditTaskId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { session } = useSessionContext();

  // Step 3: get data from DID Spaces
  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<{ todoList: [] }, any> = await axios.get('/api/todo-list');
      setTodoList(response.data.todoList);
    } catch (error) {
      console.error(error);
      setTodoList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  // Step 4: write data to DID Spaces
  const putTodoList = (todoArray: Todo[]) => {
    return axios.put('/api/todo-list', {
      todoList: todoArray,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTask = async () => {
    if (isEmpty(todoTitle)) {
      return;
    }

    try {
      setLoading(true);
      const newTodoList = [
        ...todoList,
        {
          id: nanoid(),
          title: todoTitle,
          completed: false,
          updatedAt: new Date().toISOString(),
        },
      ];
      await putTodoList(newTodoList);
      setTodoList(newTodoList);
      setTodoTitle('');
      toast.success('Task added successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCheckboxChange = async (taskId: string) => {
    const currentTodoList = todoList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTodoList(currentTodoList);
    await putTodoList(currentTodoList);
  };

  const handleDeleteTask = async (taskId: string) => {
    const currentTodoList = todoList.filter((task) => task.id !== taskId);
    setTodoList(currentTodoList);
    await putTodoList(currentTodoList);
    toast.success('Task deleted successfully');
  };

  const handleEditTask = (taskId: string) => {
    setEditTaskId(taskId);
    const taskToEdit = todoList.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTodoTitle(taskToEdit.title);
    }
  };

  const handleUpdateTask = async () => {
    if (isEmpty(todoTitle)) {
      return;
    }

    try {
      const updatedTodo = {
        title: todoTitle,
      };

      const currentTodoList = todoList.map((task) =>
        task.id === editTaskId ? { ...task, title: updatedTodo.title } : task
      );
      setTodoList(currentTodoList);
      await putTodoList(currentTodoList);
      setTodoTitle('');
      setEditTaskId('');
      toast.success('Task updated successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleCompleteAll = async () => {
    const currentToList = todoList.map((task) => ({ ...task, completed: true }));
    setTodoList(currentToList);
    await putTodoList(currentToList);
  };
  const handleClearCompleted = async () => {
    const currentToList = todoList.filter((task) => !task.completed);
    setTodoList(currentToList);
    await putTodoList(currentToList);
  };
  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = todoList
    .filter((task) => {
      if (filterType === 'all') {
        return true;
      }
      if (filterType === 'completed') {
        return task.completed;
      }
      if (filterType === 'uncompleted') {
        return !task.completed;
      }
      return true;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  if (!session.user) {
    return <RequiredLogin />;
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="todo-app">
        <h2>Todo List</h2>
        <div className="row">
          <i className="fas fa-list-check" />
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your todo"
            autoFocus
            value={todoTitle}
            onChange={handleInputChange}
          />
          <button type="button" id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTask} disabled={loading}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="mid">
          <i className="fas fa-check-double" />
          <p id="complete-all" onClick={handleCompleteAll}>
            Complete all todo
          </p>
          <p id="clear-all" onClick={handleClearCompleted}>
            Delete comp todo
          </p>
        </div>

        <ul id="list">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                data-id={task.id}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => handleTaskCheckboxChange(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="edit"
                  data-id={task.id}
                  onClick={() => handleEditTask(task.id)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  data-id={task.id}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="filters">
          <div className="dropdown">
            <button type="button" className="dropbtn">
              Filter
            </button>
            <div className="dropdown-content">
              <a href="#" id="all" onClick={() => handleFilterTypeChange('all')}>
                All
              </a>
              <a href="#" id="rem" onClick={() => handleFilterTypeChange('uncompleted')}>
                Uncompleted
              </a>
              <a href="#" id="com" onClick={() => handleFilterTypeChange('completed')}>
                Completed
              </a>
            </div>
          </div>
          <div className="completed-task">
            <p>
              Completed: <span id="c-count">{todoList.filter((task) => task.completed).length}</span>
            </p>
          </div>
          <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: <span id="tasks-counter">{todoList.length}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
