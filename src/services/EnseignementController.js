import AxiosApi from "./AxiosApi";

export async function getCoursByClasse(idClasse, headers) {
    const response = await AxiosApi.get('/get-cours-classe/' + idClasse, {headers});
    return response.data;
}

export async function getAllCours(id, headers) {
    const response = await AxiosApi.get('/cours-students/' + id, {headers});
    return response.data;
}

export async function getTeachers(id, headers) {
    const response = await AxiosApi.get('/get-teachers/' + id, {headers});
    return response.data;
}

export async function getTeacher(matricule, headers) {
    const response = await AxiosApi.get('/get-teacher/' + matricule, {headers});
    return response.data;
}

export async function getStudentsOfClasse(idSalle, idEcole, headers) {
    const response = await AxiosApi.get(`/my-students/classe_id=${parseInt(idSalle)}&ecole_id=${parseInt(idEcole)}`, {headers});
    return response.data;
}

export async function getAllDevoirs(id, headers) {
    const response = await AxiosApi.get('/devoirs-students/' + id, {headers});
    return response.data;
}

export async function getDevoirsOfClasse(idSalle, headers) {
    const response = await AxiosApi.get('/devoirs-classe/' + idSalle, {headers});
    return response.data;
}

export async function getAllPresences(id, headers) {
    const response = await AxiosApi.get('/get-absences/' + id, {headers});
    return response.data;
}

export async function getAllNotes(id, headers) {
    const response = await AxiosApi.get('/notes-students/' + id, {headers});
    return response.data;
}