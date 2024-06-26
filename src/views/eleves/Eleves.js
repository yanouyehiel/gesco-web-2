import { CBadge, CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CNavLink, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addStudent, getStudents } from '../../services/StudentController'
import DataTable from 'react-data-table-component'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getAllParentsSchool, getClasses } from '../../services/MainControllerApi'


const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Parent',
    selector: row => row.parent_id,
    sortable: true,
    //cell: row => row.parent_id === null ? <CBadge color='danger' /> : <CBadge color='success' />
  },
  {
    name: 'Matricule',
    selector: row => row.matricule,
    sortable: true
  },
  {
    name: "Nom",
    selector: row => row.nom,
    sortable: true
  },
  {
    name: "Prénom",
    selector: row => row.prenom,
    sortable: true
  },
  {
    name: 'Date de naissance',
    selector: row => row.date_naissance,
    sortable: true
  },
  {
    name: 'Classe',
    selector: row => row.nom_classe,
    sortable: true
  },
  {
    name: 'Sexe',
    selector: row => row.sexe,
    sortable: true
  },
  {
    name: 'Action',
    cell: row => <CNavLink to={'/students/' + row.id} as={NavLink}>Voir</CNavLink>
  }
]

function Eleves() {
  const [students, setStudents] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show, setShow] = useState(false)
  const [student, setStudent] = useState({})
  const [classes, setClasses] = useState([])
  const [parents, setParents] = useState([])

  useEffect(() => {
    getStudents(ecole_id, headers).then((res) => {
      setStudents(res)
      setData(res)
    })
    getClasses(ecole_id, headers).then(res => {
      setClasses(res)
    })
    getParents().then(() => setLoading(false))
  }, [])

  async function getParents() {
    await getAllParentsSchool(ecole_id, headers).then((res) => {
      setParents(res)
    })
  }

  function handleFilter(event) {
    const newData = students.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) || 
      row.prenom.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setStudent({...student, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    student.ecole_id = getEcoleStored()

    await addStudent(student, headers).then((res) => {
        toast.success(res.message)
        handleClose()
        data.push(student)
        setLoading(false)
    }, (err) => {
        toast.error(err.response.data.message)
    })
  }

  return (
    <CCard className='mb-4'>
      <ToastContainer />
      <CCardHeader>Eleves</CCardHeader>
      <CCardBody>
        <CTable>
          <Row>
            <Col>
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
              <Button onClick={handleShow}>Ajouter un élève</Button>
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
            <Modal.Title>Enregistrement d'une élève</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Nom</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="nom" className="form-control" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Prénom</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="prenom" className="form-control" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Date de naissance</Form.Label>
                    <Form.Control type="date" onChange={handleChange} name="date_naissance" className="form-control" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Lieu de naissance</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="lieu_naissance" className="form-control" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Classe</Form.Label>
                    <Form.Select className="form-control" onChange={handleChange} name="classe_id" required>
                        <option value=''>-- select --</option>
                        {
                            classes.length > 0 && classes.map((classe, i) => (
                                <option key={i} value={classe.id}>{classe.nom}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Sexe</Form.Label>
                    <Form.Select className="form-control" onChange={handleChange} name="sexe" required>
                        <option value=''>-- select --</option>
                        <option value='Masculin'>Masculin</option>
                        <option value='Féminin'>Féminin</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Année de scolarisation</Form.Label>
                    <Form.Select className="form-control" onChange={handleChange} name="annee_scolaire" required>
                        <option value=''>-- select --</option>
                        <option value='2023 - 2024'>2023 - 2024</option>
                        <option value='2024 - 2025'>2024 - 2025</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Attribuer son parent</Form.Label>
                    <Form.Select className="form-control" onChange={handleChange} name="parent_id">
                        <option value=''>-- select --</option>
                        {
                          parents.length > 0 && parents.map((parent, i) => (
                            <option key={i} value={parent.id}>{parent.nom + ' ' + parent.prenom}</option>
                          ))
                        }
                    </Form.Select>
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

export default Eleves