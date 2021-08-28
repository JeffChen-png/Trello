import React from 'react';
import { Link } from 'react-router-dom';

import './startPage.sass';

const StartPage = () => {
    return (
        <section className="startPage">
            <div className="startPage__container">
                <h1>Добро пожаловать в таск менеджер Trello</h1>
                <Link to="/tasks/"><button>Перейти к задачам</button></Link>
            </div>
        </section>
    )
}

export default StartPage;