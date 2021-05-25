import React from 'react'

function Todo(props) {
    return (
        <div>
            {props.tasks.map((task, index) => {
                return <li className={task.successfull ? "list-group-item checked" : "list-group-item"} key={index} onClick={() => {
                    props.markComplete(task)
                }}>{task.task}</li>
            })}
        </div>
    )
}

export default Todo
