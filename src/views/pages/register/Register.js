import React, { useEffect, useState } from 'react'
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
  CImage,
  CFormSelect,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBank, cilDoor, cilFactory, cilInstitution, cilLockLocked, cilMap, cilUser } from '@coreui/icons'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { addEcole, typesEtablissements } from '../../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const [ecole, setEcole] = useState({})
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [theme, setTheme] = useState("")


  useEffect(() => {
    const themeS = localStorage.getItem('coreui-free-react-admin-template-theme')
    setTheme(themeS)
    getTypesEtablissement()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(ecole)

    await addEcole(ecole).then((res) => {
      toast.success(res.message)
      setLoading(false)
      setTimeout(() => {
        navigate("/save-director", {state: {ecole: res.data}})
      }, 4000)
    }, (err) => {
      toast.error(err.response.data.message)
    });
  }

  async function getTypesEtablissement() {
    await typesEtablissements().then((res) => {
      setTypes(res)
      console.log(res)
      setLoading(false)
    })
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setEcole({...ecole, [name]: value})
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
                    <h1>Inscription</h1>
                    <p className="text-body-secondary">Enregistrez votre établissement</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilInstitution} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Nom de l'école" 
                        autoComplete="nom" 
                        onChange={handleChange} 
                        name="nom"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilFactory} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Ville" 
                        autoComplete="ville" 
                        onChange={handleChange} 
                        name="ville"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilMap} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Localisation" 
                        autoComplete="localisation" 
                        onChange={handleChange} 
                        name="localisation"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilDoor} />
                      </CInputGroupText>
                      <CFormSelect 
                        aria-label="Default select example" 
                        autoComplete="type_etablissement_id" 
                        name="type_etablissement_id"
                        onChange={handleChange} 
                      >
                        <option>Sélectionnner une classe</option>
                        {types.map((type, i) => (
                          <option key={i} value={type.id}>{type.intitule}</option>
                        ))}
                      </CFormSelect>
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
                              {loading ? 'Traitement...' : "Créer l'école"}
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

export default Register
