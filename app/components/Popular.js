import React, { useState, useReducer, useEffect, useRef, Fragment } from 'react';
import LanguageNav from './LanguageNav';
import ReposGrid from './ReposGrid';
import { fetchPopularRepos } from '../utils/api';

const popularReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                ...state,
                [action.selectedLanguage]: action.repos,
                error: null
            }
        case 'error':
            return {
                ...state,
                error: action.error.message
            }
        default:
            throw new Error('This actiontype is not supported')
    }
}

const Popular = () => {
    const [selectedLanguage, selectLanguage] = useState('All')
    const [state, dispatch] = useReducer(
        popularReducer,
        { error: null }
    )

    const fetchedLanguages = useRef([])

    useEffect(() => {
        if (!fetchedLanguages.current.includes(selectedLanguage)) {
            fetchedLanguages.current.push(selectedLanguage)
            fetchPopularRepos(selectedLanguage)
                .then((repos) => dispatch({ type: 'success', selectedLanguage, repos }))
                .catch((error) => dispatch({ type: 'error' }, error))
        }
    }, [state, selectedLanguage])

    const isLoading = () => {
        return !state[selectedLanguage] && state.error === null
    }

    return (
        <Fragment>
            <LanguageNav
                selected={selectedLanguage}
                onUpdateLanguage={selectLanguage}
            />
            {isLoading() && <div className="loader"></div>}
            {state.error && <p className="center-text error">{error}</p>}
            {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
        </Fragment>
    )
}

export default Popular;