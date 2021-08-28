const loadTasks = () => {
    return {
        type: "TASKS_LOADED",
    }
}

const addTask = (id, title, description) => {
    return {
        type: "ADD_TASK",
        id: id,
        title: title,
        description: description
    }
}

const changeStatus = (id, status) => {
    return {
        type: "CHANGE_TASK_STATUS",
        id: id,
        status: status
    }
}

const deleteTask = (id) => {
    return {
        type: "REMOVE_TASK",
        id: id
    }
}

export {
    addTask, changeStatus, deleteTask, loadTasks
}