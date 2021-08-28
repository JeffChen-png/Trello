import React from 'react';
import { connect } from 'react-redux';
import { addTask} from '../../actions/';

import './modal.sass';


class Modal extends React.Component {
    state = {
        title: "",
        description: ""
    };

    onValueChange = (event) => {
        if (event.target.id === 'title'){
            this.setState({
                title: event.target.value
            })
        } else if (event.target.id === 'description') {
            this.setState({
                description: event.target.value
            })
        }
    }

    onSubmite = (event) => {
        event.preventDefault();
        const { title, description } = this.state;
        const { tasks, addTask } = this.props;

        let id = 0;
        if(tasks.length > 0) {
            const tmp = tasks.sort((prev, next) => prev.id - next.id);
            id = +tmp[tmp.length - 1].id + 1;
        }

        addTask(id, title, description);

        this.setState({
            title: "",
            description: ""
        })
    }

    render() {
        return (
            <section className="modal">
                <form action="" className="modal__container" onSubmit={this.onSubmite}>
                    <div className="modal__header">Добавьте новую задачу</div>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Введите название"
                        onChange={this.onValueChange}
                        value={this.state.title}
                    />
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Введите описание"
                        onChange={this.onValueChange}
                        value={this.state.description}
                    />
                    <button>Добавить</button>
                </form>
            </section>

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
        addTask: (id, title, description) => dispatch(addTask(id, title, description)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
