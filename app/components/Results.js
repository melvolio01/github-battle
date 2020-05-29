import React, { Component, Fragment } from 'react';
import { battle } from '../utils/api';
import ResultsCard from './ResultsCard';
import ResultsCardList from './ResultsCardList';
import { FaCompass, FaBriefcase, FaUser, FaUserFriends, FaCode, FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

class Results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        console.log(this.props)
        const { playerOne, playerTwo } = queryString.parse(this.props.location.search)
        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                }, () => console.log(players))
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })

    }

    render() {
        const { winner, loser, error, loading } = this.state;
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
}

export default Results;