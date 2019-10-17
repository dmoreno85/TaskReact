import React from 'react';
import './Tareas.css';
import Tarea from './Tarea.jsx'
import GenerateID from '../services/generateID.js'


class Tareas extends React.Component {
    constructor(props) {
        super(props);
        const inicial = {
            newTask: "",
            tasks: [],
        };
        this.state = JSON.parse(localStorage.getItem('TaskState')) || inicial
    }

    saveToLocalStorage = () => {
        localStorage.setItem('TaskState', JSON.stringify(this.state));
    };

    addTasks = (text) => {
        this.text = text.trim();
        // console.log('add task')
        if (text) {
            const newCont = {

                color: 'transparent',
                text: text,
                completed: false,
                id: GenerateID(),
            };
            this.setState({
                newTask: "",
                tasks: [newCont, ...this.state.tasks],
            }, this.saveToLocalStorage)
        }
    };

    keyPress = (event) => {

        if (event.key === 'Enter') {

            this.addTasks(this.state.newTask);
        };
    };

    completedTask = (task) => {
        console.log('completed')
        task.completed = !task.completed;
        this.setState({ task: this.state.tasks.map(item => item.id === task.id ? task : item) })//repasar esta linea
    }

    deletedTask = id => {
        // console.log()
        this.setState(
            {
                tasks: this.state.tasks.filter(task => task.id !== id),//repasar esta linea
            }, this.saveToLocalStorage);

    }

    colorChange = (color, id) => {
        console.log(color, id)
        this.setState({
            tasks: this.state.tasks.filter(task => task.id === id ? task.color = color : task)
        }, this.saveToLocalStorage)

    }

    render() {


        return (
            <div className='Tareas'>
                <section className='addTask'>
                    <input type='text' placeholder='Add Tasks' value={this.state.newTask}
                        onChange={event => this.setState({ newTask: event.target.value })}
                        onKeyPress={this.keyPress} />
                    <button onClick={() => this.addTasks(this.state.newTask)} >Add</button>
                    <button onClick={() => this.setState({ newTask: "" })}>Clear</button>
                </section>
                <main className='taskList'>

                    {this.state.tasks.map(task => (<Tarea data={task}
                        key={task.id}
                        onCompleted={this.completedTask}
                        onColorChange={this.colorChange}
                        onDeleted={this.deletedTask} />))}

                </main>

            </div>
        );
    }
}

export default Tareas;