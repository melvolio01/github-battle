import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ResultsCard from './ResultsCard';
import Tooltip from './Tooltip';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

const ReposGrid = ({ repos }) => {
    return (
        <Fragment>
            <ul className="grid space-around">
                {repos.map((item, ind) => {
                    const { name, owner, html_url, stargazers_count, forks, open_issues } = item;
                    const { login, avatar_url } = owner;
                    return (<ResultsCard
                        key={ind}
                        header={`#${ind + 1}`}
                        avatar={avatar_url}
                        href={html_url}
                        name={name}>
                        <ul className="card-list">
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`https://github.com/${name}`} >{` ${name}`}</a>
                            </li>
                            <li>
                                <Tooltip text="Stars">
                                    <FaStar color='rgb(255, 233, 0)' size={22} />
                                    {` ${stargazers_count.toLocaleString()}`}
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip text="Forks">
                                    <FaCodeBranch color='rgb(44, 53, 57)' size={22} />
                                    {` ${forks.toLocaleString()}`}
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip text="Open Issues">
                                    <FaExclamationTriangle color='rgb(255, 30, 86)' size={22} />
                                    {` ${open_issues.toLocaleString()}`}
                                </Tooltip>
                            </li>
                        </ul>
                    </ResultsCard>)
                })}
            </ul>
        </Fragment>
    );
};

{/* <li>
<Tooltip text="User's Company">
    <FaBriefcase color="#795548" size={22}
    />
    {player.profile.company}
</Tooltip>
</li> */}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default ReposGrid;