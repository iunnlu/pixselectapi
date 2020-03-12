import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import Login from './Login';
import SignUp from './SignUp';
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import Channel from './Channel';
import CustomNavbar from './Navbar';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                        <Route component={Main} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

class Main extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CustomNavbar />
                <Route path="/home" exact component={UserHome} />
                <Route path="/admin" exact component={AdminHome} />
                <Route path="/channel" exact component={Channel} />
            </React.Fragment>
        )
    }
}

export default App;