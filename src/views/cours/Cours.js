import { CCard, CCardBody, CCardHeader, CFormInput, CFormSelect, CInputGroup, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getAllCours } from '../../services/EnseignementController'
import { getClasses } from '../../services/MainControllerApi'
import { Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { dateParser } from '../../utils/functions'

function Cours() {
  const [loading, setLoading] = useState(true)
  const [cours, setCours] = useState([])
  const [cour, setCour] = useState({})
  const [classes, setClasses] = useState([])
  const [data, setData] = useState([])
  const [classe, setClasse] = useState(0)
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [show, setShow] = useState(false)
  const handleShow = (cour) => {
    setShow(true)
    setCour(cour)
  }
  const handleClose = () => setShow(false)

  useEffect(() => {
    getCours().then()
    getAllClasses().then(() => setLoading(false))
  }, [])

  async function getCours() {
    await getAllCours(ecole_id, headers).then((res) => {
      setCours(res)
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
      setCours(data)
    } else {
      const newCours = data.filter((cour) => cour.classe_id === id)
      setCours(newCours)
    }
  }

  const handleFilter = (e) => {
    const newData = data.filter((cour) => cour.nom_matiere.toLowerCase().includes(e.toLowerCase()) || cour.titre.toLowerCase().includes(e.toLowerCase()))
    setCours(newData)
  }

  return (
    <CCard className="mb-4">
        <CCardHeader>Tous les cours enregistrés</CCardHeader>
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
            xl={{ cols: 5 }}
          >
            {!loading ? (cours.length > 0 ? cours.map((cour, i) => (
              <Col key={i}>
                <CCard onClick={() => handleShow(cour)} style={{ cursor: 'pointer' }}>
                  <CCardBody>
                    <h5 className='text-primary'>{cour.nom_matiere}</h5>
                    <span>{dateParser(cour.created_at)}</span>
                    <h5>{cour.titre}</h5>
                  </CCardBody>
                </CCard>
              </Col>
            )) : <p className='text-center' style={{fontSize: '18px'}}>Aucune donnée</p>) : <CSpinner color='primary' />}
          </CRow>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Info Cours</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5><b>{cour.titre}</b></h5>
            <p style={{fontSize: '18px'}}>{cour.description}</p>
            <p style={{fontSize: '18px'}} className='text-primary'>{cour.nom_matiere}</p>
            <p style={{fontSize: '18px'}} className='text-success'>{cour.nom_teacher +' '+ cour.prenom_teacher}</p>
            <p>Enregistré le <b>{dateParser(cour.created_at)}</b></p>
          </Modal.Body>
        </Modal>
    </CCard>
  )
}

export default Cours