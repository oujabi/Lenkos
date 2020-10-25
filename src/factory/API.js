import {validate} from "./jwt-auth";
import {getCookie} from "./cookie";

/**Requêtes des Tickets**/
const getTicket = (callback) => {
    const cookie = getCookie();
    if (cookie['token'] !== '') {
        validate(cookie['token']);
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/tickets/'+cookie['username'],
            {
                method: 'GET',
                headers: {Accept: 'application/json', Authorization: cookie['token']},
            }
        ).then( response => {if (response.status !== 200) throw new Error('HTTP STATUS'+response.status);
            return response.json();}
        ).then( json => {json.map((j, index) => j.index = index ); callback(json)}
        ).catch( err => console.log(err) )
    } else {window.location.pathname = '/login';}
}

const postTicket = (title, priority, description) => {
    let cookie = getCookie();
    fetch('http://localhost:8888/klorel/wp-json/klorel/v1/new/ticket',
        {
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'priority': priority,
                'description': description,
                'client': cookie['username'],
                // 'attachment': attachment.current.files[0],
            }),
        })
        .then(response => {
            if (response.status === 200) {
                window.location.pathname = 'Tickets'
            } else {
                console.log(response.status)
            }
        })
}

const updateTicket = (ticket) => {
    fetch('http://localhost:8888/klorel/wp-json/klorel/v1/update/tickets',
        {
            method: 'POST',
            body: JSON.stringify(ticket),
        })
        .then((response) => console.log(response.status));
}

/**Requête des Intervention**/
const getIntervention = (callbackCredit, callbackTotal) => {
    const cookie = getCookie();
    if (cookie['token'] !== '') {
        validate(cookie['token']);
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/credits',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: cookie['token'],
                }
            }
        )
            .then(response => {
                if (response.status !== 200) throw new Error(`HTTP STATUTS` + response.status);
                return response.json();
            })
            .then(json => {
                callbackCredit(json['credits']);
                callbackTotal(json['total_credits']);
            })
            .catch(err => console.log(err))
    } else {window.location.pathname = '/login'}
}

const getUser = (callbacFirstName, callbackLastName, callbackEmail, callbackUsername) => {
const cookie = getCookie();
    if (cookie['token'] !== '') {
        validate(cookie['token']);
        fetch('http://localhost:8888/klorel/wp-json/klorel/v1/user/'+cookie['username']+'', {method: 'GET'})
            .then((response) => {
                if (response.status !== 200) throw new Error('HTTP Status :'+response.status);
                return response.json()})
            .then((json) => {
                callbacFirstName(json['first_name']);
                callbackLastName(json['last_name']);
                callbackEmail(json['email']);
                callbackUsername(json['login']);
            })
            .catch((err) => (console.log(err)))
    } else {window.location.pathname = '/login'}
}

const updateUser = (email, password, username) => {
    fetch('http://localhost:8888/klorel/wp-json/klorel/v1/update/user',
        {
            method: 'POST',
            body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'username': username,
                }
            ),
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.pathname = 'Account'
            } else {
                console.log(response.status)
            }
        })
}
export {getTicket, updateTicket, postTicket, getIntervention, getUser, updateUser};