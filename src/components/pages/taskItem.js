import React from 'react';
import { connect } from 'react-redux';
import { changeStatus, deleteTask } from '../../actions/';
import { Link } from 'react-router-dom';

import './taskItem.sass'


class TaskItem extends React.Component {
    state = {
        status: "NEED_TO_DO"
    };

    render() {
        const { deleteTask, changeStatus } = this.props;
        const id = this.props.match.params.id;

        const deleteItem = () => {
            deleteTask(id);
            this.props.history.replace("/tasks/");
        }

        const clickButton = (status) => {
            this.setState(() => ({ status: status }));
            changeStatus(id, status);
        }

        const task = JSON.parse(localStorage.getItem(id));
        return (
            <section className="taskItem">
                <div className="taskItem__container">
                <Link className="taskItem__close" style={{ textDecoration: 'none', color: 'inherit' }} to="/tasks/">X</Link>
                    <div className="taskItem__info">
                        <div className="taskItem__title">
                            {task.title}
                        </div>
                        <div className="taskItem__description">
                            <p>
                                {task.description}
                            </p>               
                            <div className="taskItem__status">
                                <div onClick={()=>clickButton("IN_PROCESS")} className={this.state.status === "IN_PROCESS"? "checked":null} >В процессе</div>
                                <div onClick={()=>clickButton("NEED_TO_DO")} className={this.state.status === "NEED_TO_DO"? "checked":null} >Предстоит к выполнению</div>
                                <div onClick={()=>clickButton("DONE")} className={this.state.status === "DONE"? "checked":null} >Выполненно</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={deleteItem} >Удалить</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id, status) => dispatch(changeStatus(id, status)),
        deleteTask: (id) => dispatch(deleteTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);