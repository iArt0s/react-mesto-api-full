import { Route } from 'react-router-dom';

function Burger(props) {

    return (
        <Route exact path="/">
            <div className={`burger-menu ${props.isOpen && 'burger-menu_opened'}`}>
                <div className="burger-menu__content">
                    <p className="burger__auth-email">{props.email}</p>
                    <button className="burger__auth-sign-out-button" onClick={props.onSignOut}>Выйти</button>
                </div>
            </div>
        </Route>
    )
}

export default Burger;
