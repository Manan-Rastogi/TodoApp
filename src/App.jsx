import { useState } from "react";
import Navbar from "./components/Navbar";

// 23:29

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100  rounded-xl py-5 px-10 my-5 min-h-[80vh] flex flex-col items-center gap-20">
        <div className="addTodo flex flex-col gap-5 items-center">
          <h2 className="font-bold text-2xl">Add a TODO</h2>
          <div className="createTodo flex gap-10 justify-center">
            <input type="text" className="w-[40vw] rounded-md" />
            <button
              type="submit"
              className="rounded-md bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-3"
            >
              Add
            </button>
          </div>
        </div>


        <div className="todos flex flex-col gap-10 items-center">
        <h2 className="font-bold text-2xl">Your TODOs</h2>
          <div className="todo flex justify-evenly items-center gap-10">
            <div className="todoText font-semibold">Todo Aim to Accomplish</div>
            <div className="actions flex gap-5">
              <button className="edit rounded-md bg-purple-700 hover:bg-purple-900 text-white font-bold py-1 px-2">
                Edit
              </button>
              <button className="delete rounded-md bg-purple-700 hover:bg-purple-900 text-white font-bold py-1 px-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
