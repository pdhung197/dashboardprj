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

    let headers = new Headers();
    headers.append('x-request-id', uuidv4({ msecs: new Date().getTime() }))
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    if (user) {
        headers = {
            ...headers,
            Authorization: `Bearer ${user}`
        }
    }
    if (headers) options.headers = headers;

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            window.location = '/login'
        }
        return error;
    });

    const clientRequest = axios(options);

    return clientRequest;
}