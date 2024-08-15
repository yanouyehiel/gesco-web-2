import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast, ToastContainer } from 'react-toastify'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addSequence, addTrimestre, getSequences, getTrimestres } from '../../services/MainControllerApi'
import { Form, Modal } from 'react-bootstrap'
import { dateParser } from '../../utils/functions'

const columns = [
    {
      name: 'Numéro',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Intitulé',
      selector: row => row.intitule,
      sortable: true
    },
    {
      name: "Date de création",
      selector: row => dateParser(row.created_at),
      sortable: true
    }
]

const columnsSeq = [
    {
      name: 'Numéro',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Intitulé',
      selector: row => row.intitule,
      sortable: true
    },
    {
        name: 'Trimestre',
        selector: row => row.intitule_trimestre,
        sortable: true
    },
    {
      name: "Date de création",
      selector: row => dateParser(row.created_at),
      sortable: true
    }
]

function TrimestreSequences() {
    const [trimestres, setTrimestres] = useState([])
    const [sequences, setSequences] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [loading, setLoading] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [intitule, setIntitule] = useState("")
    const [showSeq, setShowSeq] = useState(false);
    const handleCloseSeq = () => setShowSeq(false);
    const handleShowSeq = () => setShowSeq(true);
    const [trimestre, setTrimestre] = useState(0)


    useEffect(() => {
        fetchTrimestres()
        fetchSequences()
    }, [])

    async function fetchTrimestres() {
        await getTrimestres(ecole_id, headers).then((res) => {
            setTrimestres(res)
            setLoading(false)
        })
    }

    async function fetchSequences() {
        await getSequences(ecole_id, headers).then((res) => {
            setSequences(res)
            setLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingSubmit(true)
        const data = {
            intitule: intitule,
            ecole_id: parseInt(ecole_id)
        }
        await addTrimestre(data, headers).then((res) => {
            toast.success(res.message)
            handleClose()
            setLoading(true)
            fetchTrimestres().then(() => setLoading(false))
        })
        setLoadingSubmit(false)
    }

    const handleSubmitSeq = async (e) => {
        e.preventDefault()
        setLoadingSubmit(true)
        const data = {
            intitule: intitule,
            trimestre_id: parseInt(trimestre),
            ecole_id: parseInt(ecole_id)
        }
        if (data.trimestre_id <= 0) {
            toast.error("Veuillez sélectionner un trimestre ou en enregistrer.")
        } else {
            await addSequence(data, headers).then((res) => {
                toast.success(res.message)
                setTrimestre(0)
                handleCloseSeq()
                setLoading(true)
                fetchSequences().then(() => setLoading(false))
            })
        }
        setLoadingSubmit(false)
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <CCard className="mb-4">
                <CCardHeader>Tous les trimestres de l'école</CCardHeader>
                <CCardBody>
                    <CTable>
                        <CRow className="mb-4">
                            <CCol>
                                <CButton className='btn btn-primary' onClick={handleShow}>Ajouter un trimestre</CButton>
                            </CCol>
                        </CRow>
                        <CRow>
                        {loading ? <CSpinner color='primary' /> :
                            <DataTable
                            columns={columns}
                            data={trimestres}
                            fixedHeader
                            pagination
                            selectableRowsHighlight
                            highlightOnHover
                            >
                            </DataTable>
                        }
                        </CRow>
                    </CTable>
                </CCardBody>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enregistrement de l'Intitulé d'un trimestre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="form-group mt-4">
                                <Form.Label className="control-label">Intitulé</Form.Label>
                                <Form.Control onChange={(e) => setIntitule(e.target.value)} className="form-control" type="text" required />
                            </Form.Group>
                            <br/>
                            <CButton className='btn btn-primary' size='lg' type='submit' disabled={loadingSubmit}>
                                {!loadingSubmit ? 'Enregistrer' : 'Traitement...'}
                            </CButton>
                        </Form>
                    </Modal.Body>
                </Modal>
            </CCard>
            <CCard className="mb-4">
                <CCardHeader>Toutes les séquences de l'école</CCardHeader>
                <CCardBody>
                    <CTable>
                        <CRow className="mb-4">
                            <CCol>
                                <CButton className='btn btn-primary' onClick={handleShowSeq}>Ajouter une séquence</CButton>
                            </CCol>
                        </CRow>
                        <CRow>
                        {loading ? <CSpinner color='primary' /> :
                            <DataTable
                            columns={columnsSeq}
                            data={sequences}
                            fixedHeader
                            pagination
                            selectableRowsHighlight
                            highlightOnHover
                            >
                            </DataTable>
                        }
                        </CRow>
                    </CTable>
                </CCardBody>

                <Modal show={showSeq} onHide={handleCloseSeq}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enregistrement de l'Intitulé d'une séquence</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmitSeq}>
                            <Form.Group className="form-group mt-4">
                                <Form.Label className="control-label">Intitulé</Form.Label>
                                <Form.Control onChange={(e) => setIntitule(e.target.value)} className="form-control" type="text" required />
                            </Form.Group>
                            <Form.Group className="form-group mt-4">
                                <Form.Label className="control-label">A quel trimestre appartient-il ?</Form.Label>
                                <Form.Select className="form-control" onChange={(e) => setTrimestre(e.target.value)} name="type_classe_id" required>
                                    <option>-- select --</option>
                                    {trimestres.map((trim, i) => (
                                        <option key={i} value={trim.id}>{trim.intitule}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <br/>
                            <CButton className='btn btn-primary' size='lg' type='submit' disabled={loadingSubmit}>
                                {!loadingSubmit ? 'Enregistrer' : 'Traitement...'}
                            </CButton>
                        </Form>
                    </Modal.Body>
                </Modal>
            </CCard>
        </React.Fragment>
    )
}

export default TrimestreSequences