import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Popular from './components/Popular';
import Battle from './components/Battle';
import Results from './components/Results';
import Header from './components/Header';
import { ThemeProvider } from './contexts/Theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme((theme) => {
        return theme === 'light' ? 'dark' : 'light'
    })
    return (
        <Router >
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className="container">
                        <Header toggleTheme={toggleTheme} />
                        <Switch>
                            <Route exact path='/' component={Popular} />
                            <Route exact path="/battle" component={Battle} />
                            <Route path="/battle/results" component={Results} />
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))