import AxiosApi from "./AxiosApi";
import { getItem } from "./LocalStorage";

export async function getRoles(headers) {
    const response = await AxiosApi.get('/get-roles', headers);
    return response.data;
}

export async function getRole(id, headers) {
    const response = await AxiosApi.get('/get-role/' + id, headers);
    return response.data;
}

export async function getClasses(id, headers) {   
    const response = await AxiosApi.get('/get-classes-school/' + id, {headers});
    return response.data;
}

export async function infoClasse(id, headers) {   
    const response = await AxiosApi.get('/get-info-classe/' + id, {headers});
    return response.data;
}

export async function typesClasse(headers) {
    const response = await AxiosApi.get('/get-types-classe', {headers});
    return response.data;
}

export async function typesEtablissements(headers) {
    const response = await AxiosApi.get('/get-types-etablissement', {headers});
    return response.data;
}

export async function addClasse(classe, headers) {
    const response = await AxiosApi.post('/add-classe', classe, {headers});
    return response.data;
}

export async function addPersonne(personne, headers) {
    const response = await AxiosApi.post('/add-personne', personne, {headers});
    return response.data;
}

export async function deleteClasse(id, headers) {
    const response = await AxiosApi.delete(`/delete-classe/${id}`, {headers});
    return response.data;
}

export async function addMatiere(matiere, headers) {
    const response = await AxiosApi.post('/add-matiere', matiere, {headers});
    return response.data;
}

export async function getAllMatieres(id, headers) {
    const response = await AxiosApi.get('/get-matieres/' + id, {headers});
    return response.data;
}

export async function getAllEmployes(id, headers) {
    const response = await AxiosApi.get('/get-personnel/' + id, {headers});
    return response.data;
}

export async function getInfoEcole(id, header) {
    const response = await AxiosApi.get('/get-ecole/' + id, {header});
    return response.data;
}

export async function addEcole(ecole, headers) {
    const response = await AxiosApi.post('/add-ecole', ecole, {headers});
    return response.data;
}

export async function addTarif(tarif, headers) {
    const response = await AxiosApi.post('/add-tarif', tarif, {headers});
    return response.data;
}

export async function getAllTarifs(id, headers) {
    const response = await AxiosApi.get('/get-tarifs/' + id, {headers});
    return response.data;
}

export async function addPaiement(paiement, headers) {
    const response = await AxiosApi.post('/add-paiement', paiement, {headers});
    return response.data;
}

export async function getPaiementSchool(id, headers) {
    const response = await AxiosApi.get('/get-paiements/' + id, {headers});
    return response.data;
}

export async function getAllParentsSchool(id, headers) {
    const response = await AxiosApi.get('/get-parents/' + id, {headers});
    return response.data;
}

export async function getSingleParent(matricule, headers) {
    const response = await AxiosApi.get('/get-parent/' + matricule, {headers});
    return response.data;
}

export async function getAllFeesStudent(id, headers) {
    const response = await AxiosApi.get('/get-fees-student/' + id, {headers});
    return response.data;
}

export async function askDocument(doc, headers) {
    const response = await AxiosApi.post('/ask-document', doc, {headers});
    return response.data;
}

export async function getAbsencesByClasse(id, headers) {
    const response = await AxiosApi.get('/absences-classe/' + id, {headers});
    return response.data;
}

export async function getDocumentsAsked(id, headers) {
    const response = await AxiosApi.get('/get-documents-asked/' + id, {headers});
    return response.data;
}

export async function validateRequest(id, headers) {
    const response = await AxiosApi.post('/validate-request', id, {headers});
    return response.data;
}

export async function getMessages(id, headers) {
    const response = await AxiosApi.get('/get-messages/' + id, {headers});
    return response.data;
}

export async function getEvents(id, headers) {
    const response = await AxiosApi.get('/get-events/' + id, {headers});
    return response.data;
}

export async function addEvent(event, headers) {
    const response = await AxiosApi.post('/add-event', event, {headers});
    return response.data;
}

export async function addCalendar(data, headers) {
    const response = await AxiosApi.post('/add-calendar', data, {headers});
    return response.data;
}

export async function getCalendars(id, headers) {
    const response = await AxiosApi.get('/get-calendars/' + id, {headers});
    return response.data;
}

export async function updateCalendar(data, headers) {
    const response = await AxiosApi.put('/update-calendar', data, {headers})
    return response.data
}

export async function deleteCalendar(id, headers) {
    const response = await AxiosApi.delete('/delete-calendar/' + id, {headers})
    return response.data
}

export async function addHoraire(data, headers) {
    const response = await AxiosApi.post('/add-horaire', data, {headers});
    return response.data;
}

export async function getHoraires(id, headers) {
    const response = await AxiosApi.get('/get-horaires/' + id, {headers});
    return response.data;
}