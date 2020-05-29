import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Header from './components/Header';
import { ThemeProvider } from './contexts/Theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Popular = lazy(() => import('./components/Popular'));
const Battle = lazy(() => import('./components/Battle'));
const Results = lazy(() => import('./components/Results'));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Popular',
            theme: 'Light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render() {
        const updatePage = (page) => {
            this.setState({
                page
            })
        }

        const { page } = this.state;
        return (
            <Router >
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Header />
                            <Suspense>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path="/battle" component={Battle} />
                                    <Route path="/battle/results" component={Results} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))