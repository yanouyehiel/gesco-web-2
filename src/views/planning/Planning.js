import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'
import { Calendar, momentLocalizer  } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles';
import '../../../src/index.css'

const localizer = momentLocalizer(moment)

function Planning() {
  return (
    <CCard className='mb-4'>
        <CCardHeader>Emploi du temps</CCardHeader>
        <CCardBody>
          <div>
            <Calendar
              localizer={localizer}
              //events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={({start, end}) => {
                console.log(start)
              }}
            />
          </div>
        </CCardBody>
    </CCard>
  )
}

export default Planning