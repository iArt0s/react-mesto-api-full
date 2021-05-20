import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';


function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="картинка лого" className="header__logo hover"/>
            <Route exact path="/">
                <button className={`${props.burgerStatus ? "header__burger-button_active" : "header__burger-button"}`} onClick={props.onBurgerMenuClick} type="button" ></button>
            </Route>

            <Route path="/sign-in">
                <Link className="header__auth-link button" to="/sign-up">
                    Регистрация
                </Link>
            </Route>
            <Route path="/sign-up">
                <Link className="header__auth-link button" to="/sign-in">
                    Войти
                </Link>
            </Route>
            <Route exact path="/">
                <p className="header__auth-email">{props.email}</p>
                <button
                    className="header__auth-sign-out-button button"
                    onClick={props.onSignOut}>Выйти</button>
            </Route>
        </header>
    );
}

export default Header;
