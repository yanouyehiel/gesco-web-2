import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { getAllNotes, getStudentsOfClasse } from '../../services/EnseignementController'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getClasses } from '../../services/MainControllerApi'
import { getAllStudents } from '../../services/StudentController'
import { toast } from 'react-toastify'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Matière',
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
  const [classe, setClasse] = useState('')
  const [student, setStudent] = useState('')
  const [loadingStudents, setLoadingStudents] = useState(false)

  useEffect(() => {
    getNotes().then(() => setLoading(false))
    getAllClasses()
  }, [])

  async function getNotes() {
    try {
      const res = await getAllNotes(ecole_id, headers)
      setNotes(res)
      setData(res)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors du chargement des notes')
    }
  }

  async function getAllClasses() {
    try {
      const res = await getClasses(ecole_id, headers)
      setClasses(res)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors du chargement des classes')
    }
  }

  const handleClasseChange = async (e) => {
    const selectedClasseId = e.target.value
    setClasse(selectedClasseId)
    setStudent('') // reset sélection élève

    if (selectedClasseId) {
      setLoadingStudents(true)
      try {
        const studentsOfClasse = await getStudentsOfClasse(selectedClasseId, ecole_id, headers)
        setStudents(studentsOfClasse)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors du chargement des élèves')
        setStudents([])
      } finally {
        setLoadingStudents(false)
      }
    } else {
      setStudents([])
    }
  }


  const handleStudentChange = (e) => {
    setStudent(e.target.value)
  }

  const handleFilter = (e) => {
    const search = e.toLowerCase()
    const newData = notes.filter((note) => {
      return (
        note.nom_matiere.toLowerCase().includes(search) ||
        note.nom_student.toLowerCase().includes(search) ||
        note.prenom_student.toLowerCase().includes(search) ||
        note.nom_classe.toLowerCase().includes(search)
      )
    })
    setData(newData)
  }

  const handleSubmit = () => {
    const classe_id = parseInt(classe)
    const student_id = parseInt(student)

    if ((!classe_id || classe_id === 0) && (!student_id || student_id === 0)) {
      setData(notes)
    } else {
      if (classe_id && student_id) {
        const filtered = notes.filter(note => note.classe_id === classe_id && note.student_id === student_id)
        setData(filtered)
      } else if (classe_id) {
        const filtered = notes.filter(note => note.classe_id === classe_id)
        setData(filtered)
      } else if (student_id) {
        const filtered = notes.filter(note => note.student_id === student_id)
        setData(filtered)
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
                    <Form.Select onChange={handleClasseChange} className="form-control" required value={classe}>
                      <option value="">Sélectionner une classe</option>
                      {classes.map((classeItem, i) => (
                        <option value={classeItem.id} key={i}>{classeItem.nom}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="form-group">
                    <Form.Select 
                      onChange={handleStudentChange} 
                      className="form-control" 
                      required 
                      value={student} 
                      disabled={loadingStudents || students.length === 0}
                    >
                      <option value="">{loadingStudents ? 'Chargement...' : 'Sélectionner un élève'}</option>
                      {!loadingStudents && students.map((studentItem, i) => (
                        <option value={studentItem.id} key={i}>{studentItem.nom + ' ' + studentItem.prenom}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant='primary' type='button' className='text-white' onClick={handleSubmit}>Appliquer</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <CSpinner color='primary' />
            ) : (
              <DataTable
                columns={columns}
                data={data}
                fixedHeader
                pagination
                selectableRowsHighlight
                highlightOnHover
              />
            )}
          </Row>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Notes