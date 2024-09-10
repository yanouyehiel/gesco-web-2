import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addDepartement, getAllEmployes, getDepartements } from '../../services/MainControllerApi'
import { dateParser } from '../../utils/functions'
import DataTable from 'react-data-table-component'
import { Form, Modal } from 'react-bootstrap'

const columns = [
    {
        name: 'Num',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Nom du département',
        selector: row => row.intitule,
        sortable: true
    },
    {
        name: 'Nom du responsqble',
        selector: row => row.nom_responsable,
        sortable: true
    },
    {
        name: 'Prénom du responsqble',
        selector: row => row.prenom_responsable,
        sortable: true
    },
    {
        name: 'Date de création',
        selector: row => dateParser(row.created_at),
        sortable: true
    },
]

function Departements() {
    const handleClose = () => setShow(false)
    const handleShow = () => {
        getEmployees()
        setShow(true)
    }
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [departements, setDepartements] = useState([])
    const [data, setData] = useState([])
    const [departement, setDepartement] = useState({})
    const [employes, setEmployes] = useState([])

    useEffect(() => {
        getAllDepartements().then(() => setLoading(false))
    }, [])

    async function getAllDepartements() {
        await getDepartements(ecole_id, headers).then(res => {
            setDepartements(res)
            setData(res)
        })
    }

    async function getEmployees() {
        await getAllEmployes(ecole_id, headers).then(res => setEmployes(res))
    }

    function handleFilter() {
        const newData = departements.filter(row => {
            return row.intitule.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.nom_responsable.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.prenom_responsable.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        departement.ecole_id = ecole_id
        await addDepartement(departement, headers).then(res => {
            toast.success(res.message)
            handleClose()
            getAllDepartements()
            setLoading(false)
        })
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setDepartement({...departement, [name]: value})
    }

    return (
        <CCard>
            <ToastContainer />
            <CCardHeader>Tous les départements</CCardHeader>
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
                        <CButton className='btn-primary text-white' onClick={handleShow}>Ajouter un nouveau département</CButton>
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
                    <Modal.Title>Enregistrement d'un nouveau département</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Nom du département</Form.Label>
                            <Form.Control 
                                onChange={handleChange} 
                                name='intitule' 
                                type="text" 
                                className="form-control" 
                                required='true' 
                            />
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Nommez un responsable</Form.Label>
                            <Form.Select onChange={handleChange} name='responsable_id' className="form-control" required='true'>
                                <option>-- select --</option>
                                {employes.length > 0 && employes.map((emp, i) => (
                                    <option key={i} value={emp.id}>{emp.nom +' '+ emp.prenom}</option>
                                ))}
                            </Form.Select>
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

export default Departements