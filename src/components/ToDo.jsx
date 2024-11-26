import React, { useState , useEffect } from "react";
import "../ToDo.css";
const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const sendNotification = () => {
      if ("Notification" in window) {
       
        if (Notification.permission === "granted") {
          new Notification("Reminder!", {
            body: "Check Your To Do List",
            
          });
        } else if (Notification.permission !== "denied") {
         
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Reminder!", {
                body: "This is your hourly notification!",
                icon: "https://example.com/icon.png", // Optional
              });
            }
          });
        }
      } else {
        console.log("Notifications API not supported.");
      }
    };

   
    const intervalId = setInterval(() => {
      sendNotification();
    }, 3600000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    if (query.length > 15) {
      alert("Please decrease your length");
    }
    if (query.trim() && query.length < 15) {
      setTasks([...tasks, query]);
      setQuery("");
    }
  };
  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  function moveUpTask(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      let temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = temp;
      setTasks(updatedTasks);
    }
  }

  function moveDownTask(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      let temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index + 1];
      updatedTasks[index + 1] = temp;
      setTasks(updatedTasks);
    }
  }
  return (
    <>
      <h1 className="headerName">To-Do -List</h1>
      <div className="mainTodo ">
        <form id="taskForm" onSubmit={handleSubmit}>
          <input
            id="inputTask"
            name="query"
            value={query}
            placeholder="Enter a Task.."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit" id="Add">
            ADD
          </button>
        </form>

        <ul>
          {tasks.map((task, index) => (
            <li className="listElement" key={index}>
              <span>{task}</span>
              <button onClick={() => handleDelete(index)} className="delBtn">
                Delete
              </button>
              <button onClick={() => moveUpTask(index)} className="moveUpTask">
                👆
              </button>
              <button
                onClick={() => moveDownTask(index)}
                className="moveDownBtn"
              >
                👇
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
