import React, { Component } from 'react';
import { FaCompass, FaBriefcase, FaUser, FaUserFriends, FaCode, FaUsers } from 'react-icons/fa';
import Tooltip from './Tooltip.js';

const ResultsCardList = ({ player }) => {
    return (
        <div className="card-list">
            <ul className="card-list">
                <li>
                    <FaUser color="rgb(239, 115, 115)" size={22} />
                    {player.profile.name}
                </li>
                {player.profile.location && (
                    <li>
                        <Tooltip text="User's Location" >
                            <FaCompass color="rgb(144, 115, 255)" size={22} />
                            {player.profile.location}
                        </Tooltip>
                    </li>
                )}
                {player.profile.company && (
                    <li>
                        <Tooltip text="User's Company">
                            <FaBriefcase color="#795548" size={22}
                            />
                            {player.profile.company}
                        </Tooltip>
                    </li>
                )}
                <li>
                    <FaUsers color="rgb(129, 195, 245)" size={22} />
                    {player.profile.followers.toLocaleString()}
                </li>
                <li>
                    <FaUserFriends color="rgb(64, 195, 183)" size={22} />
                    {player.profile.following}
                </li>
            </ul>
        </div>
    );
}

export default ResultsCardList;