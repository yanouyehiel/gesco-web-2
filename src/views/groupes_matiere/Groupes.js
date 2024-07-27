import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CModal, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { addGroupeMatiere, getGroupeMatieres } from '../../services/MainControllerApi'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { toast, ToastContainer } from 'react-toastify'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'

const columns = [
    {
      name: 'Num',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Nom du groupe',
      selector: row => row.intitule,
      sortable: true
    },
    {
        name: 'Date de création',
        selector: row => dateParser(row.created_at),
        sortable: true
    },
]

function Groupes() {
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [groupes, setGroupes] = useState([])
    const [loading, setLoading] = useState(true)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [show, setShow] = useState(false)
    const [nom, setNom] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        getGroupe()
    }, [])

    const getGroupe = async () => {
        await getGroupeMatieres(ecole_id, headers).then((res) => {
            setGroupes(res)
            setData(res)
            setLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            intitule: nom,
            ecole_id: ecole_id
        }

        await addGroupeMatiere(data, headers).then((res) => {
            handleClose()
            toast.success(res.message)
            getGroupe()
        }, (err) => toast.error(err.response.data.message))
    }

    function handleFilter(e) {
        const newData = groupes.filter(row => {
            return row.intitule.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setData(newData)
    }

    return (
        <CCard>
            <ToastContainer />
            <CCardHeader>Les groupes de matières</CCardHeader>
            <CCardBody>
                <CTable>
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
                        <CCol><CButton className='bg-primary' onClick={handleShow}>Ajouter un groupe de matière</CButton></CCol>
                    </CRow>
                    <CRow>
                        {loading ? <CSpinner color='primary' /> :
                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                            pagination
                            highlightOnHover
                        />}
                    </CRow>
                </CTable>
            </CCardBody>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enregistrement d'un groupe de matières</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Nom de la salle</Form.Label>
                            <Form.Control 
                                onChange={(e) => setNom(e.target.value)} 
                                type="text" className="form-control" 
                                placeholder="Exemple: Groupe 1" required='true' 
                            />
                        </Form.Group>
                        <br/>
                        <CButton className='bg-primary' size='lg' type='submit' disabled={loading}>
                            {!loading ? 'Enregistrer' : 'Traitement...'}
                        </CButton>
                    </Form>
                </Modal.Body>
            </Modal>
        </CCard>
    )
}

export default Groupes