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

    if (user) {
        /* myHeaders.append('Authorization', 'Bearer ' + user); */
        myHeaders = {
            ...myHeaders,
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json"
        }
    }
    if (myHeaders) options.headers = myHeaders;

    return axios(options)

}