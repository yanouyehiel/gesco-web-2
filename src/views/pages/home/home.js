import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCard, CCardBody, CCardGroup, CCardHeader, CCarousel, CCarouselCaption, CCarouselItem, CCol, CContainer, CHeader, CHeaderNav, CImage, CNavItem, CNavLink, CRow, CWidgetStatsC } from '@coreui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItem } from '../../../services/LocalStorage'
import { AppFooter } from '../../../components'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeLetter, cilLink, cilPhone } from '@coreui/icons'
import img from '../../../assets/images/ob1-removebg.png'
import carousel1 from "../../../assets/images/carousel1.png"
import carousel2 from "../../../assets/images/carousel2.png"
import carousel3 from "../../../assets/images/carousel3.png"
import carousel4 from "../../../assets/images/carousel4.png"
import carousel5 from "../../../assets/images/carousel5.png"

function home() {
    const navigate = useNavigate()

    useEffect(() => {
        const data = getItem('gesco')
        const json = JSON.parse(data)
        if (json.user) {
            navigate("/dashboard")
        }
    }, [])

    
    return (
        <div className="bg-body-tertiary min-vh-100">
            <CContainer>
                <CHeader>
                    <CHeaderNav className="d-none d-md-flex">
                        <CNavItem>
                            <CButton className='text-2xl'>Gesco</CButton>
                        </CNavItem>
                    </CHeaderNav>
                    <CHeaderNav className="ms-auto">
                        <CNavItem href='#/login'>
                            <CButton color="primary" className='text-white'>Se connecter</CButton>
                        </CNavItem>
                        <CNavItem href='#/register'>
                            <CButton>S'enregistrer</CButton>
                        </CNavItem>
                    </CHeaderNav>
                </CHeader>
                <CRow className="d-flex mt-4 px-4">
                    <CCol xs={8}>
                        <p>
                        Notre application de gestion d'établissements scolaires primaires et secondaires surnommée GESCO vient régler  différents problèmes. Elle permet d'améliorer l'efficacité et la productivité des écoles en simplifiant et en automatisant les tâches administratives et en facilitant la communication entre les enseignants, les parents et la direction. Les objectifs spécifiques sont de créer une plateforme intuitive et accessible pour les utilisateurs, de réduire les temps de travail et d'améliorer la gestion des données.
                        </p>
                        <CButton color="primary" className='text-white' href='#/login'>Commencer</CButton>
                    </CCol>
                    <CCol xs={4} className='flex-end'>
                        <CImage src={img} width={200} height={200} />
                    </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <CCol xs={12} className='mt-4'>
                        <h4>Quelques fonctionnalités</h4>
                        <CCard className="mt-4 mb-4">
                            <CCardBody>
                                <CAccordion activeItemKey={1}>
                                    <CAccordionItem itemKey={1}>
                                        <CAccordionHeader>•	La Gestion de l’établissement</CAccordionHeader>
                                        <CAccordionBody>
                                           Elle englobe des sous-gestions telles que la gestion des salles de classes, la gestion des tarifs, la gestion de la scolarité, la gestion des requêtes scolaires et la gestion des livres.
                                        </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={2}>
                                        <CAccordionHeader>•	La Gestion des enseignements</CAccordionHeader>
                                        <CAccordionBody>
                                            Elle englobe des sous-gestions telles que la gestion des matières, la gestion des cours, la gestion des présences et la gestion des devoirs.
                                        </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={3}>
                                        <CAccordionHeader>•	La Gestion des évaluations</CAccordionHeader>
                                        <CAccordionBody>
                                            Elle englobe des sous-gestions telles que la gestion des notes et la gestion du calendrier scolaire.
                                        </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={4}>
                                        <CAccordionHeader>•	La Gestion du personnel</CAccordionHeader>
                                        <CAccordionBody>
                                            Elle englobe des sous-gestions telles que la gestion des employés, la gestion des enseignants, la gestion des élèves et la gestion des parents.
                                        </CAccordionBody>
                                    </CAccordionItem>
                                    <CAccordionItem itemKey={5}>
                                        <CAccordionHeader>•	La Gestion de la communication</CAccordionHeader>
                                        <CAccordionBody>
                                            Elle englobe des sous-gestions telles que la gestion du planning, la gestion de emploi du temps et la gestion de la messagerie.
                                        </CAccordionBody>
                                    </CAccordionItem>
                                </CAccordion>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <CCol xs={12} className='mt-4'>
                        <CCard className="mb-4">
                        <CCardBody>
                            <CCarousel controls indicators dark>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={carousel1} alt="slide 1" />
                                </CCarouselItem>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={carousel2} alt="slide 2" />
                                </CCarouselItem>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={carousel3} alt="slide 3" />
                                </CCarouselItem>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={carousel4} alt="slide 4" />
                                </CCarouselItem>
                                <CCarouselItem>
                                    <img className="d-block w-100" src={carousel5} alt="slide 5" />
                                </CCarouselItem>
                            </CCarousel>
                        </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <h4>Contactez-nous</h4>
                    <CCardGroup className="mb-4">
                        <CWidgetStatsC
                            icon={<CIcon icon={cilEnvelopeLetter} height={36} />}
                            value="contact@gesco-app.com"
                            title="Email"
                            progress={{ color: 'primary', value: 100 }}
                        />
                        <CWidgetStatsC
                            icon={<CIcon icon={cilPhone} height={36} />}
                            value="(+237) 694 75 05 09 / (+225) 072 070 4814"
                            title="Téléphone"
                            progress={{ color: 'success', value: 100 }}
                        />
                        <CWidgetStatsC
                            icon={<CIcon icon={cilLink} height={36} />}
                            value="www.gesco-app.com"
                            title="Site internet"
                            progress={{ color: 'white', value: 100 }}
                        />
                    </CCardGroup>
                </CRow>
            </CContainer>
            
            <AppFooter />
        </div>
    )
}

export default home