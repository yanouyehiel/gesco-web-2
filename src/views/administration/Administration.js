import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CTable, CSpinner, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addPersonne, getAllEmployes, getRoles, updateEmploye } from '../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import { Col, Row, Button, Modal, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'


function Administration() {
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [loading, setLoading] = useState(true)
  const [personnel, setPersonnel] = useState([])
  const [data, setData] = useState([])
  const [roles, setRoles] = useState([])
  const [employe, setEmploye] = useState({})
  const [show, setShow] = useState(false);

  useEffect(() => {
    getPersonnel().then(() => setLoading(false))
  }, [])

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setEmploye({...employe, [name]: value})
  }

  function getPersonnel() {
    getAllEmployes(ecole_id, headers).then((res) => {
      const personnelFiltered = res.filter(p => p.role !== "Parent")
      setData(personnelFiltered)
      setPersonnel(personnelFiltered)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getAllRoles() {
    await getRoles(headers).then((res) => {
      setRoles(res.filter(r => r.intitule !== 'Parent'))
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }


  function handleFilter(event) {
    const newData = personnel.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      //row.telephone.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.role.toLowerCase().includes(event.target.value.toLowerCase())
      //row.matricule.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (employe.cpassword !== employe.password) {
        toast.error('Les mots de passe ne sont pas identiques')
    } else {
        if (!employe.role_id) {
            toast.error("Veuillez attribuer un rôle à l'utilisateur")
        } else {
            setLoading(true)
            employe.ecole_id = parseInt(ecole_id);
            employe.role_id = parseInt(employe.role_id)
            
            addPersonne(employe, headers).then((res) => {
              setShow(false);
              toast(res.message)
              getPersonnel().then(() => setLoading(false))
            }, (error) => {
              toast.error(error.response.data.message)
              setLoading(false)
            })
        }
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    getAllRoles()
  }
  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleShowUpdate = () => setShowUpdate(true)
  const [newsData, setNewsData] = useState({})
  const handleUpdate = (data) => {
    setNewsData(data)
    handleShowUpdate()
  }

  async function handleUpdateSubmit() {
    const data = {
      id: newsData.id,
      nom: employe.nom === undefined ? newsData.nom : employe.nom,
      prenom: employe.prenom === undefined ? newsData.prenom : employe.prenom,
      telephone: employe.telephone === undefined ? newsData.telephone : employe.telephone,
      email: employe.email === undefined ? newsData.email : employe.email,
      role_id: employe.role_id === undefined ? newsData.role_id : employe.role_id
    }
    
    await updateEmploye(data, headers).then((res) => {
      toast.success(res)
      setLoading(true)
      getPersonnel().then(() => setLoading(false))
      handleCloseUpdate()
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
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Téléphone',
      selector: row => row.telephone,
      sortable: true
    },
    {
      name: 'Rôle',
      selector: row => row.role,
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => handleUpdate(row)} style={{cursor: 'pointer'}}>Modifier</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]

  return (
    <CCard className="mb-4">
      <ToastContainer />
      <CCardHeader>Administration</CCardHeader>
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
              <Button onClick={handleShow}>Ajouter un employé</Button>
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
            <Modal.Title>Enregistrement d'un employé</Modal.Title>
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
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Attribuer un rôle</Form.Label>
                    <Form.Select className="form-control" name='role_id' onChange={handleChange} required>
                        <option>-- choisir --</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role.id}>{role.intitule}</option>
                        ))}
                    </Form.Select>
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
                    <CSpinner />
                  </Button>
                }
            </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier : <b>{newsData.nom + ' ' + newsData.prenom}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Nouveau nom</Form.Label>
                <Form.Control onChange={handleChange} className="form-control" 
                  name="nom" type="text"
                  placeholder={newsData.nom} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Nouveau prénom</Form.Label>
                <Form.Control onChange={handleChange} className="form-control" 
                  name="prenom" type="text"
                  placeholder={newsData.prenom} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Nouvel email</Form.Label>
                <Form.Control onChange={handleChange} className="form-control" 
                  name="email" type="text"
                  placeholder={newsData.email} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Nouveau téléphone</Form.Label>
                <Form.Control onChange={handleChange} className="form-control" 
                  name="telephone" type="text"
                  placeholder={newsData.telephone} />
              </Form.Group>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Nouveau rôle ?</Form.Label>
                <Form.Select className="form-control" name='role_id' onChange={handleChange} required>
                  <option>-- choisir --</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role.id}>{role.intitule}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <br/>
              <Button size='lg' type='submit' disabled={loading}>
                {!loading ? 'Modifier' : 'Traitement...'}
              </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Administration