import React from 'react';
import PropTypes from 'prop-types';

const ResultsCard = ({ header, subheader, avatar, href, name, children }) => {
    return (
        // <div className="grid container-small space-around">
        <div className="card bg-light">
            <h4 className="header-lg center-text">
                {header}
            </h4>
            <img className="avatar"
                src={avatar}
                alt={`Avatar for ${name}`}>
            </img>
            {subheader && (<h2 className="center-text">
                {subheader}
            </h2>)}
            <h2 className="center-text">
                <a className="link" href={href}>
                    {name}
                </a>
            </h2>
            {children}
        </div>
    );
};

ResultsCard.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default ResultsCard;