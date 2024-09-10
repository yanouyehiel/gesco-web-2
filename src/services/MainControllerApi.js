import AxiosApi from "./AxiosApi";
import { getHeadersWithForm } from "./LocalStorage";

export async function getRoles(headers) {
    const response = await AxiosApi.get('/get-roles', {headers});
    return response.data;
}

export async function getRole(id, headers) {
    const response = await AxiosApi.get('/get-role/' + id, {headers});
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

export async function typesClasseById(id, headers) {
    const response = await AxiosApi.get('/get-types-classe/'+id, {headers});
    return response.data;
}

export async function addTypeClasse(data, headers) {
    const response = await AxiosApi.post('/type-classe/add', data, {headers});
    return response.data;
}

export async function typesEtablissements() {
    const response = await AxiosApi.get('/get-types-etablissement');
    return response.data;
}

export async function addClasse(classe, headers) {
    const response = await AxiosApi.post('/add-classe', classe, {headers});
    return response.data;
}

export async function addPersonne(personne, headers) {
    const response = await AxiosApi.post('/auth/register', personne, {headers});
    return response.data;
}

export async function addDirecteur(personne) {
    const response = await AxiosApi.post('/auth/register', personne);
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

export async function addEcole(ecole) {
    const response = await AxiosApi.post('/add-ecole', ecole, {headers: getHeadersWithForm()});
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

export async function getPaiementSchoolChart(id, headers) {
    const response = await AxiosApi.get('/get-paiements-chart/' + id, {headers});
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

export async function getAbsencesByStudent(id, headers) {
    const response = await AxiosApi.get('/get-absences-children/' + id, {headers});
    return response.data;
}

export async function getDocumentsAsked(id, headers) {
    const response = await AxiosApi.get('/get-documents-asked/' + id, {headers});
    return response.data;
}

export async function validateRequest(data, headers) {
    const response = await AxiosApi.put('/validate-request', data, {headers});
    return response.data;
}

export async function getMessages(id, idUser, headers) {
    const response = await AxiosApi.get('/get-messages/'+id+'/'+idUser, {headers});
    return response.data;
}

export async function getSingleMatiere(id, headers) {
    const response = await AxiosApi.get('/get-matiere/'+id, {headers});
    return response.data;
}

export async function readMessage(data, headers) {
    const response = await AxiosApi.put('/update-message', data, {headers});
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

export async function addGroupeMatiere(groupe, headers) {
    const response = await AxiosApi.post('/add-groupe-matiere', groupe, {headers});
    return response.data;
}

export async function getGroupeMatieres(id, headers) {
    const response = await AxiosApi.get('/get-groupes-matiere/' + id, {headers});
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

export async function addLivre(livre, headers) {
    const response = await AxiosApi.post('/add-livre', livre, {headers});
    return response.data;
}

export async function getLivres(id, headers) {
    const response = await AxiosApi.get('/get-livres/' + id, {headers});
    return response.data;
}

export async function getFeesStudent(id, headers) {
    const response = await AxiosApi.get('/get-fees-student/' + id, {headers});
    return response.data;
}

export async function deleteLivre(id, headers) {
    const response = await AxiosApi.delete('/delete-livre/' + id, {headers})
    return response.data
}

export async function updateTarif(data, headers) {
    const response = await AxiosApi.put('/update-tarif', data, {headers});
    return response.data;
}

export async function updateClasse(data, headers) {
    const response = await AxiosApi.put('/update-classe', data, {headers});
    return response.data;
}

export async function updateEvent(data, headers) {
    const response = await AxiosApi.put('/update-event', data, {headers});
    return response.data;
}

export async function addMessage(message, headers) {
    const response = await AxiosApi.post('/add-message', message, {headers});
    return response.data;
}

export async function getFeesEcole(id, headers) {
    const response = await AxiosApi.get('/get-fees-ecole/'+parseInt(id), {headers});
    return response.data;
}

export async function getDirecteur(id, headers) {
    const response = await AxiosApi.get('/get-school/'+parseInt(id), {headers});
    return response.data;
}

export async function updateEmploye(data, headers) {
    const response = await AxiosApi.put('/update-employe', data, {headers});
    return response.data;
}

export async function importListStudents(data, headers) {
    const response = await AxiosApi.post('/import-list-students', data, {headers});
    return response.data;
}

export async function linkStudentToParent(data, headers) {
    const response = await AxiosApi.post('/link-student-parent', data, {headers});
    return response.data;
}

export async function getSequences(id, headers) {
    const response = await AxiosApi.get('/get-sequences/'+parseInt(id), {headers});
    return response.data;
}

export async function addSequence(data, headers) {
    const response = await AxiosApi.post('/add-sequence', data, {headers});
    return response.data;
}

export async function addTrimestre(data, headers) {
    const response = await AxiosApi.post('/add-trimestre', data, {headers});
    return response.data;
}

export async function getTrimestres(id, headers) {
    const response = await AxiosApi.get('/get-trimestres/'+parseInt(id), {headers});
    return response.data;
}

export async function generateBulletinClasse(data, headers) {
    const response = await AxiosApi.get(`/generate-bulletin-classe/classe_id=${data.classe_id}&annee_scolaire=${data.annee_scolaire}&sequence_id=${data.sequence_id}`, {headers});
    return response.data;
}

export async function getFilieres(id, headers) {
    const response = await AxiosApi.get('/filieres/list/'+parseInt(id), {headers});
    return response.data;
}

export async function addFiliere(data, headers) {
    const response = await AxiosApi.post('/filieres/add', data, {headers});
    return response.data;
}

export async function getCursus(id, headers) {
    const response = await AxiosApi.get('/cursus/list/'+parseInt(id), {headers});
    return response.data;
}

export async function addCursus(data, headers) {
    const response = await AxiosApi.post('/cursus/create', data, {headers});
    return response.data;
}

export async function getDepartements(id, headers) {
    const response = await AxiosApi.get('/departements/list/'+parseInt(id), {headers});
    return response.data;
}

export async function addDepartement(data, headers) {
    const response = await AxiosApi.post('/departements/create', data, {headers});
    return response.data;
}