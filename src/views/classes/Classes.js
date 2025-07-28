import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CInputGroup, CSpinner, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CButton, CRow, CCol } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { addClasse, updateClasse, getClassesUniversity, typesClasseById, getCursus, getClasses } from '../../services/MainControllerApi'
import { getEcoleStore, getEcoleStored, getHeaders } from '../../services/LocalStorage'
import DataTable from 'react-data-table-component'
import { Modal, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { getTeachers } from '../../services/EnseignementController'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'

const Classes = () => {
  const ecole_id = getEcoleStored()
  const ecole = getEcoleStore()
  const headers = getHeaders()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [classes, setClasses] = useState([])
  const [data, setData] = useState([])
  const [typeClasses, setTypeClasses] = useState([])
  const [classe, setClasse] = useState({})
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setLoadingData(true)
    if (ecole.type_etablissement_id === 3) {
      typesClasseById(ecole.id, headers).then(res => setTypeClasses(res))
      getCursus(ecole.id, headers).then(res => setCursus(res))
    } else {
     typesClasseById(ecole.id, headers).then(res => setTypeClasses(res))
    }
    getTeachers(ecole_id, headers).then(res => {
      setTeachers(res)
      setLoadingData(false)
    })
    setShow(true)
  }
  const [show, setShow] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [teachers, setTeachers] = useState([])
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleShowUpdate = () => setShowUpdate(true)
  const [newData, setNewData] = useState({})
  const [cursus, setCursus] = useState([])

  useEffect(() => {
    getAllClasses().then()
  }, [])

  const handleUpdate = (data) => {
    setNewData(data)
    handleShowUpdate()
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = {
      id: newData.id,
      nom: classe.nom === undefined ? newData.nom : classe.nom
    }
    
    await updateClasse(data, headers).then((res) => {
      toast.success(res)
      getAllClasses().then(() => setLoading(false))
      handleCloseUpdate()
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getAllClasses() {
    setLoading(true)
    if (ecole.type_etablissement_id === 3) {
      await getClassesUniversity(ecole_id, headers).then(res => {
        setClasses(res)
        setData(res)
      }, (error) => {
        toast.error(error.response.data.message)
      })
    } else {
      await getClasses(ecole_id, headers)
      .then(res => {
        setClasses(res)
        setData(res)
      }, (error) => {
        toast.error(error.response.data.message)
      })
    }  
    setLoading(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!classe.teacher_id && ecole.type_etablissement_id !== 4) {
      toast.error("Veuillez lui attribuer en enseignant principale")
    } else {
      setLoading(true)
      classe.ecole_id = ecole_id
      await addClasse(classe, headers).then(res => {
        handleClose()
        getClasses().then(() => setLoading(false))
        toast.success(res.message)
      }, (error) => {
        toast.error(error.response.data.message)
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

  /*async function handleDeleteClasse(id) {
    setLoading(true)
    await deleteClasse(id, headers).then((res) => {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const newClasses = classes.filter(c => c.id !== id)
      setClasses(newClasses)
      setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }*/

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
      name: 'Effectif',
      selector: row => row.effectif,
      sortable: true
    },
    {
      name: ecole.type_etablissement_id==3?'Cursus':'Cycle',
      selector: row => row.cycle_id==1?'Premier Cycle':(row.cycle_id==2?'Second Cycle':'Non défini'),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href={'/#/classes/' + row.id}>Voir</CDropdownItem>
          <CDropdownItem onClick={() => handleUpdate(row)} style={{cursor: 'pointer'}}>Modifier</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]
  
  const columnsUniversity = [
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
      name: 'Effectif',
      selector: row => row.effectif,
      sortable: true
    },
    {
      name: 'Cycle',
      selector: row => row.intitule_cycle,
      sortable: true
    },
    {
      name: 'Code du cyle',
      selector: row => row.code_cycle,
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href={'/#/classes/' + row.id}>Voir</CDropdownItem>
          <CDropdownItem onClick={() => handleUpdate(row)} style={{cursor: 'pointer'}}>Modifier</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]

  return (
    <CCard>
        <ToastContainer />
        <CCardHeader>Toutes les classes</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="Rechercher"
                  aria-label="Rechercher"
                  aria-describedby="basic-addon1"
                  onChange={handleFilter}
                />
              </CInputGroup>
            </CCol>
            <CCol>
              <CButton className='btn-primary text-white' onClick={handleShow}>Ajouter une salle</CButton>
            </CCol>
          </CRow>
          <CRow>
            <CTable>
              {loading ? <CSpinner color='primary' /> :
                <DataTable
                  columns={ecole.type_etablissement_id==3?columnsUniversity:columns}
                  data={data}
                  fixedHeader
                  pagination
                  selectableRowsHighlight
                  highlightOnHover
                >
                </DataTable>
              }
            </CTable>
          </CRow>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{"Enregistrement d'une classe"}</Modal.Title>
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
                    {ecole.type_etablissement_id === 2 &&
                      <>
                        <Form.Label className="control-label">A quel cycle appartient-elle ?</Form.Label>
                        <Form.Select onChange={handleChange} name='cycle_id' className="form-control">
                          <option>-- select --</option>
                          <option value={1}>Premier Cycle</option>
                          <option value={2}>Second Cycle</option>
                        </Form.Select>
                      </>
                    }
                    {ecole.type_etablissement_id === 3 &&
                      <>
                        <Form.Label className="control-label">A quel cursus appartient-elle ?</Form.Label>
                        <Form.Select onChange={handleChange} name='cycle_id' className="form-control">
                          <option>-- select --</option>
                          {cursus.length>0&&cursus.map((c, i) => (
                            <option key={i} value={c.id}>{c.intitule}</option>
                          ))}
                        </Form.Select>
                      </>
                    }
                  </Form.Group>
                  {ecole.type_etablissement_id!==4&&<Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Nommer un enseignant principal</Form.Label>
                    <Form.Select onChange={handleChange} name='teacher_id' className="form-control" required='true'>
                      <option>-- select --</option>
                      {teachers.length > 0 && teachers.map((teacher, i) => (
                        <option key={i} value={teacher.id}>{teacher.nom + ' ' + teacher.prenom}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>}
                  <br/>
                  <CButton size='lg' type='submit' className='btn-primary text-white' disabled={loadingData}>
                  {!loadingData ? 'Enregistrer' : 'Traitement...'}
                  </CButton>
              </Form>
          </Modal.Body>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Nom de la classe : <b>{newData.nom}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Nouveau nom de la classe</Form.Label>
                  <Form.Control onChange={handleChange} className="form-control" 
                    name="nom" type="text"
                    placeholder={newData.nom} />
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

export default Classes;
