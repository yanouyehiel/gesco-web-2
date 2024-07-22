import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { getAllNotes } from '../../services/EnseignementController'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getClasses } from '../../services/MainControllerApi'
import { getAllStudents, getStudents } from '../../services/StudentController'
import { toast } from 'react-toastify'

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
  },
  {
    name: "Année scolaire",
    selector: row => row.annee_scolaire,
    sortable: true
  }
]

function Notes() {
  const [notes, setNotes] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [classes, setClasses] = useState([])
  const [students, setStudents] = useState([])
  const [classe, setClasse] = useState(0)
  const [student, setStudent] = useState(0)

  useEffect(() => {
    getNotes().then()
    getAllClasses().then()
    getAllStudents(ecole_id, headers).then((res) => {
      setStudents(res)
      setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }, [])

  async function getNotes() {
    await getAllNotes(ecole_id, headers).then((res) => {
      setNotes(res)
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

  const handleFilter = (e) => {
    const newData = notes.filter((note) => {
      return note.nom_matiere.toLowerCase().includes(e.toLowerCase()) || 
      note.nom_student.toLowerCase().includes(e.toLowerCase()) ||
      note.prenom_student.toLowerCase().includes(e.toLowerCase()) ||
      note.nom_classe.toLowerCase().includes(e.toLowerCase())
    })
    setData(newData)
  }

  const handleSubmit = () => {
    const classe_id = parseInt(classe)
    const student_id = parseInt(student)
    
    if (classe_id === 0 && student_id === 0) {
      setData(notes)
    } else {
      if (classe_id !== 0 && student_id !== 0) {
        const newCours = notes.filter((note) => (note.classe_id === classe_id && note.student_id === student_id))
        setData(newCours)
      } else {
        const newCours = notes.filter((note) => (note.classe_id === classe_id || note.student_id === student_id))
        setData(newCours)
      }
    }
  }
  return (
    <CCard className="mb-4">
        <CCardHeader>Toutes les notes</CCardHeader>
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
                      <Form.Select onChange={(e) => setClasse(e.target.value)} className="form-control" required='true'>
                        <option>Sélectionner une classe</option>
                        {classes.map((classe, i) => (
                          <option value={classe.id} key={i}>{classe.nom}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="form-group">
                      <Form.Select onChange={(e) => setStudent(e.target.value)} className="form-control" required='true'>
                        <option>Sélectionner un élève</option>
                        {students.map((student, i) => (
                          <option value={student.id} key={i}>{student.nom +' '+student.prenom}</option>
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