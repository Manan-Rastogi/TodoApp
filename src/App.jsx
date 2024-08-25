import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [showFinished, setshowFinished] = useState(true);

  // Initialize todos with data from local storage
  const [todos, setTodos] = useState(() => {
    const dataString = localStorage.getItem("todos");
    return dataString ? JSON.parse(dataString) : [];
  });
  const [add, setAdd] = useState("Add");

  // Function to save todos to localStorage
  const saveToLS = (items) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  // Load todos from localStorage on component mount
  useEffect(() => {
    const dataString = localStorage.getItem("todos");

    if (dataString) {
      const savedTodos = JSON.parse(dataString);
      setTodos(savedTodos);
    }
  }, []);

  // Update localStorage whenever todos state changes
  useEffect(() => {
    saveToLS(todos);
  }, [todos]);

  const toogleFinished = () => {
    setshowFinished(!showFinished);
  };

  // Function to handle adding or updating todos
  const handleAdd = (e) => {
    if (add === "Update") {
      const updatedTodos = [...todos];
      updatedTodos[updateIndex].todo = todo;
      setTodos(updatedTodos);
      setAdd("Add");
      setUpdateIndex(-1);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo(""); // Clear input field after adding or updating
  };

  // Function to handle input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Function to handle checkbox toggle
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // Function to handle editing a todo
  const handleEdit = (e, id) => {
    const index = todos.findIndex((item) => item.id === id);
    setUpdateIndex(index);
    setTodo(todos[index].todo);
    setAdd("Update");
  };

  // Function to handle deleting a todo
  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto bg-violet-100 rounded-xl py-5 md:px-10 md:my-5 md:min-h-[80vh] flex flex-col items-center gap-20 text-[10px] md:text-base">
        <div className="addTodo flex flex-col gap-5 items-center w-full">
          <h2 className="font-bold text-2xl">Add a TODO</h2>
          <div className="createTodo flex gap-10 justify-center w-full">
            <input
              type="text"
              className="w-[60vw] md:w-[40vw] rounded-md bg-purple-200 pl-2"
              onChange={handleChange}
              value={todo}
            />
            <button
              type="submit"
              className="rounded-md disabled:bg-purple-400 bg-purple-700 hover:bg-purple-900 text-white font-bold py-1 px-1 md:px-2"
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              {add}
            </button>
          </div>
        </div>

        <div className="todos flex flex-col gap-2 items-center w-3/4">
          <div className="flex justify-center items-center gap-1 md:gap-3">
            <input
              type="checkbox"
              className="finished"
              onChange={toogleFinished}
              checked={showFinished}
            />{" "}
            Show Finished
          </div>
          <h2 className="font-bold text-2xl">Your TODOs</h2>
          {todos.length === 0 && (
            <div className="font-bold">No todos to display</div>
          )}
          {/* Rendering todo list */}
          {todos.map(
            (item) =>
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between items-center w-full md:w-[40vw] bg-purple-200 p-2 rounded-md gap-2"
                >
                  <div className="mainContent flex items-center gap-2">
                    <input
                      name={item.id}
                      checked={item.isCompleted}
                      type="checkbox"
                      className="isDone"
                      onChange={handleCheckbox}
                    />
                    <div
                      className={
                        item.isCompleted
                          ? "todoText line-through"
                          : "todoText font-semibold text-clip"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="actions flex gap-2">
                    <button
                      className="edit rounded-md bg-purple-700 hover:bg-purple-900 text-white font-bold py-1 px-1 md:px-2 "
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete rounded-md bg-purple-700 hover:bg-purple-900 text-white font-bold py-1 px-1 md:px-2"
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
