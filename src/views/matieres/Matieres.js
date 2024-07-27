import { CButton, CCard, CCardBody, CCardHeader, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addMatiere, getAllMatieres, getGroupeMatieres, getSingleMatiere } from '../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'
import AxiosApi from '../../services/AxiosApi'
import { cilOptions } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function Matieres() {
  const [matieres, setMatieres] = useState([])
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [showMatiere, setShowMatiere] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseMatiere = () => setShowMatiere(false)
  const handleShowMatiere = () => setShowMatiere(true)
  const headers = getHeaders()
  const ecole_id = getEcoleStored()
  const [matiere, setMatiere] = useState({})
  const [loading, setLoading] = useState(true)
  const [groupes, setGroupes] = useState([])
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    nom: "",
    classe_id: "",
    coefficient: ""
  })
  const [classes, setClasses] = useState([])
  const [matiereShow, setMatiereShow] = useState({})

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleAddClasse = () => {
    const { classe_id, coefficient } = newItem;
    const chaine = classe_id.split('/');

    const id = chaine[0];
    const nom = chaine[1];
    
    // Vérification que les champs sont remplis et que classeId et coefficient sont des entiers
    if (id && coefficient && nom) {
      const idParse = parseInt(id);
      const coeff = parseInt(coefficient);

      if (!isNaN(idParse) && !isNaN(coeff)) {
        setItems([
          ...items,
          {
            classe_id: idParse,
            coefficient: coeff,
            nom: nom
          }
        ]);
        setNewItem({ classe_id: '', coefficient: '' });
      } else {
        toast.error("L'ID et le coefficient doivent être des entiers valides.");
      }
    } else {
      toast.error('Tous les champs doivent être remplis.');
    }
  };

  async function showCoeffModal(row) {
    await getSingleMatiere(row.id, headers).then((res) => {
      setMatiereShow(res.matiere)
      handleShowMatiere()
    })
  }

  useEffect(() => {
    getAllMatieres(ecole_id, headers)
    .then(res => {
      setMatieres(res)
      setData(res)
      setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    })
    getGroupe().then()
    getClasses()
  }, [])

  function handleFilter(event) {
    const newData = matieres.filter(row => {
      return row.intitule.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.code.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setMatiere({...matiere, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    matiere.ecole_id = ecole_id
    matiere.coefficients = items
    await addMatiere(matiere, headers).then((res) => {
      setShow(false);
      toast.success(res.message)
      getAllMatieres(ecole_id, headers).then()
      setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    }) 
  }

  const getGroupe = async () => {
    await getGroupeMatieres(ecole_id, headers).then((res) => setGroupes(res))
  }

  async function getClasses() {
    await AxiosApi.get('/get-classes-school/' + ecole_id, {headers})
    .then(res => setClasses(res.data), (error) => {
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
      name: 'Nom de la matière',
      selector: row => row.intitule,
      sortable: true
    },
    {
      name: 'Code de la matière',
      selector: row => row.code,
      sortable: true
    },
    {
      name: 'Nom du groupe',
      selector: row => row.nom_groupe,
      sortable: true
    },
    {
      name: 'Date de création',
      selector: row => dateParser(row.created_at),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => showCoeffModal(row)} style={{cursor: 'pointer'}}>Voir</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]

  return (
    <CCard className="mb-4">
      <ToastContainer />
      <CCardHeader>Toutes les matières</CCardHeader>
      <CCardBody>
        <CTable>
          <Row>
            <Col xs={6}>
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
              <Button onClick={handleShow}>Ajouter une matière</Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enregistrement d'une matiere</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Intitule de la matiere</Form.Label>
                    <Form.Control onChange={handleChange} name='intitule' type="text" 
                        className="form-control" placeholder="Exemple: Calcul Rapide" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Code de la matiere</Form.Label>
                    <Form.Control onChange={handleChange} name='code' type="text" 
                      className="form-control" placeholder="" required />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Sélectionner le groupe de matière</Form.Label>
                    <Form.Select onChange={handleChange} name='groupe_matiere_id' className="form-control" required='true'>
                        <option>-- select --</option>
                        {groupes.length > 0 && groupes.map((groupe, i) => (
                            <option key={i} value={groupe.id}>{groupe.intitule}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group mt-4">
                  <Form.Label className="control-label">Entrer la classe et son coefficient</Form.Label>
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>
                        Nom: {item.nom} - Coefficient: {item.coefficient}
                      </li>
                    ))}
                  </ul>
                  <CRow>
                    <CCol>
                      <Form.Select 
                        onChange={handleInputChange} 
                        value={newItem.classe_id} 
                        className="form-control"
                        name='classe_id'
                      >
                        <option>-- select une classe --</option>
                        {classes.length > 0 && classes.map((classe, i) => (
                          <option key={i} value={classe.id+'/'+classe.nom}>{classe.nom}</option>
                        ))}
                      </Form.Select>
                    </CCol>
                    <CCol>
                      <Form.Control type="text" value={newItem.coefficient} onChange={handleInputChange}
                        className="form-control" placeholder='Entrer la valeur' name='coefficient' />
                    </CCol>
                    <CCol>
                      <CButton className='bg-primary' onClick={handleAddClasse}>Ajouter</CButton>
                    </CCol>
                  </CRow>
                </Form.Group>
                <br/>
                <CButton className='bg-primary' size='lg' type='submit' disabled={loading ? true : false}>
                  {loading && <CSpinner />} Enregistrer
                </CButton>
            </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showMatiere} onHide={handleCloseMatiere}>
        <Modal.Header closeButton>
          <Modal.Title>Matière : {matiereShow.intitule}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{matiereShow.intitule}</h3>
          <p>{matiereShow.code}</p>
          <div className='mt-4'>
            <ul>
              {matiereShow?.coefficients && matiereShow?.coefficients.map((coeff, i) => (
                <li key={i}>Coefficient : {coeff.coefficient}</li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Matieres