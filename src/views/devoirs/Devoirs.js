import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getClasses } from '../../services/MainControllerApi'
import { getAllDevoirs } from '../../services/EnseignementController'
import { dateParser } from '../../utils/functions'

function Devoirs() {
  const [loading, setLoading] = useState(true)
  const [devoirs, setDevoirs] = useState([])
  const [classes, setClasses] = useState([])
  const [classe, setClasse] = useState(0)
  const [data, setData] = useState([])
  const [devoir, setDevoir] = useState({})
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [show, setShow] = useState(false)
  const handleShow = (devoir) => {
    setShow(true)
    setDevoir(devoir)
  }
  const handleClose = () => setShow(false)

  useEffect(() => {
    getDevoirs().then()
    getAllClasses().then(() => setLoading(false))
  }, [])

  async function getDevoirs() {
    await getAllDevoirs(ecole_id, headers).then((res) => {
      setDevoirs(res)
      setData(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getAllClasses() {
    await getClasses(ecole_id, headers).then((res) => {
      setClasses(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleSubmit = () => {
    const id = parseInt(classe)
    if (id === 0) {
      setDevoirs(data)
    } else {
      const newDevoirs = data.filter((presence) => presence.classe_id === id)
      setDevoirs(newDevoirs)
    }
  }

  const handleFilter = (e) => {
    const newData = data.filter((devoir) => devoir.nom_classe.toLowerCase().includes(e.toLowerCase()) || devoir.nom_matiere.toLowerCase().includes(e.toLowerCase()) || devoir.nom_livre.toLowerCase().includes(e.toLowerCase()))
    setDevoirs(newData)
  }

  return (
    <CCard className="mb-4">
        <CCardHeader>Devoirs</CCardHeader>
        <CCardBody>
          <Row>
            <Col xs={6}>
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="Rechercher"
                  aria-label="Rechercher"
                  aria-describedby="basic-addon1"
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </CInputGroup>
            </Col>
            <Col xs={6}>
              <Row>
                <Col>
                  <Form.Group className="form-group">
                    <Form.Select onChange={(e) => setClasse(e.target.value)} className="form-control" required='true'>
                      <option>Sélectionner une classe</option>
                      {classes.map((classe, i) => (
                        <option value={classe.id} key={i}>{classe.nom}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant='primary' type='submit' className='text-white' onClick={handleSubmit}>Appliquer</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 4 }}
          >
            {!loading ? (devoirs.length > 0 ? devoirs.map((devoir, i) => (
              <Col key={i}>
                <CCard className='mb-4' onClick={() => handleShow(devoir)} style={{cursor: 'pointer'}}>
                  <CCardBody>
                    <h5 className='text-primary'>{devoir.nom_livre}</h5>
                    <span className='text-danger'>{devoir.nom_matiere}</span>
                    <span style={{marginLeft: '30px'}} className='text-success'>{devoir.nom_classe}</span>
                    <p>{"Enregistré le " + dateParser(devoir.created_at)}</p>
                  </CCardBody>
                </CCard>
              </Col>
            )) : <p className='text-center' style={{fontSize: '18px'}}>Aucune donnée</p>) : <CSpinner color='primary' />}
          </CRow>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Info Devoir</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className='text-primary'><b>{devoir.nom_matiere}</b></h5>
            <p style={{fontSize: '18px'}}>{devoir.nom_livre}</p>
            <p style={{fontSize: '18px'}}>{'Page ' + devoir.num_page}</p>
            <p style={{fontSize: '18px'}}>{'Exercice ' + devoir.num_exo}</p>
            <p style={{fontSize: '18px'}} className='text-success'>{devoir.nom_classe}</p>
            <p>Enregistré le <b>{dateParser(devoir.created_at)}</b></p>
          </Modal.Body>
        </Modal>
    </CCard>
  )
}

export default Devoirs