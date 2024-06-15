import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { getAllNotes } from '../../services/EnseignementController'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Nom de la matière',
    selector: row => row.nom_matiere,
    sortable: true
  },
  {
    name: "Nom de l'élève",
    selector: row => row.nom_student + ' ' + row.prenom_student,
    sortable: true
  },
  {
    name: "Note",
    selector: row => row.note,
    sortable: true
  },
  {
    name: "Classe",
    selector: row => row.nom_classe,
    sortable: true
  },
  {
    name: "Séquence",
    selector: row => row.sequence,
    sortable: true
  }
]

function Notes() {
  const [notes, setNotes] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const ecole_id = getEcoleStored()
  const headers = getHeaders()

  useEffect(() => {
    getNotes().then()
  }, [])

  async function getNotes() {
    await getAllNotes(ecole_id, headers).then((res) => {
      setNotes(res)
      setData(res)
      setLoading(false)
    })
  }

  const handleFilter = (e) => {

  }

  const handleSubmit = () => {

  }
  return (
    <CCard className="mb-4">
        <CCardHeader>Notes</CCardHeader>
        <CCardBody>
          <CTable>
            <Row>
              <Col xs={3}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleFilter(e.target.value)}
                  />
                </CInputGroup>
              </Col>
              <Col xs={9}>
                <Row>
                  <Col>
                    <Form.Group className="form-group">
                      <Form.Select className="form-control" required='true'>
                        <option>Sélectionner une classe</option>
                        
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="form-group">
                      <Form.Select className="form-control" required='true'>
                        <option>Sélectionner une classe</option>
                        
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
            </Row>
          </CTable>
        </CCardBody>
    </CCard>
  )
}

export default Notes