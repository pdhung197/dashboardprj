import { loginApi } from './../constants/apiConfig';
import { callApi } from './../utils/apiUtils';

export const login = (username, password) => {
    const config = {
        method: "POST",
        data: JSON.stringify({
            username,
            password
        })
    };

    return callApi(
        loginApi,
        config,
        null,
        null
    );
}