import { CButton, CCard, CCardBody, CCardHeader, CCardLink, CCardSubtitle, CCardText, CCardTitle, CNavLink, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { NavLink, useParams } from 'react-router-dom';
import { getSingleStudent } from '../../services/StudentController';
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { dateParser, dateParserTime } from '../../utils/functions';
import { colors } from '../../utils/colors';

const ViewEleve = () => {
    const {id} = useParams();
    const headers = getHeaders()
    const ecole_id = getEcoleStored()
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudent().then(setLoading(false))
    }, [])

    async function getStudent() {
        await getSingleStudent(id, headers).then((res) => {
            setStudent(res)
        })
    }

    return (
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
                                <CCardSubtitle className="mb-2 text-body-secondary">Type de classe</CCardSubtitle>
                                {student.classe?.type_classe_id ? <CCardText>{student.classe?.type_classe_id}</CCardText> : <Skeleton width={200} />}
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
                <CNavLink as={NavLink} to={'/documents/' + id}>
                    <CButton color='link'>Demander un document</CButton>
                </CNavLink>
            </CCardBody>
        </CCard>
    )
}

export default ViewEleve