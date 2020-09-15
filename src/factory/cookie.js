function setCookie (json) {
    document.cookie = "token="+json.token+"; SameSite=Lax; Secure";
    if (json !== '') {
        window.location.pathname = '/tickets';
    }
}

function getCookie (callback) {
    let cookies = document.cookie.split(";");
    let cookieName = "token="
    cookies.map(  c => {if (c.indexOf(cookieName) !== -1)
        {
            let token = c.substring(cookieName.length, c.length);
            return token
        }
        return null
    })
}

export {setCookie, getCookie}