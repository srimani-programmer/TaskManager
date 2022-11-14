import React, { Component } from "react";
import "./todo.css";

class Todo extends Component {
  apiEndPoint = "http://localhost:7000/api/v1/taskmanager/";
  state = {
    task: "",
    tasks: [],
    taskId: "",
    isEdit: false,
  };

  fetchAllTasks = () => {
    const getEndPoint = this.apiEndPoint + "fetchAllTasks";
    const options = {
      method: "GET",
    };

    fetch(getEndPoint, options)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ tasks: data["tasks"] });
      })
      .catch((err) => console.error(err));
  };

  // Async Method for Inserting Task Item
  insertTask = (taskName) => {
    const postEndPoint = this.apiEndPoint + "addNewTask";

    const obj = { taskName, status: false };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(postEndPoint, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data["task"]) {
          this.fetchAllTasks();
          this.setState({ task: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  // Async Method to delete the task Item
  deleteTask = (id) => {
    const deleteEndPoint = this.apiEndPoint + "deleteTaskItem";
    const obj = {
      id,
    };

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(deleteEndPoint, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data["success"]) {
          this.fetchAllTasks();
        }
      })
      .catch((err) => console.error(err));
  };

  // Async Method to update task item

  updateTaskItem = (id, taskName) => {
    const updateEndPoint = this.apiEndPoint + "updateTaskItem";
    const obj = {
      id,
      taskName,
    };
    console.log(obj);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(updateEndPoint, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data["success"]) {
          this.setState({ taskId: "", task: "" });
          this.fetchAllTasks();
        }
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.fetchAllTasks();
  }

  handleTaskItemContent = (event) => {
    this.setState({ task: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const currentTask = this.state.task;

    if (currentTask.trim() !== "") {
      this.insertTask(currentTask.trim());
    } else {
      alert("Form is Empty");
    }
  };

  handleDelete = (id) => {
    const buttonId = id;

    if (buttonId) {
      this.deleteTask(id);
    }
  };

  handleEdit = (id, taskName) => {
    if (id && taskName) {
      this.setState({ taskId: id, isEdit: true, task: taskName });
    }
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const newTaskName = this.state.task;
    const taskId = this.state.taskId;
    if (newTaskName && taskId) {
      this.updateTaskItem(taskId, newTaskName);
    } else {
      alert("Task should not be empty.!");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="my-3">
          <form
            className="container"
            onSubmit={
              this.state.isEdit ? this.handleUpdate : this.handleFormSubmit
            }
          >
            <div className="row g-3">
              <div className="col">
                <label htmlFor="Task Item" className="form-label title">
                  Task Item
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter the task item"
                  value={this.state.task}
                  onChange={this.handleTaskItemContent}
                />
                {!this.state.isEdit && (
                  <button className="btn btn-primary m-3">Submit</button>
                )}
                {this.state.isEdit && (
                  <button className="btn btn-primary m-3">Update</button>
                )}
              </div>
            </div>
          </form>
          <h4 className="task-list-container">Task List</h4>
          <div className="row list-container">
            <div className="col">
              <ul className="list-group">
                {this.state.tasks &&
                  this.state.tasks.length > 0 &&
                  this.state.tasks.map((task, index) => (
                    <div className="task-item my-2" key={task["_id"]}>
                      <li className="list-group-item task-item-list">
                        {task.taskName}
                      </li>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          this.handleEdit(task["_id"], task.taskName);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => {
                          this.handleDelete(task["_id"]);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Todo;
