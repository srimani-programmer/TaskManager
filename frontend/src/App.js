import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const apiEndpoint = "http://localhost:7000/api/v1/taskmanager/fetchAllTasks/";
  const sendRequest = 'http://localhost:7000/api/v1/taskmanager/addNewTask';

  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [author, setAuthor] = useState("");
  const [priority, setPriority] = useState("high");
  const [status, setStatus] = useState(false);

  const fetchData = async () => {
    const options = {
      method: 'GET'
    };

    fetch(apiEndpoint, options).then(response => response.json()).then(data => {

      if (data && data['tasks']) {
        setData(prevState => {
          return data['tasks'];
        });
      }
    }).catch(err => console.log(err))
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateTaskItem = (e) => {
    setTask(prevState => e.target.value);
  };

  const updateAuthorName = (e) => {
    setAuthor(prevState => e.target.value);
  }

  const updatePriority = (e) => {
    setPriority(prevState => e.target.value);
  }

  const updateStatus = (e) => {
    setStatus(prevState => {
      if (e.target.value === 'yes') {
        return true;
      }

      return false;
    })
  }

  const addTaskItem = (e) => {
    e.preventDefault();

    const obj = {
      "author": author,
      "taskName": task,
      "priority": priority,
      "status": status
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    };

    console.log(JSON.stringify(obj));
    setAuthor(prevState => "");
    setTask(prevState => "");

    fetch(sendRequest, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchData();
      })
      .catch(err => { console.error(err); })

  }
  return (
    <div className="App">
      <form>
        <label htmlFor="taskItem">Task Item</label>
        <input type="text" onKeyPress={updateTaskItem} value={task} />
        <br />
        <label htmlFor="taskItem">Author Name</label>
        <input type="text" onKeyPress={updateAuthorName} value={author} />
        <br />
        <label htmlFor="taskItem">Priority</label>

        <select onChange={updatePriority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <br />
        <label htmlFor="taskItem">is Work Done?</label>
        <select onChange={updateStatus}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <br />
        <button onClick={addTaskItem}>Add Task</button>
      </form>
      <hr />
      {data && data.map(item => {
        return <p key={item['_id']}>{item['taskName']} - {item['author']}</p>
      })}
    </div>
  );
}

export default App;
