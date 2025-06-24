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
  CSpinner,
  CFormCheck,
  CFormLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDoor, cilEnvelopeLetter, cilFactory, cilFile, cilFlagAlt, cilGlobeAlt, cilInstitution, cilMap, cilPhone } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { addEcole, typesEtablissements } from '../../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import logo_noir from '../../../assets/images/logo_noir_sans_bg.png'
import logo_light from '../../../assets/images/logo_blanc.png'

const Register = () => {
  const [ecole, setEcole] = useState({})
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [theme, setTheme] = useState("")
  const fileInput = document.getElementById('logo');
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleChangeImage = () => {
    const selectedFile = fileInput.files[0]
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      toast.error('Veuillez sélectionner une image au format JPEG, PNG ou JPG.');
      fileInput.value = '';
    }
    ecole.logo = selectedFile
    console.log(ecole.logo)
  }

  useEffect(() => {
    const themeS = localStorage.getItem('gesco-theme')
    setTheme(themeS)
    getTypesEtablissement()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('logo', ecole.logo)
    formData.append('nom', ecole.nom)
    formData.append('pays', ecole.pays)
    formData.append('localisation', ecole.localisation)
    formData.append('ville', ecole.ville)
    formData.append('telephone', ecole.telephone)
    formData.append('email', ecole.email)
    formData.append('site_web', ecole.site_web)
    formData.append('type_etablissement_id', ecole.type_etablissement_id)
    
    await addEcole(formData).then((res) => {
      toast.success(res.message)
      setTimeout(() => {
        navigate("/save-director", {state: {ecole: res.data}})
      }, 2000)
    }, (error) => {
      toast.error(error.response.data.message)
    });
    setLoading(false)
  }

  async function getTypesEtablissement() {
    await typesEtablissements().then((res) => {
      setTypes(res)
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
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit} encType='multipart/form-data'>
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
                        required="true"
                        type='text'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilFlagAlt} />
                          </CInputGroupText>
                          <CFormInput 
                            placeholder="Pays" 
                            autoComplete="pays" 
                            onChange={handleChange} 
                            name="pays"
                            required="true"
                            type='text'
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilFactory} />
                        </CInputGroupText>
                        <CFormInput 
                          placeholder="Ville" 
                          autoComplete="ville" 
                          onChange={handleChange} 
                          name="ville"
                          required="true"
                          type='text'
                        />
                      </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPhone} />
                          </CInputGroupText>
                          <CFormInput 
                            placeholder="Téléphone" 
                            autoComplete="telephone" 
                            onChange={handleChange} 
                            name="telephone"
                            required="true"
                            type='text'
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilEnvelopeLetter} />
                          </CInputGroupText>
                          <CFormInput 
                            placeholder="Email" 
                            autoComplete="email" 
                            onChange={handleChange} 
                            name="email"
                            type='email'
                            //required="true"
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilMap} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Localisation" 
                        autoComplete="localisation" 
                        onChange={handleChange} 
                        name="localisation"
                        required="true"
                        type='text'
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilGlobeAlt} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Site internet" 
                        autoComplete="site_web" 
                        onChange={handleChange} 
                        name="site_web"
                        type='text'
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
                        required="true"
                      >
                        <option>{"Choisir le type d'établissement"}</option>
                        {types.map((type, i) => (
                          <option key={i} value={type.id}>{type.intitule}</option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <CFormLabel>Importer votre logo</CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilFile} />
                      </CInputGroupText>
                      <input 
                        type="file" 
                        className='form-control' 
                        name='logo' 
                        id='logo' 
                        accept='image/*'
                        onChange={handleChangeImage} 
                        required="true"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormCheck 
                        label="Acceptez nos termes et conditions d'utilisation" 
                        type='checkbox'
                        required="true" 
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
                              {loading ? 'Traitement...' : "Créer l'école"}
                            </CCol>
                          </CRow>
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="../login">
                          <CButton color="link" className="px-0">
                            Déjà membre ?
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

export default Register
