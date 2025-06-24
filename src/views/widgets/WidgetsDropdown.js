import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { getEcoleStore } from '../../services/LocalStorage'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const ecole = getEcoleStore()

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {props.nb_students}
            </>
          }
          title={ecole.type_etablissement_id==3?"Nombre d'étudiants":"Nombre d'élèves"}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {props.nbDirecteurs}
            </>
          }
          title="Directeurs"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {props.nbAdmins}
            </>
          }
          title="Nombre d'administrateurs"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              {props.nbTeachers}
            </>
          }
          title="Nombre d'enseignants"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {props.nbParents}
            </>
          }
          title="Nombre de parents"
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
  nbDirecteurs: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  nbTeachers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  nbParents: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  nbAdmins: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  nb_students: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default WidgetsDropdown
