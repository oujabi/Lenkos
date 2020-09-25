function setCookie (json) {
    document.cookie = "klorel="+json.token+"; SameSite=Lax; Secure";
    if (json !== '') {
        window.location.pathname = '/tickets';
    }
}

function getCookie () {
    let cookies = document.cookie.split(";");
    let cookieName = "klorel=";
    let token = '';
    cookies.map(  c => {if (c.indexOf(cookieName) !== -1)
        {
            token = 'Bearer '+c.substring(cookieName.length, c.length);
        }
    })
    return token;
}

export {setCookie, getCookie}