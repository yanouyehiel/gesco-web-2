import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast, ToastContainer } from 'react-toastify'
import { addFiliere, getCursus, getDepartements, getFilieres } from '../../services/MainControllerApi'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { Form, Modal } from 'react-bootstrap'

const columns = [
    {
        name: 'Num',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Domaine',
        selector: row => row.domaine,
        sortable: true
    },
    {
        name: 'Spécialité',
        selector: row => row.specialite,
        sortable: true
    },
    {
        name: 'Parcours',
        selector: row => row.parcours,
        sortable: true
    },
    {
        name: 'Option',
        selector: row => row.option,
        sortable: true
    },
    {
        name: 'Département',
        selector: row => row.intitule_departement,
        sortable: true
    },
    {
        name: 'Curcus',
        selector: row => row.intitule_cycle,
        sortable: true
    }
]

function Filieres() {
    const handleClose = () => setShow(false)
    const handleShow = () => {
        getAllCursus().then()
        getAllDepartements().then()
        setShow(true)
    }
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [filieres, setFilieres] = useState([])
    const [data, setData] = useState([])
    const [filiere, setFiliere] = useState({})
    const [cursus, setCursus] = useState([])
    const [departements, setDepartements] = useState([])

    useEffect(() => {
        getAllFilieres().then(() => setLoading(false))
    }, [])

    async function getAllFilieres() {
        await getFilieres(ecole_id, headers).then(res => {
            setFilieres(res)
            setData(res)
        })
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setFiliere({...filiere, [name]: value})
    }

    async function getAllCursus() {
        await getCursus(ecole_id, headers).then(res => setCursus(res))
    }

    async function getAllDepartements() {
        await getDepartements(ecole_id, headers).then(res => setDepartements(res))
    }

    function handleFilter() {
        const newData = filieres.filter(row => {
            return row.domaine.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.parcours.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.specialite.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.option.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.intitule_departement.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.intitule_cycle.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        filiere.ecole_id = ecole_id
        await addFiliere(filiere, headers).then(res => {
            toast.success(res.message)
            getAllFilieres().then()
            handleClose()
            setLoading(false)
        })
    }

    return (
        <CCard>
            <ToastContainer />
            <CCardHeader>Toutes les filières</CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        <CInputGroup className="mb-3">
                        <CFormInput
                            placeholder="Rechercher"
                            aria-label="Rechercher"
                            aria-describedby="basic-addon1"
                            onChange={handleFilter}
                        />
                        </CInputGroup>
                    </CCol>
                    <CCol>
                        <CButton className='btn-primary text-white' onClick={handleShow}>Ajouter une filière</CButton>
                    </CCol>
                </CRow>
                <CRow>
                    {loading ? <CSpinner color='primary' /> :
                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                            pagination
                            selectableRowsHighlight
                            highlightOnHover
                        />
                    }
                </CRow>
            </CCardBody>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enregistrement d'une filière</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className="control-label">Département</Form.Label>
                            <Form.Select onChange={handleChange} name='departement_id' className="form-control" required='true'>
                                <option>-- select --</option>
                                {departements.length > 0 && departements.map((d, i) => (
                                    <option key={i} value={d.id}>{d.intitule}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Domaine</Form.Label>
                            <Form.Control onChange={handleChange} name='domaine' type="text" className="form-control" required='true' />
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Sélectionner le cursus</Form.Label>
                            <Form.Select onChange={handleChange} name='cycle_id' className="form-control" required='true'>
                                <option>-- select --</option>
                                {cursus.length > 0 && cursus.map((c, i) => (
                                    <option key={i} value={c.id}>{c.intitule}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Spécialité</Form.Label>
                            <Form.Control onChange={handleChange} name='specialite' type="text" className="form-control" required='true' />
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Parcours</Form.Label>
                            <Form.Control onChange={handleChange} name='parcours' type="text" className="form-control" required='true' />
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Option</Form.Label>
                            <Form.Control onChange={handleChange} name='option' type="text" className="form-control" required='true' />
                        </Form.Group>
                        <br/>
                        <CButton size='lg' type='submit' className='btn-primary text-white' disabled={loading}>
                        {!loading ? 'Enregistrer' : 'Traitement...'}
                        </CButton>
                    </Form>
                </Modal.Body>
            </Modal>
        </CCard>
    )
}

export default Filieres