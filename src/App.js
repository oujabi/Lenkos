import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const Login = lazy(() => import('./routes/Login'))
const Tickets = lazy(() => import('./routes/Tickets'))
const  Credits = lazy( ()=> import('./routes/Credits'))

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path='/'  component={Login}/>
                <Route path='/tickets' component={Tickets}/>
                <Route path='/credits' component={Credits}/>
            </Switch>
        </Suspense>
    </Router>
)

export default App;
