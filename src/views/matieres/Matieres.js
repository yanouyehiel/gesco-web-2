import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addMatiere, getAllMatieres } from '../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Nom de la matière',
    selector: row => row.intitule,
    sortable: true
  },
  {
    name: 'Code de la matière',
    selector: row => row.code,
    sortable: true
  },
  {
    name: 'Date de création',
    selector: row => dateParser(row.created_at),
    sortable: true
  }
]

function Matieres() {
  const [matieres, setMatieres] = useState([])
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const headers = getHeaders()
  const ecole_id = getEcoleStored()
  const [matiere, setMatiere] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllMatieres(ecole_id, headers)
    .then(res => {
      setMatieres(res)
      setData(res)
      setLoading(false)
    })
  }, [])

  function handleFilter(event) {
    const newData = matieres.filter(row => {
      return row.intitule.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.code.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setMatiere({...matiere, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    matiere.ecole_id = ecole_id
    
    await addMatiere(matiere, headers).then((res) => {
      setShow(false);
      toast.success(res.message)
      data.push(res?.data)
      setLoading(false)
    }, (err) => {
      toast.error(err.response.data.message)
    }) 
  }

  return (
    <CCard className="mb-4">
      <ToastContainer />
      <CCardHeader>Matières</CCardHeader>
      <CCardBody>
        <CTable>
          <Row>
            <Col xs={6}>
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
              <Button onClick={handleShow}>Ajouter une matière</Button>
            </Col>
          </Row>
          <Row>
            {loading ? <CSpinner color='primary ml-4' /> :
              <DataTable
                columns={columns}
                data={data}
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
              <Modal.Title>Enregistrement d'une matiere</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Intitule de la matiere</Form.Label>
                      <Form.Control onChange={handleChange} name='intitule' type="text" 
                          className="form-control" placeholder="Exemple: Calcul Rapide" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Code de la matiere</Form.Label>
                      <Form.Control onChange={handleChange} name='code' type="text" 
                      className="form-control" placeholder="" required />
                  </Form.Group>
                  <br/>
                  <Button size='lg' type='submit' disabled={loading ? true : false}>
                    {loading && <CSpinner />} Enregistrer
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Matieres