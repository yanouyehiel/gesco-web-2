import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CImage, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed } from '@coreui/icons';
import { sendLinkResetPassword } from '../../../services/AuthApi';
import logo_noir from '../../../assets/images/logo_noir_sans_bg.png'
import logo_light from '../../../assets/images/logo_blanc.png'

function PasswordForgot() {
    const [theme, setTheme] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")

    useEffect(() => {
        const themeS = localStorage.getItem('gesco-theme')
        setTheme(themeS)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await sendLinkResetPassword({email: email}).then((res) => {
            setLoading(false)
            toast.success(res.message)
        }, (error) => {
            setLoading(false)
            toast.error(error.response.data.message)
        })
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
                                        <h3>Mot de passe oublié</h3>
                                        <p className="text-body-secondary">Générer un nouveau mot de passe</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilEnvelopeClosed} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Entrer votre email" 
                                                autoComplete="email"
                                                value={email}
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton color="primary" type="submit" className="text-white px-4" disabled={loading}>
                                                        {loading ? 'Traitement...' : 'Envoyer'}
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={6} className="text-right">
                                                    <Link to="/login">
                                                        <CButton color="link" className="px-0">
                                                            connectez-vous
                                                        </CButton>
                                                    </Link>
                                                </CCol>
                                            </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" /*style={{ width: screen.availWidth > 800 && '44%' }}*/>
                                <CCardBody className="text-center">
                                    <CImage 
                                        align='center'
                                        height={150}
                                        width={150} 
                                        fluid={true} 
                                        src={theme !== 'light' ? logo_noir : logo_light} 
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

export default PasswordForgot