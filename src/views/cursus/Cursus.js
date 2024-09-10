import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addCursus, getCursus } from '../../services/MainControllerApi'
import { toast, ToastContainer } from 'react-toastify'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'
import { Form, Modal } from 'react-bootstrap'

const columns = [
    {
        name: 'Num',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Intitulé du cursus',
        selector: row => row.intitule,
        sortable: true
    },
    {
        name: 'Code du cursus',
        selector: row => row.code,
        sortable: true
    },
    {
        name: 'Date de création',
        selector: row => dateParser(row.created_at),
        sortable: true
    },
]

function Cursus() {
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [cursus, setCursus] = useState([])
    const [data, setData] = useState([])
    const [curs, setCurs] = useState({})

    useEffect(() => {
        getAllCursus().then(() => setLoading(false))
    }, [])

    async function getAllCursus() {
        await getCursus(ecole_id, headers).then(res => {
            setCursus(res)
            setData(res)
        })
    }

    function handleFilter() {
        const newData = cursus.filter(row => {
            return row.intitule.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        curs.ecole_id = ecole_id
        await addCursus(curs, headers).then(res => {
            toast.success(res.message)
            getAllCursus().then()
            handleClose()
            setLoading(false)
        })
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCurs({...curs, [name]: value})
    }

    return (
        <CCard>
            <ToastContainer />
            <CCardHeader>Tous les cursus</CCardHeader>
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
                        <CButton className='btn-primary text-white' onClick={handleShow}>Ajouter un nouveau cursus</CButton>
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
                    <Modal.Title>Enregistrement d'un cursus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Intitulé du cursus</Form.Label>
                            <Form.Control 
                                onChange={handleChange} 
                                name='intitule' 
                                type="text" 
                                className="form-control" 
                                required='true' 
                            />
                        </Form.Group>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Code du cursus</Form.Label>
                            <Form.Control 
                                onChange={handleChange} 
                                name='code' 
                                type="text" 
                                className="form-control"
                                placeholder='BTS GL' 
                                required='true' 
                            />
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

export default Cursus