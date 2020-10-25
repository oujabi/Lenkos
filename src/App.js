import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
/**Définis les différentes routes**/

const Login = lazy(() => import('./routes/Login'))
const Tickets = lazy(() => import('./routes/Tickets'))
const Credits = lazy( ()=> import('./routes/Credits'))
const Account = lazy(()=>import('./routes/Account'))
/**lazy permet de gérer les imports dynamique lors de l'appel du composant pour lequel elle est définis**/

const App = () => (
    <Router>
        {/*Router : composant englobant permettant la création de route*/}
        <Suspense fallback={<div>Loading...</div>}>
            {/*Suspense : Message afficher lors du chargement des routes*/}
            <Switch>
                {/*Switch : Permet de changer de route celon l'url*/}
                <Route path='/credits' component={Credits}/>
                <Route path='/login'  component={Login}/>
                <Route path='/account' component={Account}/>
                <Route path='/' component={Tickets} />
                {/*Appel le composant correspondant à l'url path*/}
                {/*Attention laisser la route path='/' en bas car si non le composant Tickets sera retourner à chaque fois*/}
            </Switch>
        </Suspense>
    </Router>
)

export default App;
