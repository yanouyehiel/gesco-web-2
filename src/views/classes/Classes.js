import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CInputGroup, CTableBody, CTableDataCell, CSpinner, CNavLink } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getClasses, typesClasse, addClasse, deleteClasse } from '../../services/MainControllerApi'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import AxiosApi from '../../services/AxiosApi'
import DataTable from 'react-data-table-component'
import { colors } from '../../utils/colors'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { getTeachers } from '../../services/EnseignementController'
import { NavLink } from 'react-router-dom'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Nom de la classe',
    selector: row => row.nom,
    sortable: true
  },
  {
    name: "Nom de l'enseignant",
    selector: row => row.nom_teacher,
    sortable: true
  },
  {
    name: "Prénom de l'enseignant",
    selector: row => row.prenom_teacher,
    sortable: true
  },
  {
    name: 'Ecole',
    selector: row => row.nom_ecole,
    sortable: true
  },
  {
    name: 'Effectif',
    selector: row => row.effectif,
    sortable: true
  },
  {
    name: 'Action',
    cell: row => <CNavLink to={'/classes/' + row.id} as={NavLink}>Voir</CNavLink>
  }
]

const Classes = () => {
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [data, setData] = useState([])
  const [typeClasses, setTypeClasses] = useState([])
  const [classe, setClasse] = useState({})
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show, setShow] = useState(false)
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    AxiosApi.get('/get-classes-school/' + ecole_id, {headers})
      .then(res => {
        setClasses(res.data)
        setData(res.data)
      })
    
    typesClasse(headers).then(res => {
      setTypeClasses(res)
    })

    getTeachers(ecole_id, headers).then(res => {
      setTeachers(res)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!classe.teacher_id) {
      toast.error("Veuillez lui attribuer en enseignant principale")
    } else {
      setLoading(true)
      classe.ecole_id = ecole_id
      await addClasse(classe, headers).then(res => {
          handleClose()
          setLoading(false)
          toast.success(res.message)
      });
    }
  }

  function handleFilter(event) {
    const newData = classes.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.nom_teacher.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom_teacher.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setClasse({...classe, [name]: value})
  }

  async function handleDeleteClasse(id) {
    setLoading(true)
    await deleteClasse(id, headers).then((res) => {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        const newClasses = classes.filter(c => c.id !== id)
        setClasses(newClasses)
        setLoading(false)
    })
  }

  return (
    <CCard>
        <ToastContainer />
        <CCardHeader>Classes</CCardHeader>
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
                <Button onClick={handleShow}>Ajouter une salle</Button>
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
              <Modal.Title>Enregistrement d'une classe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Nom de la salle</Form.Label>
                      <Form.Control onChange={handleChange} name='nom' type="text" className="form-control" placeholder="Exemple: SIL A" required='true' />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Sélectionner le type de classe</Form.Label>
                      <Form.Select onChange={handleChange} name='type_classe_id' className="form-control" required='true'>
                          <option>-- select --</option>
                          {typeClasses.length > 0 && typeClasses.map((typeClasse, i) => (
                              <option key={i} value={typeClasse.id}>{typeClasse.classe}</option>
                          ))}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Nommer un enseignant principal</Form.Label>
                      <Form.Select onChange={handleChange} name='teacher_id' className="form-control" required='true'>
                          <option>-- select --</option>
                          {teachers.length > 0 && teachers.map((teacher, i) => (
                              <option key={i} value={teacher.id}>{teacher.nom + ' ' + teacher.prenom}</option>
                          ))}
                      </Form.Select>
                  </Form.Group>
                  <br/>
                  <Button size='lg' type='submit' disabled={loading ? true : false}>
                      Enregistrer
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Classes;
