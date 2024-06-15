import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addTarif, getAllTarifs, typesClasse } from '../../services/MainControllerApi';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Classe',
    selector: row => row.classe,
    sortable: true
  },
  {
    name: "Inscription",
    selector: row => row.inscription,
    sortable: true
  },
  {
    name: "Tranche 1",
    selector: row => row.premiere_tranche,
    sortable: true
  },
  {
    name: 'Tranche 2',
    selector: row => row.deuxieme_tranche,
    sortable: true
  },
  {
    name: 'Tranche 3',
    selector: row => row.troisieme_tranche,
    sortable: true
  }
]

function Tarifs() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [tarif, setTarif] = useState({})
  const [tarifs, setTarifs] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [data, setData] = useState([])

  useEffect(() => {
    getAllClasses()
    getTarifs().then(() => setLoading(false))
  }, [])

  async function getAllClasses() {
    await typesClasse(headers).then((res) => {
        setClasses(res)
    })
  }

  async function getTarifs() {
    await getAllTarifs(ecole_id, headers).then((res) => {
        setTarifs(res)
        setData(res)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setTarif({...tarif, [name]: value})
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    tarif.ecole_id = ecole_id;
    
    await addTarif(tarif, headers).then((res) => {
      setShow(false);
      toast.success(res.message)
      getTarifs().then(() => setLoading(false))
    })
  }

  const handleFilter = () => {
    const newData = tarifs.filter(row => {
      return row.classe.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  return (
    <CCard className="mb-4">
      <ToastContainer />
        <CCardHeader>Tarifs</CCardHeader>
        <CCardBody>
          <CTable>
            <CRow>
              <Col>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Rechercher un tarif"
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    onChange={handleFilter}
                  />
                </CInputGroup>
              </Col>
              <Col>
                <Button onClick={handleShow}>Ajouter un tarif</Button>
              </Col>
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
                >
                </DataTable>
              }
            </CRow>
          </CTable>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Enregistrement d'un tarif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Sélectionner une classe</Form.Label>
                      <Form.Select className="form-control" onChange={handleChange} name="type_classe_id">
                          <option>-- select --</option>
                          {classes.map((classe, i) => (
                              <option key={i} value={classe.id}>{classe.classe}</option>
                          ))}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Montant inscription</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="inscription" type="number" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Montant première tranche</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="premiere_tranche" type="number" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Montant deuxième tranche</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="deuxieme_tranche" type="number" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Montant troisième tranche</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="troisieme_tranche" type="number" required />
                  </Form.Group>
                  <br/>
                  <Button size='lg' type='submit' disabled={loading}>
                    {!loading ? 'Enregistrer' : 'Traitement...'}
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Tarifs