import { CBadge, CCard, CCardBody, CCardHeader, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CImage, CInputGroup, CNavLink, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders, getHeadersWithForm } from '../../services/LocalStorage'
import { addStudent, getStudents } from '../../services/StudentController'
import DataTable from 'react-data-table-component'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getAllParentsSchool, getClasses, importListStudents, linkStudentToParent } from '../../services/MainControllerApi'
import CIcon from '@coreui/icons-react'
import { cilFile, cilOptions } from '@coreui/icons'
import * as XLSX from 'xlsx';
import excel from "./../../assets/images/exemple.png"

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Parent',
    selector: row => row.nom_parent +' '+ row.prenom_parent,
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
  const [studentsUnlinked, setStudentsUnlinked] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const headersForm = getHeadersWithForm()
  const [loading, setLoading] = useState(true)
  const [loadingLink, setLoadingLink] = useState(false)
  const [data, setData] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show, setShow] = useState(false)
  const handleCloseUpload = () => setShowUp(false)
  const handleShowUpload = () => setShowUp(true)
  const [showUp, setShowUp] = useState(false)
  const handleCloseLink = () => setShowLink(false)
  const handleShowLink = () => setShowLink(true)
  const [showLink, setShowLink] = useState(false)
  const [student, setStudent] = useState({})
  const [studentUnlinked, setStudentUnlinked] = useState({})
  const [classes, setClasses] = useState([])
  const [parents, setParents] = useState([])
  const [studentsData, setStudentsData] = useState([])

  useEffect(() => {
    getAllStudents().then()
    getClasses(ecole_id, headers).then(res => {
      setClasses(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
    getParents().then(() => setLoading(false))
  }, [])

  async function getAllStudents() {
    await getStudents(ecole_id, headers).then((res) => {
      setStudents(res.studentsLinked)
      setStudentsUnlinked(res.studentsUnlinked)
      setData(res.studentsLinked)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getParents() {
    await getAllParentsSchool(ecole_id, headers).then((res) => {
      setParents(res)
    }, (error) => {
      toast.error(error.response.data.message)
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
    setStudentUnlinked({...studentUnlinked, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    student.ecole_id = ecole_id

    await addStudent(student, headers).then((res) => {
        toast.success(res.message)
        handleClose()
        data.push(student)
        setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleSubmitUpload = async e => {
    e.preventDefault()
    setLoading(true)
    student.ecole_id = ecole_id
    student.classe_id = parseInt(student.classe_id)
    student.annee_scolaire = student.annee_scolaire
    student.file = studentsData
    
    await importListStudents(student, headersForm).then((res) => {
      toast.success(res.message)
      setLoading(false)
      handleCloseUpload()
      getClasses(ecole_id, headers).then(res => {
        setClasses(res)
      }, (error) => {
        toast.error(error.response.data.message)
      })
    }, (err) => {
      setLoading(false)
      toast.error(err.response.data.message)
    })
  }

  function linkToParent(item) {
    setStudentUnlinked(item)
    handleShowLink()
  }

  const columnsUnlinked = [
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
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href={'#/students/' + row.id} style={{cursor: 'pointer'}}>Voir</CDropdownItem>
          <CDropdownItem onClick={() => linkToParent(row)} style={{cursor: 'pointer'}}>Lier à un parent</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, {type:"binary", cellDates: true});
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
      for (let index = 0; index < data.length; index++) {
        const date = new Date(data[index][3]);
        date.setDate(date.getDate() + 1)
        data[index][3] = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
      }
      setStudentsData(data);
    };
    reader.readAsBinaryString(file);
  }

  async function handleSubmitStudentLinked(e) {
    e.preventDefault()
    setLoadingLink(true)
    studentUnlinked.parent_id = parseInt(studentUnlinked.parent_id)
    
    await linkStudentToParent(studentUnlinked, headers).then((res) => {
      console.log(res)
      setLoadingLink(false)
      handleCloseLink()
      toast.success(res.message)
      setLoading(true)
      getAllStudents().then(() => setLoading(false))
    })
  }

  return (
    <>
      <CCard className='mb-4'>
        <ToastContainer />
        <CCardHeader>Elèves connectés avec leurs parents</CCardHeader>
        <CCardBody>
          <CTable>
            <Row>
              <Col xl={4}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    onChange={handleFilter}
                  />
                </CInputGroup>
              </Col>
              <Col xl={4}>
                <Button onClick={handleShow}>Ajouter un élève</Button>
              </Col>
              <Col xl={4}>
                <Button onClick={handleShowUpload}>
                  <CIcon icon={cilFile} className="me-2" />
                  Importer une liste Excel
                </Button>
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
                          <option value='2024-2025'>2024 - 2025</option>
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

        <Modal show={showUp} onHide={handleCloseUpload}>
          <Modal.Header closeButton>
            <Modal.Title>Enregistrement massif d'élèves</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Insérer une liste Excel contenant les données suivantes en respectant l'ordre : <b>matricule, noms, prénoms, date de naissance, lieu de naissance et sexe</b>.</p>
            <p>NB: N'insérez pas les titres des colonnes mais seulement les valeurs directement.</p>
            <CImage src={excel} width={'100%'} height={'50%'} />
            <Form onSubmit={handleSubmitUpload} encType='multipart/form-data'>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Année scolaire</Form.Label>
                <Form.Select className="form-control" onChange={handleChange} name="annee_scolaire" required="true">
                  <option value=''>-- select --</option>
                  <option value='2024-2025'>2024 - 2025</option>
                </Form.Select>
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
                <Form.Label className="control-label">Importer le fichier</Form.Label>
                <input className="form-control" type="file" name='file' accept=".xlsx" onChange={handleFileChange} />
              </Form.Group>
              <br/>
              <Button size='lg' type='submit' disabled={loading ? true : false}>
                {loading && <CSpinner />} Importer
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showLink} onHide={handleCloseLink}>
          <Modal.Header closeButton>
            <Modal.Title>Liaison de l'élève <b>{studentUnlinked.nom +' '+ studentUnlinked.prenom} à un parent</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitStudentLinked}>
              <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Parent</Form.Label>
                <Form.Select className="form-control" onChange={handleChange} name="parent_id" required>
                  <option value=''>-- select --</option>
                  {
                    parents.length > 0 && parents.map((parent, i) => (
                      <option key={i} value={parent.id}>{parent.nom +' '+ parent.prenom}</option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <br/>
              <Button size='lg' type='submit' disabled={loadingLink}>
                {!loadingLink ? 'Lier' : 'Traitement...'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </CCard>
      <CCard className='mb-4'>
        <CCardHeader>Elèves non connectés avec leurs parents</CCardHeader>
        <CCardBody>
          <CTable>
            {loading ? <CSpinner color='primary' /> :
              <DataTable
                columns={columnsUnlinked}
                data={studentsUnlinked}
                fixedHeader
                pagination
                selectableRowsHighlight
                highlightOnHover
              >
              </DataTable>
            }
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Eleves