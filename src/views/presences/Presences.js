import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getAllPresences } from '../../services/EnseignementController'
import { getClasses } from '../../services/MainControllerApi'
import { dateParser } from '../../utils/functions'

function Presences() {
  const [loading, setLoading] = useState(true)
  const [presences, setPresences] = useState([])
  const [classes, setClasses] = useState([])
  const [data, setData] = useState([])
  const [classe, setClasse] = useState(0)
  const ecole_id = getEcoleStored()
  const headers = getHeaders()

  useEffect(() => {
    getPresences().then()
    getAllClasses().then(() => setLoading(false))
  }, [])

  async function getPresences() {
    await getAllPresences(ecole_id, headers).then((res) => {
      setPresences(res)
      setData(res)
    })
  }

  async function getAllClasses() {
    await getClasses(ecole_id, headers).then((res) => {
      setClasses(res)
    })
  }

  const handleSubmit = () => {
    const id = parseInt(classe)
    if (id === 0) {
      setPresences(data)
    } else {
      const newPresences = data.filter((presence) => presence.classe_id === id)
      setPresences(newPresences)
    }
  }

  const handleFilter = (e) => {
    const newData = data.filter((presence) => presence.nom_classe.toLowerCase().includes(e.toLowerCase()) || presence.nom_student.toLowerCase().includes(e.toLowerCase()) || presence.prenom_student.toLowerCase().includes(e.toLowerCase()))
    setPresences(newData)
  }

  return (
    <CCard className="mb-4">
        <CCardHeader>Toutes les présences enregistrées</CCardHeader>
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
                        <option value={classe.id}>{classe.nom}</option>
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
          <Row>
            {!loading ? (presences.length > 0 ? presences.map((presence, i) => (
              <Col xs={3} key={i}>
                <CCard className='mb-4' onClick={() => handleShow(presence)}>
                  <CCardBody>
                    <h5 className='text-primary'>{presence.nom_student +' '+ presence.prenom_student}</h5>
                    <span className='text-danger'>{presence.periode}</span>
                    <span style={{marginLeft: '30px'}} className='text-success'>{presence.nom_classe}</span>
                    <p><em>{"Enregistré le " + dateParser(presence.created_at)}</em></p>
                    <h5>{presence.titre}</h5>
                  </CCardBody>
                </CCard>
              </Col>
            )) : <p className='text-center' style={{fontSize: '18px'}}>Aucune donnée</p>) : <CSpinner color='primary' />}
          </Row>
        </CCardBody>
    </CCard>
  )
}

export default Presences