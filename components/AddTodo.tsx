import React, { useEffect, useRef } from "react";

type TodoProps = {
  setTodoText: (text: string) => void;
  setTodoNotes: (text: string) => void;
  setShowAdd: (show: boolean) => void;
  handleClicked: () => void;
  todoText: string;
  showError: boolean;
};

export function AddTodo({
  handleClicked,
  setTodoNotes,
  setTodoText,
  setShowAdd,
  showError,
}: TodoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className=" flex flex-col  mt-1 text-black  bg-gray-700  text-gray-300   p-1 mr-1   rounded-sm   ">
      <input
        className="text-md w-full bg-transparent text-gray-300 leading-none focus:outline-none mb-2"
        ref={inputRef}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleClicked();
          }
        }}
        placeholder="Add Todo"
      />

      {showError && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          Task Text is invalid !
        </span>
      )}

      <textarea
        className="  text-md bg-transparent text-gray-300   outline-none "
        placeholder="Notes"
        onChange={(e) => {
          setTodoNotes(e.target.value);
        }}
      ></textarea>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 self-end cursor-pointer  hover:scale-125"
        onClick={() => {
            setShowAdd(false);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </div>
  );
}
