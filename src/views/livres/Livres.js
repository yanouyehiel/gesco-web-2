import { CButton, CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addLivre, deleteLivre, getLivres } from '../../services/MainControllerApi'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'
import { ToastContainer, toast } from 'react-toastify'

function Livres() {
  const [livres, setLivres] = useState([])
  const [loading, setLoading] = useState(true)
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [livre, setLivre] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    getAllLivres().then(() => setLoading(false))
  }, [])

  async function getAllLivres() {
    getLivres(ecole_id, headers).then(res => {
      setLivres(res)
      setData(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  function handleFilter(event) {
    const newData = livres.filter(row => {
      return row.intitule.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  async function SupprimerLivre(id) {
    setLoading(true)
    
    await deleteLivre(id, headers).then((res) => {
      toast.success(res)
      getAllLivres().then(() => setLoading(false))
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setLivre({...livre, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    livre.ecole_id = ecole_id

    await addLivre(livre, headers).then((res) => {
      toast.success(res.message)
      handleClose()
      getAllLivres().then(() => setLoading(false))
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
      name: 'Nom du livre',
      selector: row => row.intitule,
      sortable: true
    },
    {
      name: "Date d'enregistrement",
      selector: row => dateParser(row.created_at),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <Button disabled={true} className="btn-danger text-white" onClick={() => SupprimerLivre(row.id)}>Supprimer</Button>
    }
  ]
  

  return (
    <CCard className="mb-4">
      <ToastContainer />
      <CCardHeader>Livres</CCardHeader>
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
              <Button onClick={handleShow}>Ajouter un livre</Button>
            </Col>
          </Row>
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
        </CTable>
      </CCardBody>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Enregistrement d'un livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Nom du livre</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="intitule" className="form-control" required='true' />
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

export default Livres