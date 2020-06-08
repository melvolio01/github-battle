import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerInput = ({ label, onSubmit }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(username);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    return (
        <form className='column player' onSubmit={handleSubmit}>
            <label htmlFor='username' className='player-label'>
                {label}
            </label>
            <div className='row player-inputs'>
                <input
                    type='text'
                    id='username'
                    className='input-light'
                    placeholder='github username'
                    autoComplete='off'
                    value={username}
                    onChange={handleChange}
                />
                <button
                    className='btn dark-btn'
                    type='submit'
                    disabled={!username}
                >
                    Submit
        </button>
            </div>
        </form>
    )
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default PlayerInput