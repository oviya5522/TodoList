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
    <div className="flex gap-70">
      <div className="flex  justify-start  items-start">
        <img src="todo1.png" alt="Logo" className=" w-55 h-auto" />
      </div>
      <div className=" flex justify-center items-center flex-col   mt-17">
        <p className="text-2xl  font-mono font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-600 to-red-400 ">
          Effortlessly Manage Your Tasks with Love
        </p>
        <div className=" flex  flex-col mt-10">
          <div className="flex text-lg gap-5">
            <input
              type="text"
              placeholder="What’s on your mind?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-lg w-100 bg-red-100 rounded-lg pl-4 shadow-xl inset-shadow-sm inset-shadow-red-300"
            />

            {btn ? (
              <button
                onClick={saveItem}
                className="w-27 bg-cyan-100  p-2 shadow-xl shadow-lg shadow-cyan-500/50 text-gray-600 text-lg cursor-pointer hover:bg-cyan-200"
              >
                Save
              </button>
            ) : (
              <button
                onClick={addItem}
                className="w-27 bg-green-100 p-2 shadow-xl shadow-lg shadow-blue-500/50 text-gray-600 text-lg cursor-pointer hover:bg-green-200"
              >
                Add
              </button>
            )}
          </div>

          <div className=" flex flex-col gap-4 mt-10 max-h-120 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-xl text-gray-500 text-center">
                No tasks are added yet
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className=" flex justify-between shadow-md bg-red-50 border border-gray-300 p-3 rounded-lg text-lg text-gray-600"
                >
                  <p
                    style={{
                      textDecoration: doneItems.includes(item)
                        ? "line-through"
                        : "none",
                    }}
                    className="max-w-[350px] max-h-[50]  h-auto overflow-y-auto  "
                  >
                    {item}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => done(item)}
                      className="bg-blue-500 text-white p-2 rounded-md shadow-lg shadow-cyan-500/50 cursor-pointer hover:bg-blue-400"
                    >
                      {doneItems.includes(item) ? (
                        <FaRedo />
                      ) : (
                        <MdOutlineDoneAll />
                      )}
                    </button>
                    <button
                      onClick={() => editItems(item, index)}
                      className="bg-yellow-500 text-white p-2 rounded-md ml-2 shadow-lg shadow-yellow-500/50 cursor-pointer hover:bg-yellow-400"
                    >
                      <RiEdit2Fill />
                    </button>
                    <button
                      onClick={() => deleteItems(index)}
                      className="bg-red-500 text-white p-2 rounded-md ml-2 shadow-lg shadow-red-500/50 cursor-pointer hover:bg-red-400"
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
    </div>
  );
};

export default TodoList;
