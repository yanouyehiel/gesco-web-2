import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer, dateFnsLocalizer   } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles';
import '../../../src/index.css'
import { getEvents } from '../../services/MainControllerApi';
import { getEcoleStored, getHeaders } from '../../services/LocalStorage';
import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';
import { dateParser, dateParserTime } from '../../utils/functions';

const localizer = momentLocalizer(moment)
//const localizer = dayjs('fr-FR')

function Planning() {
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({})
  const ecole = getEcoleStored()
  const headers = getHeaders()
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setEvent(e)
  }

  useEffect(() => {
    getAllEvents().then(() => setLoading(false))
  }, [])

  async function getAllEvents() {
    await getEvents(ecole, headers)
    .then((res) => {
      const data = res
      data.forEach(event => {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
      });
      setEvents(data)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  return (
    <CCard className='mb-4'>
        <CCardHeader>Emploi du temps</CCardHeader>
        <CCardBody>
          {loading ? <CSpinner color='primary' /> :
            <div>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: 500 }}
                onSelectEvent={(e) => handleShow(e)}
              />
            </div>
          }
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>{event.description}</p>
              <p>Date de début : <b>{dateParser(event.start)}</b></p>
              <p>Date de fin : <b>{dateParser(event.end)}</b></p>
          </Modal.Body>
        </Modal>
    </CCard>
  )
}

export default Planning