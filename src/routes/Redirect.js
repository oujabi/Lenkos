import React, {useEffect} from "react";

function Redirect () {
    useEffect(() => {window.location.pathname = '/tickets'},[])

    return null;
}

export default Redirect;