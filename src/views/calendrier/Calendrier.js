import { CCard, CCardBody, CCardHeader, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { addCalendar, getCalendars } from '../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { dateParserTime } from '../../utils/functions'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Titre',
    selector: row => row.titre,
    sortable: true
  },
  {
    name: "Date",
    selector: row => row.date,
    sortable: true
  },
]

function Calendrier() {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [calendar, setCalendar] = useState({})
  const [calendars, setCalendars] = useState([])
  const ecole = getEcoleStored()
  const headers = getHeaders()

  useEffect(() => {
      getAllCalendars().then(() => setLoading(false))
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
      e.preventDefault()
      setShowLoader(true)
      setLoading(true)
      calendar.ecole_id = ecole
      addCalendar(calendar, headers).then((res) => {
        setShowLoader(false)
        setShow(false)
        setLoading(false)
        toast.success(res.message)
        getAllCalendars().then(() => setLoading(false))
      })
  }

  async function getAllCalendars() {
      await getCalendars(ecole, headers).then(res => {
          setCalendars(res)
      })
  }

  const handleChange = ({currentTarget}) => {
      const {name, value} = currentTarget;
      setCalendar({...calendar, [name]: value})
  }

  return (
    <CCard className="mb-4">
      <ToastContainer />
        <CCardHeader>Calendrier de l'établissement</CCardHeader>
        <CCardBody>
            <Row>
              <Col>
                <Button className='text-white' onClick={handleShow}>Enregistrer une date</Button>
              </Col>
            </Row>
            <Row>
              <CTable>
                {loading ? <CSpinner color='primary' /> :
                  <DataTable
                    columns={columns}
                    data={calendars}
                    fixedHeader
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                  >
                  </DataTable>
                }
              </CTable>
            </Row>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Ajouter à votre calendrier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group>
                      <Form.Label>Entrer le titre</Form.Label>
                      <Form.Control type="text" name="titre" onChange={handleChange} required="true" />
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Form.Label>Entrer la date</Form.Label>
                      <input type="text" class="form-control" name="date" onChange={handleChange} required="true" />
                  </Form.Group>
                  <Button className='text-white mt-4' type='submit'>
                    {showLoader ? <CSpinner /> : 'Enregistrer'}
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Calendrier