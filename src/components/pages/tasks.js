import React from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../../actions/';
import TasksColumn from '../tasksColumn';
import Modal from '../modal';

import './tasks.sass';

class Tasks extends React.Component {
    componentDidMount() {
        this.props.loadTasks();
        
        window.addEventListener('storage', function(e) {  
            loadTasks();
        });
    }

    componentWillUnmount() {
        window.removeEventListener('storage', function(e) {  
            loadTasks();
        });
    }

    state = {
        isOpen: false,
    };

    toggle = () => (
        this.setState((state) => ({ isOpen: !state.isOpen }))
    )

    render() {
        const tasks = this.props.tasks;
        const loadTasks = this.props.loadTasks;

        const inProcessTasks = tasks.filter((task) => {
            return (task.status === "IN_PROCESS")
        });
        const needToDoTasks = tasks.filter((task) => {
            return (task.status === "NEED_TO_DO")
        });
        const doneTasks = tasks.filter((task) => {
            return (task.status === "DONE")
        });
           
        const modal = this.state.isOpen ? <Modal/> : null;

        return (
            <>
            <section className="tasks">
                <div className="tasks__container">
                    <div className="tasks__columns">                        
                        <TasksColumn name="Предстоит сделать" tasks={needToDoTasks}/>
                        <TasksColumn name="В процессе выполнения" tasks={inProcessTasks}/>
                        <TasksColumn name="Выполненно" tasks={doneTasks} />
                    </div>
                    <button onClick={this.toggle}>Добавить задачу</button>
                </div>
            </section>
            {modal}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        tasks: state.tasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTasks: () => dispatch(loadTasks()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
