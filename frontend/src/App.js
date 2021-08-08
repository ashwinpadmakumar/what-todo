import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const socket = 'localhost:8080'

function App() {

    const [todoList, setTodoList] = useState([{}])

    useEffect(() => {
        axios.get(`http://${socket}/api/todo`)
            .then(res => setTodoList(res.data))
    });

    return (
        <div className="App list-group-item justify-content-center align-items-center mx-auto"
             style={{"width": "400px", "backgroudColour": "white", "marginTop": "15px"}}>
            <h1 className="card text-white bg-primary mb-1"
                styleName="max-width: 20rem;">
                What ToDo !
            </h1>
            <h6 className="card text-white bg-primary mb-3">
                Track your items here
            </h6>
            <div className="card-body">
                <h5 className="card text-white bg-dark mb-3">
                    Add your task
                </h5>
                <div>
                    <InputView/>
                </div>
                <h5 className="card text-white bg-dark mb-3">
                    Your Tasks
                </h5>
                <div>
                    <TodoView todoList={todoList}/>
                </div>
            </div>
            <h6 className="card text-dark bg-warning py-1 mb-0">Copyright 2021, All rights reserved &copy;</h6>
        </div>
    )
}


function InputView() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addTodoHandler = () => {
        axios.post(`http://${socket}/api/todo`, {'title': title, 'description': description})
            .then(res => console.log(res))
    }

    return (
        <span className="card-text">
            <input className="mb-2 form-control titleIn"
                           onChange={event => setTitle(event.target.value)}
                           placeholder='Title'/>
            <input className="mb-2 form-control desIn"
                           onChange={event => setDescription(event.target.value)}
                           placeholder='Description'/>
            <button className="btn btn-outline-primary mx-2 mb-3"
                            style={{"borderRadius": "50px", "font-weight": "bold"}}
                            onClick={addTodoHandler}>
                Add Task
            </button>
        </span>
    )
}

function TodoView(props) {
    return (
        <div>
            <ul>
                {props.todoList.map(todo => <TodoItem todo={todo}/>)}
            </ul>
        </div>
    )
}


function TodoItem(props) {

    const deleteTodoHandler = (title) => {
        axios.delete(`http://${socket}/api/todo/${title}`)
            .then(res => console.log(res.data))
    }

    return (
        <div>
            <p>
                <span style={{fontWeight: 'bold, underline'}}>
                    {props.todo.title} :  {props.todo.description}
                </span>

                <button onClick={() => deleteTodoHandler(props.todo.title)}
                        className="btn btn-outline-danger my-2 mx-2"
                        style={{'borderRadius': '50px'}}>
                    X
                </button>
            </p>
        </div>
    )
}

export default App;
