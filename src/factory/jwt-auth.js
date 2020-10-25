import {setCookie} from "./cookie";

function auth(username, password, callback) {
    fetch('http://localhost:8888/klorel/wp-json/jwt-auth/v1/token?username='+username+'&password='+password, {method: 'POST'} )
        .then( (response) => {
            if (response.status !== 200) throw new Error('HTTP status' + response.status);
            return response.json()} )
        .then( (json) => setCookie(json) )
        .catch( (err) => {console.log(err)} )
}

function validate(token) {
    fetch('http://localhost:8888/klorel/wp-json/jwt-auth/v1/token/validate',
        {   method: 'POST',
                headers: {
                    Authorization: token
                }
        })
        .then( (response) => {
            return response.json()} )
        .then( (json) => {
            isValid(json['data'].status === 200)
        })
}

function isValid(data) {
    if (!data) {
        window.location.pathname = '/login';
    }
}

export {auth, validate};