import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CInputGroup, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addTarif, getAllTarifs, typesClasse, updateTarif } from '../../services/MainControllerApi';
import DataTable from 'react-data-table-component';


function Tarifs() {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [tarif, setTarif] = useState({})
  const [tarifs, setTarifs] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [data, setData] = useState([])
  const [newData, setNewData] = useState({})

  useEffect(() => {
    getAllClasses()
    getTarifs().then(() => setLoading(false))
  }, [])

  async function getAllClasses() {
    await typesClasse(headers).then((res) => {
        setClasses(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getTarifs() {
    await getAllTarifs(ecole_id, headers).then((res) => {
      setTarifs(res)
      setData(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setTarif({...tarif, [name]: value})
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleSubmit = async(e) => {
    e.preventDefault();
    tarif.ecole_id = ecole_id;
    const data = tarifs.filter(t => t.type_classe_id === tarif.type_classe_id)
    if (data) {
      toast.error("Le tarif de cette classe existe déjà")
    } else {
      setLoading(true)
      await addTarif(tarif, headers).then((res) => {
        setShow(false);
        toast.success(res.message)
        getTarifs().then(() => setLoading(false))
      }, (error) => {
        toast.error(error.response.data.message)
      })
    }
  }

  const handleFilter = () => {
    const newData = tarifs.filter(row => {
      return row.classe.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleUpdate = (data) => {
    setNewData(data)
    handleShowUpdate()
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      id: newData.id,
      inscription: tarif.inscription === undefined ? parseInt(newData.inscription) : parseInt(tarif.inscription),
      premiere_tranche: tarif.premiere_tranche === undefined ? parseInt(newData.premiere_tranche) : parseInt(tarif.premiere_tranche),
      deuxieme_tranche: tarif.deuxieme_tranche === undefined ? parseInt(newData.deuxieme_tranche) : parseInt(tarif.deuxieme_tranche),
      troisieme_tranche: tarif.troisieme_tranche === undefined ? parseInt(newData.troisieme_tranche) : parseInt(tarif.troisieme_tranche),
    }
    await updateTarif(data, headers).then((res) => {
      toast.success(res.message)
      getTarifs().then(() => setLoading(false))
      handleCloseUpdate()
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

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
      selector: row => row.inscription + ' FCFA',
      sortable: true
    },
    {
      name: "Tranche 1",
      selector: row => row.premiere_tranche + ' FCFA',
      sortable: true
    },
    {
      name: 'Tranche 2',
      selector: row => row.deuxieme_tranche + ' FCFA',
      sortable: true
    },
    {
      name: 'Tranche 3',
      selector: row => row.troisieme_tranche + ' FCFA',
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <Button onClick={() => handleUpdate(row)} className='text-white'>Modifier</Button>
    }
  ]

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
                      <Form.Select className="form-control" onChange={handleChange} name="type_classe_id" required>
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

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Tarif de la <b>{newData.classe}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Montant inscription</Form.Label>
                  <Form.Control onChange={handleChange} className="form-control" 
                    name="inscription" type="number"
                    placeholder={newData.inscription} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Montant première tranche</Form.Label>
                  <Form.Control onChange={handleChange} className="form-control" 
                    name="premiere_tranche" type="number"
                    placeholder={newData.premiere_tranche} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Montant deuxième tranche</Form.Label>
                  <Form.Control onChange={handleChange} className="form-control" 
                    name="deuxieme_tranche" type="number"
                    placeholder={newData.deuxieme_tranche} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Montant troisième tranche</Form.Label>
                  <Form.Control onChange={handleChange} className="form-control" 
                    name="troisieme_tranche" type="number"
                    placeholder={newData.troisieme_tranche} />
              </Form.Group>
              <br/>
              <Button size='lg' type='submit' disabled={loading}>
                {!loading ? 'Modifier' : 'Traitement...'}
              </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Tarifs