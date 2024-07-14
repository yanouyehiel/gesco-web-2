import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CImage, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed } from '@coreui/icons';
import { resetPassword } from '../../../services/AuthApi';

function PasswordReset() {
    const [theme, setTheme] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const params = useParams();
    const navigation = useNavigate()

    useEffect(async () => {
        const themeS = localStorage.getItem('coreui-free-react-admin-template-theme')
        setTheme(themeS)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            password: password,
            password_confirmation: cpassword,
            email: params.email
        }
        if (password !== cpassword) {
            toast.error("Les mots de passe doivent être identiques")
            setLoading(false)
        } else {
            if (password.length < 8) {
                toast.error("Le mot de passe doit avoir au moins 8 caractères")
                setLoading(false)
            } else {
                await resetPassword(params, data).then((res) => {
                    toast.success(res.message)
                    setLoading(false)
                    setTimeout(() => {
                        navigation('/login');
                    }, 3000)
                }, (error) => {
                    toast.error(error.response.data.message)
                })
            }
        }
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
                                        <h3>Nouveau mot de passe</h3>
                                        <p className="text-body-secondary">Générer un nouveau mot de passe</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilEnvelopeClosed} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Entrer le mot de passe" 
                                                autoComplete="password"
                                                value={password}
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilEnvelopeClosed} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Confirmer le mot de passe" 
                                                autoComplete="cpassword"
                                                value={cpassword}
                                                type="password"
                                                onChange={(e) => setCpassword(e.target.value)}
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

export default PasswordReset