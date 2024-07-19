import AxiosApi from "./AxiosApi";
import { getItem, removeItem } from "./LocalStorage";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export function hasAuthenticated() {
    const user = getItem('gesco');
    const isValid = user !== null ? true : false;

    return isValid;
}

export async function login(credentials) {
    const response = await AxiosApi.post('/auth/login', credentials);
    return response.data;
}

export async function register(credentials) {
    try {
        const response = await AxiosApi.post('/register', credentials, {headers: header});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function logout(data, header) {
    const response = await AxiosApi.post('/auth/logout', data, {headers: header});
    return response.data;
}

export async function verify(data) {
    try {
        const response = await AxiosApi.post(`/auth/email/verify/${data.email}/${data.expires}/${data.signature}`, data, {headers});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function sendLinkResetPassword(data) {
    console.log(data)
    const response = await AxiosApi.post('/auth/password/email', data, {headers});
    return response.data;
}

export async function resetPassword(data, credentials) {
    const response = await AxiosApi.post(`/auth/password/reset/${data.email}/${data.expires}/${data.signature}`, credentials, {headers});
    return response.data;
}

function tokenIsValid(token) {
    const { exp } = jwtDecode(token);

    if (exp * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}