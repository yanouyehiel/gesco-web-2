import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../services/AuthApi'
import { addItem, getItem } from '../../../services/LocalStorage'
import { ToastContainer, toast } from 'react-toastify'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const Login = () => {
  const [user, setUser] = useState({})
  const [theme, setTheme] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingC, setLoadingC] = useState(false)
  
  useEffect(() => {
    const themeS = localStorage.getItem('coreui-free-react-admin-template-theme')
    setTheme(themeS)

    const data = getItem('gesco')
    const json = JSON.parse(data)
    if (json.user) {
      navigate("/dashboard")
    } else {
      setLoading(false)
    }
  }, [])

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await login(user).then((res) => {
      if (res?.status_code === 401) {
        setLoading(false)
        toast.error(res.message)
      } else {
        if (res.user.role_id === 2 || res.user.role_id === 3) {
          toast.error("Vous n'êtes pas un administrateur de l'école.")
        } else if (res.user.role_id === 1) {
          if (res.user.ecole.bloque === 1) {
            toast.error("Désolé, votre école est pour l'instant bloquée.")
          } else if (res.user.ecole.bloque === 0) {
            addItem('gesco', JSON.stringify(res))
            navigate("/dashboard")
          }
        }
      }
    }, (error) => {
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error(error.response.data.message)
      }
    });
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={12}>
              <CSpinner color='primary' />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
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
                    <h1>Connexion</h1>
                    <p className="text-body-secondary">Connectez-vous à votre compte</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Email" 
                        autoComplete="username" 
                        onChange={handleChange} 
                        name="email"
                        type='email'
                        required='true'
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        onChange={handleChange} 
                        name="password"
                        required='true'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="text-white px-4" disabled={loadingC}>
                          {loadingC ? <CSpinner color='white' /> : 'Se connecter'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/password-forgot">
                          <CButton color="link" className="px-0">
                            Mot de passe oublié ?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>Créer votre école</h2>
                    <p>
                    Simplifiez votre gestion scolaire avec notre solution tout-en-un ! Créez dès maintenant le compte de votre établissement et découvrez comment notre logiciel peut révolutionner votre organisation administrative.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="text-white mt-3" active tabIndex={-1}>
                        Créez dès maintenant !
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
