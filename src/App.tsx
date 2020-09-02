import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from 'components/templates/Header'
import Home from 'components/views/Home'
import Project from 'components/views/Project'
import Footer from 'components/templates/Footer'

import './_root.scss'

export class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/"
                        component={Home}
                    />
                    <Route exact path="/:project" 
                        component={Project}
                    />
                </Switch>
                <Footer />
            </Router>
        )
    }
}

export default App

