import { CCard, CCardBody, CCardHeader, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CNavLink, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStore, getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { addPaiement, getFeesStudent, getPaiementSchool } from '../../services/MainControllerApi';
import { getAllStudents, getStudents } from '../../services/StudentController';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { dateParser } from '../../utils/functions';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFPaiementSingle from '../../components/PDFPaiementSingle';

function Pensions() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)
  const [paiement, setPaiement] = useState({})
  const [paiements, setPaiements] = useState([])
  const [students, setStudents] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const ecole = getEcoleStore()
  const [loadingPDF, setLoadingPDF] = useState(true)
  const [fees, setFees] = useState(null)

  useEffect(() => {
    getPaiements().then(() => setLoading(false))      
  }, [])

  async function getPaiements() {
    await getPaiementSchool(ecole_id, headers).then((res) => {
      setPaiements(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getFees(id) {
    await getFeesStudent(id, headers).then((res) => {
        setFees(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function getStudentsSchool() {
    await getAllStudents(ecole_id, headers).then((res) => {
      setStudents(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setPaiement({...paiement, [name]: value})
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getStudentsSchool() 
    setShow(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    paiement.ecole_id = ecole_id
    await addPaiement(paiement, headers).then((res) => {
      if (res.status_code === 500) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        setShow(false);
        getPaiements().then(() => setLoading(false)) 
      }
    }, (error) => {
      toast.error(error.response.data.message)
    })
    setLoading(false)
  }

  function generatePDF(id) {
    setLoadingPDF(true)
    getFees(id).then(() => setLoadingPDF(false))
  }

  const handleFilter = () => {}

  const columns = [
    {
      name: 'Code',
      selector: row => row.code,
      sortable: true
    },
    {
      name: 'Intitule',
      selector: row => row.intitule,
      sortable: true
    },
    {
      name: "Noms et prénoms de l'élève",
      selector: row => row.nom_student+' '+row.prenom_student,
      sortable: true
    },
    {
      name: 'Montant',
      selector: row => row.montant + ' XAF',
      sortable: true
    },
    {
      name: 'Date',
      selector: row => dateParser(row.created_at),
      sortable: true
    },
    {
      name: 'Année scolaire',
      selector: row => row.annee_scolaire,
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            <CIcon icon={cilOptions} style={{color: '#000'}} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href={'#/students/' + row.student_id}>Voir</CDropdownItem>
            <CDropdownItem onClick={() => generatePDF(row.student_id)} style={{cursor: 'pointer'}}>
              {!loadingPDF && <PDFDownloadLink
                document={<PDFPaiementSingle fees={row} total={fees?.total} paye={fees?.paye} reste={fees?.reste} tarifs={fees?.tarifs} ecole={ecole} />}
                fileName={`paiement_${row.nom_student+'_'+row.prenom_student}`}
              >
                Télécharger le reçu
              </PDFDownloadLink>}
              {loadingPDF && 'Générer le reçu'}
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
    }
  ]

  return (
    <CCard className="mb-4">
      <ToastContainer />
        <CCardHeader>Pensions</CCardHeader>
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
                <Button onClick={handleShow}>Enregistrer un paiement</Button>
              </Col>
            </Row>
            <Row>
            {loading ? <CSpinner color='primary' /> :
              <DataTable
                columns={columns}
                data={paiements}
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
              <Modal.Title>Enregistrement un paiement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Sélectionner un élève</Form.Label>
                      <Form.Select onChange={handleChange} className="form-control" name="student_id" required>
                          <option>-- select --</option>
                          {students.map((student, i) => (
                              <option key={i} value={student.id}>{student.nom +' ' + student.prenom}</option>
                          ))}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Entrer l'intitulé de la transaction</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="intitule" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Entrer le montant</Form.Label>
                      <Form.Control onChange={handleChange} className="form-control" name="montant" required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Sélectionner l'année scolaire</Form.Label>
                      <Form.Select onChange={handleChange} className="form-control" name="annee_scolaire" required>
                          <option value="2024-2025">-- select --</option>
                          <option value="2024-2025">2024-2025</option>
                      </Form.Select>
                  </Form.Group><br />
                  
                  <Button size='lg' type='submit' disabled={loading}>
                    {loading ? 'Traitement...' : 'Enregistrer'}
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Pensions