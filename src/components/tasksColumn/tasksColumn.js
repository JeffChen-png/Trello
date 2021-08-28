import React from 'react';
import { Link } from 'react-router-dom';

import './tasksColumn.sass'


const TasksColumn = ({ tasks, children, name }) => {
    return (
        <div className="tasksColumn">
            <h4>{name}</h4>
            <ul>
                {
                    tasks.map(task => {
                        return (
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} key={task.id} to={`/tasks/${task.id}`}>
                                <li>
                                    {task.title}
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
            {children}
        </div>
    )
}

export default TasksColumn;