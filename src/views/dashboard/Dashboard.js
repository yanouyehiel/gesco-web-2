import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilCloudDownload, cilPeople} from '@coreui/icons'
import avatar from './../../assets/images/user1.jpg'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getFeesEcole } from '../../services/MainControllerApi'
import { dateParser } from '../../utils/functions'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import WidgetsBrand from '../widgets/WidgetsBrand'
import MainChart from "./MainChart"

const Dashboard = () => {
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [fees, setFees] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeesSchool().then(() => setLoading(false))
  }, [])

  async function getFeesSchool() {
    await getFeesEcole(ecole_id, headers).then((res) => setFees(res))
  }

  return (
    <>
      <CRow>
        {loading && <CSpinner color='primary' className='mx-4 mb-4' />}
        {fees && <WidgetsDropdown 
            className="mb-4" 
            nbDirecteurs={fees.nb_directeurs}
            nbAdmins={fees.nb_admins} 
            nbTeachers={fees.nb_teachers} 
            nbParents={fees.nb_parents} 
            nb_students={fees.nb_students} 
          />
        }
        {/* {fees?.nb_events && <WidgetsBrand className="mb-4" withCharts events={fees?.nb_events} />} */}
      </CRow>
      <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">Trafic financier</h4>
              <div className="small text-body-secondary">Tous les mois de l'année</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Jour', 'Semaine', 'Mois'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Jour'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart ecole_id={ecole_id} headers={headers} />
        </CCardBody>
        {/* <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter> */}
      </CCard>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Paiements effectués aujourd'hui</CCardHeader>
            <CCardBody>
              {(fees?.paiements_today && !loading) ? <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Noms</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Code
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">intitulé</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Montant
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Payé le</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {fees?.paiements_today.length > 0 ? fees?.paiements_today.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={avatar} /*status={item.avatar.status}*/ />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.nom_student + ' ' + item.prenom_student}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.code}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.intitule}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.montant} FCFA</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Date paiement</div>
                        <div className="fw-semibold text-nowrap">{dateParser(item.created_at)}</div>
                      </CTableDataCell>
                    </CTableRow>
                  )) : <p className="text-center">Auncun paiement effectué aujourd'hui</p>}
                </CTableBody>
              </CTable> : <CSpinner color='primary' />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
