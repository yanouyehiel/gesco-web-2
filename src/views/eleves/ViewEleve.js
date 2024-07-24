import { CAvatar, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardLink, CCardSubtitle, CCardText, CCardTitle, CCol, CNavLink, CProgress, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { NavLink, useParams } from 'react-router-dom';
import { getSingleStudent } from '../../services/StudentController';
import { getEcoleStore, getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { Col, Modal, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { dateParser, dateParserTime } from '../../utils/functions';
import { colors } from '../../utils/colors';
import { getAbsencesByStudent, getDirecteur, getFeesStudent } from '../../services/MainControllerApi';
import classNames from 'classnames';
import CIcon from '@coreui/icons-react';
import { cilPeople } from '@coreui/icons';
import avatar from 'src/assets/images/user1.jpg'
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFStudent } from '../../components/PDFStudent';
import PDFPaiement from '../../components/PDFPaiement';

const ViewEleve = () => {
    const {id} = useParams();
    const headers = getHeaders()
    const ecole_id = getEcoleStored()
    const [student, setStudent] = useState({})
    const [loadingS, setLoadingS] = useState(true)
    const [loadingF, setLoadingF] = useState(true)
    const [loadingP, setLoadingP] = useState(true)
    const [fees, setFees] = useState(null)
    const [presences, setPresences] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (text) => {
        if (text === "fiche_student") {
            directeur().then(() => setTemplate("fiche_student"))
        } else if (text === "fiche_paiement") {
            setTemplate("fiche_paiement")
        }
        setShow(true)
    }
    const [template, setTemplate] = useState("")
    const ecole = getEcoleStore()
    const [director, setDirector] = useState(null)

    async function directeur() {
        await getDirecteur(ecole_id, headers).then((res) => setDirector(res))
    }

    useEffect(() => {
        getStudent().then(() => setLoadingS(false))
        getFees().then(() => setLoadingF(false))
        getAbsences().then(() => setLoadingP(false))
    }, [])

    async function getStudent() {
        await getSingleStudent(id, headers).then((res) => {
            setStudent(res)
        }, (error) => {
            toast.error(error.response.data.message)
          })
    }

    async function getFees() {
        await getFeesStudent(id, headers).then((res) => {
            setFees(res)
        }, (error) => {
            toast.error(error.response.data.message)
          })
    }

    async function getAbsences() {
        await getAbsencesByStudent(id, headers).then((res) => {
            setPresences(res)
        }, (error) => {
            toast.error(error.response.data.message)
          })
    }

    return (
        <React.Fragment>
            <CCard className='mb-4'>
                <ToastContainer />
                {student.student?.nom ? <CCardHeader>L'ELEVE {student.student?.nom +' '+ student.student?.prenom}</CCardHeader> :
                    <CCardHeader><Skeleton width={150} /></CCardHeader>
                }
                <CCardBody>
                    <Row>
                        <Col xl={6}>
                            <h5 className="card-title">Informations personnelles</h5>
                            <CCard >
                                <CCardBody>
                                    {/* <CCardTitle>Card title</CCardTitle> */}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Nom</CCardSubtitle>
                                    {student.student?.nom ? <CCardText>{student.student?.nom}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Prénom</CCardSubtitle>
                                    {student.student?.prenom ? <CCardText>{student.student?.prenom}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Date de naissance</CCardSubtitle>
                                    {student.student?.date_naissance ? <CCardText>{dateParserTime(student.student?.date_naissance)}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Lieu de naissance</CCardSubtitle>
                                    {student.student?.lieu_naissance ? <CCardText>{student.student?.lieu_naissance}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Sexe</CCardSubtitle>
                                    {student.student?.sexe ? <CCardText>{student.student?.sexe}</CCardText> : <Skeleton width={200} />}
                                </CCardBody>
                            </CCard>
                        </Col>
                        <Col xl={6}>
                            <h5 className="card-title">Informations scolaires</h5>
                            <CCard >
                                <CCardBody>
                                    <CCardSubtitle className="mb-2 text-body-secondary">Matricule</CCardSubtitle>
                                    {student.student?.matricule ? <CCardText>{student.student?.matricule}</CCardText> : <Skeleton width={200} />}
                                    {/* <CCardSubtitle className="mb-2 text-body-secondary">Type de classe</CCardSubtitle>
                                    {student.classe?.type_classe_id ? <CCardText>{student.classe?.type_classe_id}</CCardText> : <Skeleton width={200} />} */}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Salle de classe</CCardSubtitle>
                                    {student.classe?.nom ? <CCardText>{student.classe?.nom}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Année scolaire</CCardSubtitle>
                                    {student.student?.date_scolarisation ? <CCardText>{student.student?.date_scolarisation}</CCardText> : <Skeleton width={200} />}
                                    <CCardSubtitle className="mb-2 text-body-secondary">Date d'inscription</CCardSubtitle>
                                    {student.student?.created_at ? <CCardText>{dateParser(student.student?.created_at)}</CCardText> : <Skeleton width={200} />}
                                </CCardBody>
                            </CCard>
                        </Col>
                    </Row>
                    <CRow>
                        <CCol>
                            <CNavLink as={NavLink} to={'/documents'}>
                                <CButton color='link'>Demander un document</CButton>
                            </CNavLink>
                        </CCol>
                        <CCol>
                            <CButton onClick={() => handleShow("fiche_student")} color='link'>Imprimer le certificat de l'élève</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>

                <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                        {template === "fiche_student" && "La fiche de scolarité"}
                        {template === "fiche_paiement" && "La fiche de paiements"}
                    </Modal.Header>
                    <Modal.Body>
                        {template === "fiche_student" && <PDFStudent student={student} ecole={ecole} director={director} />}
                        {template === "fiche_paiement" && <PDFPaiement student={student.student} ecole={ecole} fees={fees} />}
                    </Modal.Body>
                    {template === "fiche_student" && <PDFDownloadLink document={<PDFStudent student={student} ecole={ecole} director={director} />} fileName={`Fiche_${student.student?.nom}_${student.student?.prenom}`}>
                        {({loading}) => (loading ? <CSpinner color='primary' /> : 
                        <CButton className='mt-4' color='link'>Télécharger</CButton>)}
                    </PDFDownloadLink>}
                    {template === "fiche_paiement" && <PDFDownloadLink document={<PDFPaiement student={student.student} ecole={ecole} fees={fees} />} fileName={`paiement_${student.student?.nom}_${student.student?.prenom}`}>
                        {({loading}) => (loading ? <CSpinner color='primary' /> : 
                        <CButton className='mt-4' color='link'>Télécharger</CButton>)}
                    </PDFDownloadLink>}
                </Modal>
            </CCard>

            <CCard className='mb-4'>
                <CCardHeader>Paiements</CCardHeader>
                <CCardBody>
                    {!loadingF ?
                        <>
                            <CRow>
                                <CCol xs={12} md={6} xl={6}>
                                <CRow>
                                    <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-info py-1 px-3">
                                        <div className="text-body-secondary text-truncate small">Inscription</div>
                                        <div className="fs-5 fw-semibold">{fees?.tarifs.inscription} FCFA</div>
                                    </div>
                                    </CCol>
                                    <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">Première tranche</div>
                                        <div className="fs-5 fw-semibold">{fees?.tarifs.premiere_tranche} FCFA</div>
                                    </div>
                                    </CCol>
                                </CRow>
                                </CCol>
                                <CCol xs={12} md={6} xl={6}>
                                <CRow>
                                    <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">Deuxième tranche</div>
                                        <div className="fs-5 fw-semibold">{fees?.tarifs.deuxieme_tranche} FCFA</div>
                                    </div>
                                    </CCol>
                                    <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">Troisième tranche</div>
                                        <div className="fs-5 fw-semibold">{fees?.tarifs.troisieme_tranche} FCFA</div>
                                    </div>
                                    </CCol>
                                </CRow>
                                </CCol>
                            </CRow>
                            <hr className="mt-0" />
                            <CCardFooter>
                                <CRow
                                    xs={{ cols: 1, gutter: 4 }}
                                    sm={{ cols: 2 }}
                                    lg={{ cols: 4 }}
                                    xl={{ cols: 5 }}
                                    className="mb-2 text-center"
                                >
                                    <CCol>
                                        <div className="text-body-secondary">Total pension</div>
                                        <div className="fw-semibold text-truncate">
                                        {fees?.total} (100%)
                                        </div>
                                        <CProgress thin className="mt-2" color="primary" value={100} />
                                    </CCol>
                                    <CCol>
                                        <div className="text-body-secondary">Somme déjà payée</div>
                                        <div className="fw-semibold text-truncate">
                                        {fees?.paye} ({parseInt((fees?.paye / fees?.total) * 100)}%)
                                        </div>
                                        <CProgress thin className="mt-2" color="success" value={(fees?.paye / fees?.total) * 100} />
                                    </CCol>
                                    <CCol
                                        className='d-none d-xl-block'
                                    >
                                        <div className="text-body-secondary">Reste à payer</div>
                                        <div className="fw-semibold text-truncate">
                                        {fees?.reste} ({Math.floor((fees?.reste / fees?.total) * 100)}%)
                                        </div>
                                        <CProgress thin className="mt-2" color="danger" value={Math.floor((fees?.reste / fees?.total) * 100)} />
                                    </CCol>
                                </CRow>
                            </CCardFooter>
                            <br />

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    <CTableRow>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">
                                        <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Intitulé</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Code</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Montant</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Payé le</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                {fees?.paiements.length > 0 ? fees?.paiements.map((item, index) => (
                                <CTableBody>
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center">
                                            <CAvatar size="md" src={avatar} status='success' />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {item.intitule}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {item.code}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {item.montant} FCFA
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                        {dateParser(item.created_at)}
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                                )) : <CRow>
                                    <p className="text-center">Aucun paiement effectué</p>
                                </CRow>}
                            </CTable>
                            <CRow className='text-left'>
                                <CButton onClick={() => handleShow("fiche_paiement")} color='link'>Imprimer la fiche de paiement</CButton>
                            </CRow>
                        </> : <CSpinner color='primary' className='mt-4 mb-4' />
                    }
                </CCardBody>
            </CCard>

            <CCard className='mb-4'>
                <CCardHeader>Les absences</CCardHeader>
                <CCardBody>
                    {loadingP ?
                        <CSpinner color='primary' className='mt-4 mb-4' /> :
                        (!loadingP && presences.absences.length > 0) ?
                            <CRow
                                xs={{ cols: 1, gutter: 4 }}
                                sm={{ cols: 2 }}
                                lg={{ cols: 4 }}
                                xl={{ cols: 5 }}
                            >
                            {presences.absences.map((ab, i) => (
                                <Col key={i}>
                                    <CCard className='mb-4'>
                                    <CCardBody>
                                        <h5>{presences?.student?.nom +' '+ presences?.student?.prenom}</h5>
                                        <span className='text-danger'>{ab.periode}</span>
                                        <span style={{marginLeft: '30px'}}>{ab.nom_classe}</span>
                                        <p><em>{"Enregistré le " + dateParser(ab.created_at)}</em></p>
                                    </CCardBody>
                                    </CCard>
                                </Col>
                            ))}
                        </CRow> :
                        <CRow>
                            <p className='text-center'>Aucune absence enregistrée</p>
                        </CRow>
                    }
                </CCardBody>
            </CCard>

            {/* <CCard className='mb-4'>
                <CCardHeader>Les notes</CCardHeader>
                <CCardBody>
                    <CRow></CRow>
                </CCardBody>
            </CCard> */}
        </React.Fragment>
    )
}

export default ViewEleve