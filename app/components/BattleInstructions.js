import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';

const BattleInstructions = () => {
    return (
        <div className="instructions-container">
            <h1 className="center-text header-large">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm">Enter two Github users</h3>
                    <FaUserFriends className="bg-light" color="rgb(255, 199, 196)" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">Battle!</h3>
                    <FaFighterJet className="bg-light" color="#323232" size={140} />
                </li>
                <li>
                    <h3 className="header-sm">See the winner</h3>
                    <FaTrophy className="bg-light" color="rgb(255, 215, 0)" size={140} />
                </li>
            </ol>
        </div>
    );
};

export default BattleInstructions;