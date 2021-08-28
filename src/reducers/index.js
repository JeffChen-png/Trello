const initialState = {
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TASKS_LOADED":
            const tasksArray = [];
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                }
                tasksArray.push({
                    id: key,
                    ...JSON.parse(localStorage.getItem(key))
                });
            }
            return {
                ...state,
                tasks: tasksArray
            }

        case "ADD_TASK":
            const newTask = {
                id: action.id,
                title: action.title,
                status: "NEED_TO_DO",
                description: action.description
            }

            localStorage.setItem(action.id, JSON.stringify(newTask));

            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    newTask,
                ]
            }

        case "CHANGE_TASK_STATUS":
            let changingItemIndex = state.tasks.findIndex((item) => +item.id === +action.id);
            let changingItem = state.tasks.find((item) => +item.id === +action.id);

            changingItem.status = action.status;

            localStorage.setItem(action.id, JSON.stringify(changingItem));
            return {
                ...state,
                tasks: [
                    ...state.tasks.slice(0, changingItemIndex),
                    changingItem,
                    ...state.tasks.slice(changingItemIndex + 1)
                ]
            }

        case "REMOVE_TASK":
            const deletingItemIndex = state.tasks.findIndex((item) => +item.id === +action.id);

            localStorage.removeItem(action.id);

            return {
                ...state,
                tasks: [...state.tasks.slice(0, deletingItemIndex),...state.tasks.slice(deletingItemIndex + 1)]                
            }

        default:
            return state;
    }
}

export default reducer;