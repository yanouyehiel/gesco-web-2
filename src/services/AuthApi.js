import AxiosApi from "./AxiosApi";
import { getItem, removeItem } from "./LocalStorage";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export function hasAuthenticated() {
    const user = getItem('gesco');
    const isValid = user !== null ? true : false;

    return isValid;
}

export async function login(credentials, headers) {
    const response = await AxiosApi.post('/auth/login', credentials, {headers});
    return response.data;
}

export async function register(credentials) {
    try {
        const response = await AxiosApi.post('/register', credentials);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function logout(header) {
    try {
        const response = await AxiosApi.post('/auth/logout', {}, {header});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
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
    try {
        const response = await AxiosApi.post(`/auth/password/email`, data, {headers});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function resetPassword(data, credentials) {
    try {
        const response = await AxiosApi.post(`/auth/password/reset/${data.email}/${data.expires}/${data.signature}`, credentials, {headers});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function tokenIsValid(token) {
    const { exp } = jwtDecode(token);

    if (exp * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}