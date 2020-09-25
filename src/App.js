import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const Redirect = lazy(() => import('./routes/Redirect'))
const Login = lazy(() => import('./routes/Login'))
const Tickets = lazy(() => import('./routes/Tickets'))
const  Credits = lazy( ()=> import('./routes/Credits'))

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path='/credits' component={Credits}/>
                <Route path='/login'  component={Login}/>
                <Route path='/' component={Tickets}/>
            </Switch>
        </Suspense>
    </Router>
)

export default App;
