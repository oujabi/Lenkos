function setCookie (json) {
    console.log(json);
    let data = {'token' : json.token, 'username' : json.user_nicename}
    document.cookie = "klorel="+JSON.stringify(data)+"; SameSite=Lax; Secure";
    if (json !== '') {
        window.location.pathname = '/tickets';
    }
}

function getCookie () {
    let cookies = document.cookie.split(";");
    let cookieName = 'klorel=';
    let tokenKey = 'token":"';
    let userKey  = '","username":"';
    let token = '';
    let username = '';
    cookies.map(  c => {
        if (c.indexOf(cookieName) !== -1){

            username = c.substring(c.indexOf(userKey)+userKey.length, c.length-2);
            token = 'Bearer '+c.substring(c.indexOf(tokenKey)+tokenKey.length, c.length-(userKey.length+username.length+2));
        }
    })
    let cookieData = {'token' : token, 'username' : username}
    return cookieData;
}

export {setCookie, getCookie}