import { CCard, CCardBody, CCardHeader, CTable, CInputGroup, CFormInput, CSpinner, CNavLink } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom";
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { Button, Col, Row, Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getStudentsOfClasse } from '../../services/EnseignementController';
import { getClasses, infoClasse } from '../../services/MainControllerApi';
import { ToastContainer, toast } from "react-toastify";
import { addStudent } from "../../services/StudentController";

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
        name: 'Nom',
        selector: row => row.nom,
        sortable: true
      },
      {
        name: 'Prénom',
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

function Classe() {
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [classe, setClasse] = useState({})
    const ecole_id = getEcoleStored()
    const [student, setStudent] = useState({})
    const [data, setData] = useState([])
    const headers = getHeaders()

    useEffect(() => {
        getInfoClasse()
        getStudents().then(() => setLoading(false))
    }, [])

    async function getStudents() {
        await getStudentsOfClasse(id, ecole_id, headers).then((res) => {
            setStudents(res)
            setData(res)
        })
    }

    async function getInfoClasse() {
        await infoClasse(id, headers).then((res) => {
            setClasse(res)
        })
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setStudent({...student, [name]: value})
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        console.log(student)
        
        student.ecole_id = getEcoleStored()
        student.classe_id = parseInt(id)

        await addStudent(student, headers).then((res) => {
            toast.success(res.message)
            handleClose()
            getStudents().then(() => setLoading(false))
        }, (err) => {
            console.log(err.response.data.message)
        })
    }

    function handleFilter(event) {
        const newData = students.filter(row => {
          return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.prenom.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.matricule.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.nom_classe.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.sexe.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
      }

    return (
        <CCard className='mb-4'>
            <ToastContainer />
            <CCardHeader>Classe : {classe.nom}</CCardHeader>
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
                            selectableRows
                            fixedHeader
                            pagination
                            selectableRowsHighlight
                            highlightOnHover
                            onRowClicked={() => console.log('clicked')}
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

export default Classe