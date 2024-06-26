import { cilArrowLeft, cilDoor, cilEnvelopeClosed, cilFactory, cilInstitution, cilMap, cilPhone, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CFormSelect, CImage, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { addDirecteur, addPersonne } from '../../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'

function SaveDirector() {
    const [director, setDirector] = useState({})
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState("")
    const { state } = useLocation(); 
    const [ecole, setEcole] = useState({})

    useEffect(() => {
        const themeS = localStorage.getItem('coreui-free-react-admin-template-theme')
        setTheme(themeS)
        setEcole(state.ecole);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        director.ecole_id = ecole.id;
        director.role_id = 1

        if (director.password.length < 8) {
            toast.error("Le mot de passe doit avoir au moins 8 caractères")
        } else {
            await addDirecteur(director).then((res) => {
                setLoading(false)
                toast.success(res.message)
                setTimeout(() => {
                    window.location.replace('../#/login')
                }, 3000)
            })
        }
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setDirector({...director, [name]: value})
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <ToastContainer />
            <CContainer>
                <CRow className="justify-content-center">
                <CCol md={8}>
                    <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                        <CForm onSubmit={handleSubmit}>
                            <h1><CIcon icon={cilArrowLeft} /></h1>
                            <p className="text-body-secondary">Enregistrez le responsable de votre établissement</p>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                </CInputGroupText>
                                <CFormInput 
                                    placeholder="Nom du directeur" 
                                    autoComplete="nom" 
                                    onChange={handleChange} 
                                    name="nom"
                                    type='text'
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                </CInputGroupText>
                                <CFormInput 
                                    placeholder="Prénom du directeur" 
                                    autoComplete="prenom" 
                                    onChange={handleChange} 
                                    name="prenom"
                                    type='text'
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                    <CIcon icon={cilEnvelopeClosed} />
                                </CInputGroupText>
                                <CFormInput 
                                    placeholder="Email du directeur" 
                                    autoComplete="email" 
                                    onChange={handleChange} 
                                    name="email"
                                    type='email'
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                    <CIcon icon={cilUser} />
                                </CInputGroupText>
                                <CFormInput 
                                    placeholder="Mot de passe du directeur" 
                                    autoComplete="password" 
                                    onChange={handleChange} 
                                    name="password"
                                    type='password'
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                    <CIcon icon={cilPhone} />
                                </CInputGroupText>
                                <CFormInput 
                                    placeholder="Téléphone du directeur" 
                                    autoComplete="telephone" 
                                    onChange={handleChange} 
                                    name="telephone"
                                    type='tel'
                                />
                            </CInputGroup>
                            <CRow>
                            <CCol xs={6}>
                                <CButton color="primary" type="submit" className="text-white px-4" disabled={loading}>
                                <CRow>
                                    {loading &&
                                    <CCol xs={3}>
                                        <CSpinner />
                                    </CCol>
                                    }
                                    <CCol xs={loading ? 9 : 12}>
                                    {loading ? 'Traitement...' : "Enregister"}
                                    </CCol>
                                </CRow>
                                </CButton>
                            </CCol>
                            <CCol xs={6} className="text-right">
                                <Link to="/login">
                                <CButton color="link" className="px-0">
                                    Déjà membre ?
                                </CButton>
                                </Link>
                            </CCol>
                            </CRow>
                        </CForm>
                        </CCardBody>
                    </CCard>
                    <CCard className="text-white bg-primary py-5" style={{ width: screen.availWidth > 800 && '44%' }}>
                        <CCardBody className="text-center">
                        <CImage 
                            align='center' 
                            fluid={true} 
                            src={theme !== 'light' ? '../src/assets/images/logo_noir_sans_bg.png' : '../src/assets/images/logo_blanc.png'} 
                        />
                        </CCardBody>
                    </CCard>
                    </CCardGroup>
                </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default SaveDirector