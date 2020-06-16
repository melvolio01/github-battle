import React, { useContext } from 'react';
import ThemeContext from '../contexts/Theme';
import { NavLink } from 'react-router-dom';

const activeStyle = {
    color: '#63b7af'
}

const Header = ({ toggleTheme }) => {
    const theme = useContext(ThemeContext)
    return (
        <nav className="row space-between">
            <ul className="row nav-link">
                <li><NavLink exact to="/"
                    activeStyle={activeStyle}
                    className="nav-link">Popular</NavLink></li>
                <li><NavLink to="/battle"
                    activeStyle={activeStyle}
                    className="nav-link">Battle</NavLink></li>
            </ul>
            <button
                style={{ fontSize: 30 }}
                className='btn-clear'
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}


export default Header;
