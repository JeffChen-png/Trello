import React from 'react';
import { Route } from 'react-router-dom';
import { TaskItem, Tasks, StartPage } from '../pages';

import './app.sass'

const App = () => {
    return (
        <>
            <div className="header">
                <div className="header__name">Trello <i className="fab fa-trello header__icon"></i></div>
            </div>
            <div>
                <Route exact path="/" component={StartPage} />
                <Route path="/tasks" component={Tasks} />
                <Route path="/tasks/:id" component={TaskItem} />
            </div>
        </>
    )
}
export default App;