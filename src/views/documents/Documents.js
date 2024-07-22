import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { askDocument, getDocumentsAsked, validateRequest } from '../../services/MainControllerApi';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { getAllStudents, getStudents } from '../../services/StudentController';
import DataTable from 'react-data-table-component';
import { dateParser, dateParserTime } from '../../utils/functions'

function Documents() {
  const [show, setShow] = useState(false);
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [students, setStudents] = useState([])
  const [doc, setDoc] = useState({})
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingB, setLoadingB] = useState(false)


  useEffect(() => {
    getAllStudents(ecole_id, headers).then((res) => setStudents(res))
    getDocuments().then(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validate(data) {
    setLoadingB(true)
    validateRequest(data, headers)
    .then((res) => {
      setLoading(true)
      setLoadingB(false)
      toast.success(res.message)
      getDocuments().then(() => setLoading(false))
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doc.ecole_id = ecole_id       
    setLoading(true)
    setShow(false)
    askDocument(doc, headers).then((res) => {
      toast.success(res.message)
      getDocuments().then(() => setLoading(false))
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setDoc({...doc, [name]: value})
  }

  async function getDocuments() {
    await getDocumentsAsked(ecole_id, headers).then((res) => {
      setDocuments(res)
    })
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleFilter = () => {

  }

  const columns = [
    {
      name: 'Intitulé',
      selector: row => row.intitule,
      sortable: true
    },
    {
      name: "Noms et prénoms de l'élève",
      selector: row => row.nom_student +' '+row.prenom_student,
      sortable: true
    },
    {
      name: 'Année Scolaire',
      selector: row => row.annee_scolaire,
      sortable: true
    },
    {
      name: 'Date de requête',
      selector: row => dateParser(row.created_at),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <Button onClick={() => validate(row)} type='button'>{loadingB ? 'Traitement...' : 'Valider'}</Button>
    }
  ]

  return (
    <CCard className="mb-4">
      <ToastContainer />
        <CCardHeader>Documents demandés</CCardHeader>
        <CCardBody>
          <CTable>
            <Row>
              <Col>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    onChange={handleFilter}
                  />
                </CInputGroup>
              </Col>
              <Col>
                <Button onClick={handleShow}>Enregistrer une demande</Button>
              </Col>
            </Row>
            <Row>
              {loading ? <CSpinner color='primary' /> :
                <DataTable
                  columns={columns}
                  data={documents}
                  fixedHeader
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                >
                </DataTable>
              }
            </Row>
          </CTable>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Formulaire de requête d'un document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Type de document</Form.Label>
                      <Form.Select className="form-control" name="intitule" onChange={handleChange} required>
                          <option>-- select --</option>
                          <option value="Requête d'un bulletin de notes">Requête d'un bulletin de notes</option>
                          <option value="Requête d'une autorisation de sortie">Requête d'une autorisation de sortie</option>
                          <option value="requête d'un certificat de scolarité">Requête d'un certificat de scolarité</option>
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Choisissez l'année scolaire</Form.Label>
                      <Form.Select className="form-control" name="annee_scolaire" onChange={handleChange} required>
                          <option>-- select --</option>
                          <option value="2024-2025">2024-2025</option>
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group mt-4 mb-4">
                      <Form.Label className="control-label">Sélectionner l'élève</Form.Label>
                      <Form.Select className="form-control" name="student_id" onChange={handleChange} required>
                          <option>-- select --</option>
                          {students.length > 0 &&
                              students.map((student, i) => (
                                  <option key={i} value={student.id}>{student.nom +' '+ student.prenom}</option>
                              ))
                          }
                      </Form.Select>
                  </Form.Group>
                  
                  <Button size='lg' type='submit'>
                      Demander
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Documents