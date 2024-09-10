import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { toast, ToastContainer } from 'react-toastify'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addTypeClasse, typesClasseById } from '../../services/MainControllerApi'
import { dateParser } from '../../utils/functions'

const columns = [
    {
        name: 'Num',
        selector: row => row.id,
        sortable: true
    },
    {
        name: 'Nom du type de la classe',
        selector: row => row.classe,
        sortable: true
    },
    {
        name: 'Date de création',
        selector: row => dateParser(row.created_at),
        sortable: true
    },
]

function TypeClasses() {
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [show, setShow] = useState(false)
    const [typeClasses, setTypeClasses] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [typeClasse, setTypeClasse] = useState(null)
    const ecole_id = getEcoleStored()
    const headers = getHeaders()

    useEffect(() => {
        getTypesClasse().then()
    }, [])

    async function getTypesClasse() {
        await typesClasseById(ecole_id, headers).then(res => {
            setTypeClasses(res)
            setData(res)
            setLoading(false)
        })
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setTypeClasse({...typeClasse, [name]: value})
    }

    function handleFilter() {
        const newData = typeClasses.filter(row => {
            return row.classe.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        typeClasse.ecole_id = ecole_id
        await addTypeClasse(typeClasse, headers).then(res => {
            toast.success(res.message)
            getTypesClasse().then()
            setLoading(false)
            handleClose()
        })
    }

    return (
        <CCard>
            <ToastContainer />
            <CCardHeader>Types de Classes</CCardHeader>
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
                        <CButton className='btn-primary text-white' onClick={handleShow}>
                            Ajouter un type de classe
                        </CButton>
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
                    <Modal.Title>Enregistrement d'un type classe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group mt-4">
                            <Form.Label className="control-label">Nom du type de la classe</Form.Label>
                            <Form.Control 
                                onChange={handleChange} 
                                name='classe' 
                                type="text" 
                                className="form-control" 
                                placeholder="Exemple: GL1" 
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

export default TypeClasses