import React, { Component } from 'react'
import Todo from './Todo';

export default class TodoList extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [
                { task: "task 1", successfull: false },
                { task: "task2", successfull: true }
            ],
            todo: ""
        }
    }

    onChangeTodo = (e) => {
        this.setState({ todo: e.target.value });
    }

    addTodo = (e) => {
        this.setState((state) => {
            tasks: state.tasks.push({ task: e, successfull: false })
        })
        console.log(this.state.tasks)
        this.setState({ todo: "" })
        this.title.value = "";
    }

    markComplete = (e) => {
        this.setState((state) => {
            posts: state.tasks.map(task => {
                if (task === e) {
                    task.successfull = !task.successfull
                }
            })
        })
        this.setState({ todo: "" })
    }

    render() {
        let dataSearch = this.state.tasks.filter(t => t.task.includes(this.state.todo));
        return (
            <div className="container col-md-8 col-md-offset-2">
                <h5 className="text-center">Todo List</h5>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Todo" name="title" value={this.state.todo} onChange={this.onChangeTodo} ref={(c) => this.title = c} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => { this.addTodo(this.title.value) }}>Add</button>
                </div>
                <ul className="list-group">
                    <Todo tasks={dataSearch} markComplete={this.markComplete} />
                </ul>
            </div>
        )
    }
}
