function auth(username, password, callback) {
    fetch(
        "http://localhost:8888/wordpress-test/wp-json/jwt-auth/v1/token?username="+username+"&password="+password, {method: "POST",
    }
        ).then(
            (response) => {
                if (response.status !== 200) throw new Error("HTTP status " + response.status);
                return response.json();}
        ).then(
            (json) => callback(json)
        ).catch((err) => {console.log(err)}
    );
}

export {auth};