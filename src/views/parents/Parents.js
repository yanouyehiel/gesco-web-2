import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addPersonne, getAllParentsSchool } from '../../services/MainControllerApi'
import DataTable from 'react-data-table-component'
import { toast, ToastContainer } from 'react-toastify'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
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
    name: 'Téléphone',
    selector: row => row.telephone,
    sortable: true
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true
  },
  {
    name: 'Nom enfant',
    selector: row => row.nom_student,
    sortable: true
  },
  {
    name: 'Prénom enfant',
    selector: row => row.prenom_student,
    sortable: true
  },
  {
    name: 'Nom de la classe',
    selector: row => row.nom_classe,
    sortable: true
  }
]

function Parents() {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [parents, setParents] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [parent, setParent] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      getParents().then(() => setLoading(false))
  }, [])

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setParent({...parent, [name]: value})
  }

  async function getParents() {
    await getAllParentsSchool(ecole_id, headers).then((res) => {
      setParents(res)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parent.cpassword !== parent.password) {
        toast.error('Les mots de passe ne sont pas identiques')
    } else {
      setLoading(true)
      parent.ecole_id = parseInt(ecole_id);
      parent.role_id = 3
      
      addPersonne(parent, headers).then((res) => {
        setShow(false);
        toast.success(res.message)
        getParents().then(() => setLoading(false))
      }, (err) => {
        toast.error(err.response.data.message)
        setLoading(false)
      })
    }
  }

  function handleFilter(event) {
    const newData = parents.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.nom_student.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom_student.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setParents(newData)
  }

  return (
    <CCard className='mb-4'>
      <ToastContainer />
        <CCardHeader>Parents</CCardHeader>
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
                <Button onClick={handleShow}>Ajouter un parent</Button>
              </Col>
            </Row>
            {loading ? <CSpinner color='primary' /> :
              <DataTable
                columns={columns}
                data={parents}
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
              <Modal.Title>Enregistrement d'un parent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Nom</Form.Label>
                      <Form.Control type="text" name='nom' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Prénom</Form.Label>
                      <Form.Control type="text" name='prenom' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Email</Form.Label>
                      <Form.Control type="email" name='email' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  {/* <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Adresse</Form.Label>
                      <Form.Control type="text" name='adresse' onChange={handleChange} className="form-control" required />
                  </Form.Group> */}
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Téléphone</Form.Label>
                      <Form.Control type="text" name='telephone' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  {/* <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Salaire</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="" />
                  </Form.Group> */}
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Mot de passe</Form.Label>
                      <Form.Control type="password" name='password' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Confirmer le mot de passe</Form.Label>
                      <Form.Control type="password" name='cpassword' onChange={handleChange} className="form-control" required />
                  </Form.Group>
                  {/* <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Attribuer une classe <span style={{color: 'red'}}>si c'est un enseignant</span></Form.Label>
                      <Form.Select className="form-control" name='classe_id' onChange={handleChange}>
                          <option>-- select --</option>   
                          {classes.map((classe, index) => (
                              <option key={index} value={classe.id}>{classe.nom}</option>
                          ))}
                      </Form.Select>
                  </Form.Group> */}
                  <br/>
                  {!loading ? <Button size='lg' type='submit'>Créer profil</Button> :
                    <Button size='lg' type='button' disabled={loading ? true : false}>
                      <CSpinner color='primary' />
                    </Button>
                  }
              </Form>
          </Modal.Body>
        </Modal>
    </CCard>
  )
}

export default Parents