import { CCard, CCardBody, CCardHeader, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { ToastContainer, toast } from 'react-toastify'
import { addEvent, getEvents, updateEvent } from '../../services/MainControllerApi'
import { Button, Form, Row, Modal, Col } from 'react-bootstrap'
import { dateParser, dateParserTime } from '../../utils/functions'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [showEvent, setShowEvent] = useState(false)
  const [event, setEvent] = useState({})
  const [eventM, setEventM] = useState({})
  const ecole = getEcoleStored()
  const headers = getHeaders()
  const [btnSubmit, setBtnSubmit] = useState(false)
  const [newData, setNewData] = useState({})
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    getAllEvents().then(() => setLoading(false))
  }, [])

  async function getAllEvents() {
    await getEvents(ecole, headers).then((res) => setEvents(res))
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setEvent({...event, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnSubmit(true)
    event.ecole_id = ecole
    setLoading(true)
    addEvent(event, headers).then((res) => {
      setLoading(false)
      setBtnSubmit(false)
      setShow(false)
      toast.success(res.message)
      getAllEvents((res) => {
        setEvents(res)
      })
    })
  }

  const showEventFunction = (data) => {
    setShowEvent(true)
    setEventM(data)
  }

  const handleClose = () => setShow(false)
  const handleCloseEvent = () => setShowEvent(false)
  const handleShow = () => setShow(true)
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleUpdate = (data) => {
    setNewData(data)
    handleShowUpdate()
  }

  const columns = [
    {
      name: 'Intitulé',
      selector: row => row.title,
      sortable: true
    },
    {
      name: "Description",
      selector: row => row.description,
      sortable: true
    },
    {
      name: "Date et heure de début",
      selector: row => dateParser(row.start),
      sortable: true
    },
    {
      name: 'Date et heure de fin',
      selector: row => dateParser(row.end),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => <CDropdown alignment="end">
        <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          <CIcon icon={cilOptions} style={{color: '#000'}} />
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => showEventFunction(row)}>Voir</CDropdownItem>
          <CDropdownItem onClick={() => handleUpdate(row)} style={{cursor: 'pointer'}}>Modifier</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    }
  ]

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      id: newData.id,
      title: event.title === undefined ? newData.title : event.title,
      description: event.description === undefined ? newData.description : event.description,
      start: event.start === undefined ? newData.start : event.start,
      end: event.end === undefined ? newData.end : event.end
    }
    await updateEvent(data, headers).then((res) => {
      toast.success(res)
      getAllEvents().then(() => setLoading(false))
      handleCloseUpdate()
    })
  }

  return (
    <CCard className='mb-4'>
      <ToastContainer />
        <CCardHeader>Evènements</CCardHeader>
        <CCardBody>
          <CTable>
            <CRow className="mb-3">
              <Col xs={4}>
              <Button onClick={handleShow} className='bg-primary text-white'>Ajouter un évènement</Button>
              </Col>
            </CRow>
            <CRow>
              {loading ? <CSpinner color='primary' /> :
                <div>
                  <DataTable
                    columns={columns}
                    data={events}
                    fixedHeader
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                  >
                  </DataTable>
                </div>
              }
            </CRow>
          </CTable>
        </CCardBody>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Enregistrement d'un évènement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Intitulé</Form.Label>
                      <Form.Control onChange={handleChange} name='title' type="text" className="form-control" required='true' />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Description</Form.Label>
                      <textarea row="3" class="form-control" name='description' onChange={handleChange} required></textarea>
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Date et heure de début</Form.Label>
                      <input type="datetime-local" class="form-control" name='start' onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="form-group mt-4">
                      <Form.Label className="control-label">Date et heure de fin</Form.Label>
                      <input type="datetime-local" class="form-control" name='end' onChange={handleChange} required />
                  </Form.Group>
                  <br/>
                  <Button size='lg' type='submit' className='text-white' disabled={btnSubmit ? true : false}>
                      {btnSubmit ? <CSpinner /> : 'Enregistrer'}
                  </Button>
              </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showEvent} onHide={handleCloseEvent}>
          <Modal.Header closeButton>
              <Modal.Title>{eventM.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{fontSize: '18px'}}>{eventM.description}</p>
            <p>Date et heure de début : <b>{dateParser(eventM.start)}</b></p>
            <p>Date et heure de fin : <b>{dateParser(eventM.end)}</b></p>
          </Modal.Body>
        </Modal>

        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Event : <b>{newData.title}</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleUpdateSubmit}>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Intitule</Form.Label>
                    <Form.Control onChange={handleChange} className="form-control" 
                      name="intitule" type="text"
                      placeholder={newData.title} />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Description</Form.Label>
                    <textarea row="3" class="form-control" name='description' 
                      onChange={handleChange} placeholder={newData.description}></textarea>
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Date et heure de début</Form.Label>
                    <input type="datetime-local" class="form-control" 
                      name='start' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="form-group mt-4">
                    <Form.Label className="control-label">Date et heure defin</Form.Label>
                    <input type="datetime-local" class="form-control" 
                      name='end' onChange={handleChange} />
                </Form.Group>
                <br/>
                <Button size='lg' type='submit' disabled={loading}>
                  {!loading ? 'Modifier' : 'Traitement...'}
                </Button>
              </Form>
          </Modal.Body>
        </Modal>
    </CCard>
  )
}

export default Events