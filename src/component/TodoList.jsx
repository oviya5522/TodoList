import React, { useEffect, useState } from "react";
import { RiChatDeleteFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { FaRedo } from "react-icons/fa";
import { MdOutlineDoneAll } from "react-icons/md";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [btn, setBtn] = useState(false);
  const [editId, setEditId] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    const locallySavedItems = JSON.parse(localStorage.getItem("Items"));
    const locallySavedIDonetems = JSON.parse(localStorage.getItem("DoneItems"));
    if (locallySavedItems) {
      setItems(locallySavedItems);
      if (locallySavedIDonetems) {
        setDoneItems(locallySavedIDonetems);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("Items", JSON.stringify(items));
    }
    if (doneItems.length > 0) {
      localStorage.setItem("DoneItems", JSON.stringify(doneItems));
    }
  }, [items, doneItems]);
  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput("");
    }
  };
  const deleteItems = (id) => {
    let cleared = items.filter((item, index) => {
      return index !== id;
    });
    setItems(cleared);

    if (cleared.length === 0) {
      setDoneItems([]);
      localStorage.setItem("Items", JSON.stringify([]));
      localStorage.setItem("DoneItems", JSON.stringify([]));
    } else {
      localStorage.setItem("Items", JSON.stringify(cleared));
      localStorage.setItem("DoneItems", JSON.stringify(doneItems));
    }
  };

  const editItems = (item, index) => {
    setInput(item);
    setBtn(true);
    setEditId(index);
  };
  const saveItem = () => {
    const updateValue = [...items];
    updateValue[editId] = input;
    setItems(updateValue);
    setBtn(false);
    setEditId(null);
    setInput("");
  };
  const done = (item) => {
    const updatedDoneItems = [...doneItems];

    if (updatedDoneItems.includes(item)) {
      const newDoneItems = updatedDoneItems.filter(
        (doneItem) => doneItem !== item
      );
      setDoneItems(newDoneItems);
      localStorage.setItem("DoneItems", JSON.stringify(newDoneItems));
    } else {
      updatedDoneItems.push(item);
      setDoneItems(updatedDoneItems);
      localStorage.setItem("DoneItems", JSON.stringify(updatedDoneItems));
    }
  };
  return (
   <div className="flex flex-col md:flex-row md:gap-16 gap-8 p-4">
  {/* Logo  */}
  <div className="flex justify-center md:justify-start items-start">
    <img src="todo1.png" alt="Logo" className="w-40 md:w-55 h-auto" />
  </div>

  {/* Main Content */}
  <div className="flex justify-center items-center flex-col mt-6 md:mt-17 w-full">
    <p className="text-xl md:text-2xl font-mono font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-600 to-red-400 px-2">
      Effortlessly Manage Your Tasks with Love
    </p>

    {/* Input and Button */}
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full max-w-lg">
      <input
        type="text"
        placeholder="What’s on your mind?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-base md:text-lg w-full sm:flex-1 bg-red-100 rounded-lg pl-4 py-2 shadow-md"
      />

      {btn ? (
        <button
          onClick={saveItem}
          className="w-full sm:w-28 bg-cyan-100 p-2 shadow-lg text-gray-600 text-base md:text-lg cursor-pointer hover:bg-cyan-200 rounded-lg"
        >
          Save
        </button>
      ) : (
        <button
          onClick={addItem}
          className="w-full sm:w-28 bg-green-100 p-2 shadow-lg text-gray-600 text-base md:text-lg cursor-pointer hover:bg-green-200 rounded-lg"
        >
          Add
        </button>
      )}
    </div>

    {/* Task List */}
    <div className="flex flex-col gap-4 mt-8 w-full max-w-lg max-h-80 overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-lg md:text-xl text-gray-500 text-center">
          No tasks are added yet
        </p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 
             shadow-md bg-red-50 border border-gray-300 p-3 rounded-lg text-base md:text-lg text-gray-600
             hover:bg-red-100 transition duration-200"
          >
            <p
              style={{
                textDecoration: doneItems.includes(item) ? "line-through" : "none",
              }}
              className="max-w-full sm:max-w-[350px] break-words"
            >
              {item}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 self-end sm:self-auto">
              <button
                onClick={() => done(item)}
                className="bg-blue-500 text-white p-2 rounded-md shadow-lg cursor-pointer hover:bg-blue-400"
              >
                {doneItems.includes(item) ? <FaRedo /> : <MdOutlineDoneAll />}
              </button>
              <button
                onClick={() => editItems(item, index)}
                className="bg-yellow-500 text-white p-2 rounded-md shadow-lg cursor-pointer hover:bg-yellow-400"
              >
                <RiEdit2Fill />
              </button>
              <button
                onClick={() => deleteItems(index)}
                className="bg-red-500 text-white p-2 rounded-md shadow-lg cursor-pointer hover:bg-red-400"
              >
                <RiChatDeleteFill />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

  );
};

export default TodoList;
