import React, { useState } from "react";
import { AddTodo } from "../../components/AddTodo";

type Props = {};

type Todo = {
  text: string;
  notes: string;
  completed: boolean;
  deleted: boolean;
};

export default function Index({}: Props) {
  const [todoText, setTodoText] = useState("");
  const [todoNotes, setTodoNotes] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<number>(0);
  const [showError, setShowError] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showDeleteAnimation, setShowDeleteAnimation] = useState(false);

  const handleDelete = (index: number) => {
    // set the deleted property to true

    const newTodos = [...todos];
    newTodos[index].deleted = true;
    setTodos(newTodos);

    setShowDeleteAnimation(true);
    setTimeout(() => {
      setShowDeleteAnimation(false);
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }, 1000);
  };

  const handleClicked = () => {
    setShowError(false);
    if (showAdd === false) {
      setShowAdd(true);
      return;
    }

    if (todoText === "") {
      setShowError(true);
      return;
    }

    let todo = {
      text: todoText,
      notes: todoNotes,
      completed: false,
      deleted: false,
    };
    setTodos([...todos, todo]);
    setTodoText("");
    setShowAdd(false);
  };

  const handleCheck = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleTodoClicked = (index: number) => {
    if (index == selectedTodo) {
      setShowNotes(!showNotes);
      return;
    }

    setSelectedTodo(index);
    setShowNotes(true);
  };

  const showAnimationnow = (index: number) => {
    // show animation only if the todo is not completed
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  return (
    <div
      className="min-w-screen min-h-screen
       bg-gray-800 flex  flex-col items-center justify-center px-5 py-5"
    >
      <div
        style={{ maxWidth: "800px" }}
        className=" relative w-full mx-auto rounded-lg 
          border border-gray-700 p-10 lg:py-12 lg:px-14 text-gray-300"
      >
        {todos.length === 0 && (
          <div className="flex flex-col justify-center items-center  p2 m2  strike ">
            <h1> No Todos </h1>
          </div>
        )}

        {todos.map((todo, index) => (
          <>
            <div
              key={"todo" + index}
              onClick={() => {
                handleTodoClicked(index);
              }}
              className={`todo ${
                showDeleteAnimation && todo.deleted ? "fall" : ""
              }  flex flex-row   cursor-pointer  justify-between   items-center relative    text-gray-300 hover:bg-slate-700`}
            >
              {showAnimation && (
                <div className="at-item absolute bg-slate-400"></div>
              )}

              <div className=" flex flex-row  justify-start   items-center   ">
                <input
                  value={todo.completed}
                  onChange={() => {
                    showAnimationnow(index);

                    handleCheck(index);
                  }}
                  type="checkbox"
                  className="form-checkbox h-5 w-5  text-gray-300  translate-y-1 "
                />
                <h3
                  className={`text-3xl ml-2 ${
                    todo.completed ? "scale-up-center" : ""
                  }`}
                >
                  {todo.text}
                </h3>
              </div>

              <div className="icnon  flex flex-row gap-2  ">
                <svg
                  onClick={() => handleDelete(index)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:fill-red-600 hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </>
        ))}


        {showAdd && (
          <AddTodo
            todoText={todoText}
            setTodoText={setTodoText}
            handleClicked={handleClicked}
            showError={showError}
            setTodoNotes={setTodoNotes}
            setShowAdd={setShowAdd}
            
          />
        )}

        <a
          onClick={handleClicked}
          className="text-4xl rounded-lg  px-2
          absolute bottom-0  left-1/2  -translate-x-1/2 -translate-y-1/5
          hover:border  border-gray-700  "
          href="#"
        >
          +
        </a>
      </div>
    </div>
  );
}
