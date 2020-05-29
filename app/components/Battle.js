import React, { Component, Fragment } from 'react';
import BattleInstructions from './BattleInstructions';
import PlayerInput from './PlayerInput';
import PlayerPreview from './PlayerPreview';
import Results from './Results';
import { Link } from 'react-router-dom'

class Battle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    handleReset(id) {
        this.setState({
            [id]: null
        })
    }

    render() {
        const { playerOne, playerTwo } = this.state;

        return (
            <Fragment>
                <BattleInstructions />
                <div className="players-container">
                    <h1 className="center-text header-lg">Players</h1>
                    <div className="row space-around">
                        {(playerOne === null) ?
                            <PlayerInput
                                label="Player One"
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}
                            />
                            : <PlayerPreview
                                username={playerOne}
                                label="Player One"
                                onReset={() => this.handleReset('playerOne')}
                            />
                        }

                        {(playerTwo === null) ?
                            <PlayerInput
                                label="Player Two"
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                            />
                            : <PlayerPreview
                                username={playerTwo}
                                label="Player Two"
                                onReset={() => this.handleReset('playerTwo')}
                            />
                        }
                    </div>
                    {playerOne && playerTwo && (
                        <Link className="dark-btn btn btn-space"
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                        >Battle</Link>
                    )}

                </div>
            </Fragment >
        );
    }
}

export default Battle;