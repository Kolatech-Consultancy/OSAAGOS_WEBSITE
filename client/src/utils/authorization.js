// import { json } from "react-router-dom";

function Is_authorized() {
    let user = localStorage.getItem('token');
    if(user != null) {
        return user;
    }
    return null;
}

export default Is_authorized;