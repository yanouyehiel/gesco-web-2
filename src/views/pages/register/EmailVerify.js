import { cilCheckAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CImage, CRow, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { verify } from '../../../services/AuthApi';
import { ToastContainer, toast } from 'react-toastify';

function EmailVerify() {
    const params = useParams();
    const [theme, setTheme] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const themeS = localStorage.getItem('coreui-free-react-admin-template-theme')
        setTheme(themeS)

        await verify(params).then((res) => {
            setLoading(false)
            toast.success(res?.message)
        }, (err) => {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        })
    }, [])

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <ToastContainer />
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    {loading ? <CSpinner /> :
                                        <>
                                            <CIcon icon={cilCheckAlt} width={100} style={{color: '#48BB8C'}} />
                                            <p>La confirmation de votre compte s'est bien passée. Vous pouvez accéder maintenant à votre compte</p>
                                            <Link to="/login">
                                                <CButton color="primary" className="text-white mt-3" active tabIndex={-1}>
                                                    Se connecter !
                                                </CButton>
                                            </Link>
                                        </>
                                    }
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
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

export default EmailVerify