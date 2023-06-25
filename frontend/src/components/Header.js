import logo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header(props) {
    const currentLocation = window.location.pathname;

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип." />
            <nav className='header__nav-container'>
                {(currentLocation === '/sign-in') && <Link to="/sign-up" className='header__navtext_link'>Зарегистрироваться</Link>}
                {(currentLocation === '/sign-up') && <Link to="/sign-in" className='header__navtext_link'>Войти</Link>}
                {(currentLocation === '/') &&
                    <>
                        <li className='header__navtext'>{props.userEmail}</li>
                        <button className='header__navtext_link' onClick={props.logout}>Выйти</button>
                    </>}
            </nav>
        </header>
    );
}

export default Header;