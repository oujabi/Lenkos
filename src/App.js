import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const Login = lazy(() => import('./routes/Login'))
const Tickets = lazy(() => import('./routes/Tickets'))
const Credits = lazy( ()=> import('./routes/Credits'))
const Account = lazy(()=>import('./routes/Account'))

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path='/credits' component={Credits}/>
                <Route path='/login'  component={Login}/>
                <Route path='/account' component={Account}/>
                <Route path='/' component={Tickets}/>
            </Switch>
        </Suspense>
    </Router>
)

export default App;
