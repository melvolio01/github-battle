import React, { Fragment } from 'react';
import LanguageNav from './LanguageNav';
import ReposGrid from './ReposGrid';
import { fetchPopularRepos } from '../utils/api';

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
        console.log(this.props.location)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch(() => {
                    console.warn('Error fetching repos: ', error)

                    this.setState({
                        error: 'Error fetching repositories'
                    })
                })
        }
    }

    isLoading() {
        const { selectedLanguage, repos, error } = this.state;
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <Fragment>
                <LanguageNav
                    selected={this.state.selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <div className="loader"></div>}
                {error && <p className="center-text error">{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </Fragment>
        )

    }
}