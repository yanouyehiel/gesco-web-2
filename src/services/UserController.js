import AxiosApi from "./AxiosApi";
import { getItem } from "./LocalStorage";

export async function allUsers() {
    const response = await AxiosApi.get('/users');
    return response.data.users;
}

export async function deleteUser(id) {
    const response = await AxiosApi.delete('/delete-user/' + id);
    return response.data;
}

export async function getInfoUser(id) {
    const response = await AxiosApi.get('/get-user/' + id);
    return response.data;
}

export function userStored() {
    const user = getItem('gescoUser');
    return JSON.parse(user);
}

export async function updateUser(data) {
    const response = await AxiosApi.put('/update-user', data)
    return response.data;
}