import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo, setForm } from "../redux/todo.slice";

function FormModal() {
  const dispatch = useDispatch();
  const title = useRef(null);
  const description = useRef(null);

  const createTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      task: title.current.value,
      description: description.current.value,
    };

    try {
        const response = await axios.post("http://localhost:3004/pending", newTodo);
        dispatch(addTodo(response.data)); // Update the store with the new todo
        dispatch(setForm(false)); // Close the form
      } catch (error) {
        console.error("Error creating todo:", error);
      }
  };

  return (
    <>
      {/* Main modal */}
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-gray-500 p-6 bg-opacity-75 transition-opacity"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md m-auto my-20 p-6">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Todo
            </h3>
            <button
              type="button"
              onClick={() => dispatch(setForm(false))}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4">
            <form className="space-y-4" onSubmit={createTodo}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  ref={title}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter a Title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  ref={description}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the description for Todo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Todo
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModal;
