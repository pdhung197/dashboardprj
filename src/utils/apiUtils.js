import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const loadUserProfile = () => {
    let user = localStorage.getItem('jwtToken');
    return user || null;
}

export const callApi = (
    url,
    config,
    onRequestSuccess,
    onRequestFailure
) => {
    const user = loadUserProfile();
    const options = {
        ...config,
        url
    };

    let myHeaders = new Headers();
    myHeaders.append('x-request-id', uuidv4({ msecs: new Date().getTime() }))
    if (config.isFormData) {
        myHeaders.append("Accept", "application/json");
    } else {
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
    }
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', true);
    myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    myHeaders.append('Access-Control-Allow-Headers', 'X-Custom-Header');
    if (user) {
        myHeaders.Authorization = 'Bearer ' + user
    }
    if (Object.keys(myHeaders).length) options.headers = myHeaders;

    return axios(options)
    /* .then(response => {
        console.log({ response });
        if (onRequestSuccess) onRequestSuccess(response);
        return response;
    })
    .catch(error => {
        console.log({ error });
        if (onRequestFailure) onRequestFailure(error);
        return error
    }); */
}