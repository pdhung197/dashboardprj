import { userListApi } from './../constants/apiConfig';
import { callApi } from './../utils/apiUtils';

export const getUserList = () => {
    const config = {
        method: "GET"
    };

    return callApi(
        userListApi,
        config,
        null,
        null
    );
}