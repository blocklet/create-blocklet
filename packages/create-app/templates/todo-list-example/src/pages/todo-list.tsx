import React, { useState, useEffect, type SetStateAction } from 'react';
import './todo-list.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

type Todo = {
  title: string;
  description: string;
  completedOn?: string;
};

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodoList, setCompletedTodoList] = useState<Todo[]>([]);
  const [currentEdit, setCurrentEdit] = useState<number>(-1);
  const [currentEditedItem, setCurrentEditedItem] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...todoList];
    updatedTodoArr.push(newTodoItem);
    setTodoList(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index: number) => {
    let reducedTodo = [...todoList];
    reducedTodo.splice(index);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodoList(reducedTodo);
  };

  const handleComplete = (index: number) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem: Todo = {
      ...(todoList[index] as Todo),
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodoList];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodoList(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index: number) => {
    let reducedTodo = [...completedTodoList];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodoList(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist') ?? '');
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos') ?? '');
    if (savedTodo) {
      setTodoList(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodoList(savedCompletedTodo);
    }
  }, []);

  const handleEdit = (index: number, item: Todo) => {
    console.log(index);
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (title: string) => {
    setCurrentEditedItem((prev: Todo | null) => {
      return { ...prev, title: title } as Todo;
    });
  };

  const handleUpdateDescription = (description: string) => {
    setCurrentEditedItem((prev: Todo | null) => {
      return { ...prev, description } as Todo;
    });
  };

  const handleUpdateToDo = () => {
    let newToDo = [...todoList];
    if (currentEditedItem) {
      newToDo[currentEdit] = currentEditedItem;
    }
    setTodoList(newToDo);
    setCurrentEdit(-1);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            todoList.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit__wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem?.title}
                    />
                    <textarea
                      placeholder="Updated Title"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem?.description}
                    />
                    <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                      <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                      <AiOutlineEdit className="check-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodoList.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
