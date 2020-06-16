import React, { Component, Fragment, useReducer, useEffect } from 'react';
import { battle } from '../utils/api';
import ResultsCard from './ResultsCard';
import ResultsCardList from './ResultsCardList';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const battleReducer = (state, action) => {
    switch (action.type) {
        case ('success'):
            return {
                winner: action.winner,
                loser: action.loser,
                error: null,
                loading: false
            }
        case ('error'):
            return {
                ...state,
                error: action.message,
                loading: false
            }
        default:
            throw new Error('That actiontype is not supported')
    }
}

const Results = ({ location }) => {
    const { playerOne, playerTwo } = queryString.parse(location.search)
    const [state, dispatch] = useReducer(battleReducer, {
        winner: null, loser: null, error: null, loading: true
    })

    useEffect(() => {
        battle([playerOne, playerTwo])
            .then((players) => dispatch({ type: 'success', winner: players[0], loser: players[1] }))
            .catch(({ message }) => dispatch({ type: 'error', message }))
    }, [playerOne, playerTwo])

    const { winner, loser, error, loading } = state;
    if (loading) {
        return <div className="loader"></div>
    }

    if (error) {
        return <p className="center-text error">{error}</p>
    }

    return (
        <Fragment>
            <div className="grid container-small space-around">

                <ResultsCard
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner.score.toLocaleString()}`}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.login}>
                    <ResultsCardList player={winner} />
                </ResultsCard>
                <ResultsCard
                    header={winner.score === loser.score ? 'Tie' : 'Loser'}
                    subheader={`Score: ${loser.score.toLocaleString()}`}
                    avatar={loser.profile.avatar_url}
                    href={loser.profile.html_url}
                    name={loser.profile.login}
                >
                    <ResultsCardList player={loser} />
                </ResultsCard>
            </div>
            <Link
                to="/battle"
                className="dark-btn btn btn-space"
            >
                Reset</Link>
        </Fragment>
    );
}

export default Results;