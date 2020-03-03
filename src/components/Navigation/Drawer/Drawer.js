import React, { Component } from 'react'
import classes from './Drawer.module.scss'
import BackDrop from '../../Ui/BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'

const links = [
    { to:'/', label:'Список', exact: true},
    { to:'/auth', label:'Авторизация', exact: true},
    { to:'/quiz-creator', label:'Создание теста', exact: true},
];

class Drawer extends Component {

    clickHandler = () => this.props.onClose();

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [classes.Drawer]
        if (!this.props.isOpen) cls.push(classes.close)

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.clickHandler}/> : null}
            </React.Fragment>

        )
    }
}

export default Drawer
