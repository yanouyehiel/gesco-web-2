import AxiosApi from "./AxiosApi";

export async function addStudent(student, headers) {
    const response = await AxiosApi.post('/add-student', student, {headers});
    return response.data;
}

export async function getStudents(id, headers) {
    const response = await AxiosApi.get('/get-students/' + id, {headers});
    return response.data;
}

export async function getAllStudents(id, headers) {
    const response = await AxiosApi.get('/get-all-students/' + id, {headers});
    return response.data;
}

export async function getSingleStudent(matricule, headers) {
    const response = await AxiosApi.get('/get-student/' + matricule, {headers});
    return response.data;
}