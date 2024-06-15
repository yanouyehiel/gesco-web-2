import AxiosApi from "./AxiosApi";
import { getItem } from "./LocalStorage";

export async function allUsers(headers) {
    const response = await AxiosApi.get('/users', {headers});
    return response.data.users;
}

export async function deleteUser(id, headers) {
    const response = await AxiosApi.delete('/delete-user/' + id, {headers});
    return response.data;
}

export async function getInfoUser(id, headers) {
    const response = await AxiosApi.get('/get-user/' + id, {headers});
    return response.data;
}

export function userStored() {
    const user = getItem('gescoUser');
    return JSON.parse(user);
}

export async function updateUser(data, headers) {
    const response = await AxiosApi.put('/update-user', data, {headers})
    return response.data;
}