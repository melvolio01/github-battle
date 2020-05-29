import React from 'react';
import PropTypes from 'prop-types';

const LanguageNav = ({ selected, onUpdateLanguage }) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className="flex-center">
            {languages.map((language, ind) => {
                return (<li key={ind}>
                    <button className="btn-clear nav-link"
                        style={language === selected ? { color: '#63b7af' } : null}
                        onClick={() => onUpdateLanguage(language)}
                    >{language}</button>
                </li>)
            })}
        </ul>
    )
}

LanguageNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default LanguageNav;