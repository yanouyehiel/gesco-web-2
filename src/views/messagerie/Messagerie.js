import { CCard, CCardBody, CCardHeader, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders, getUserStored } from '../../services/LocalStorage'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'
import { addMessage, getAllEmployes, getMessages, readMessage } from '../../services/MainControllerApi'
import { getInfoUser } from '../../services/UserController'
import Skeleton from 'react-loading-skeleton'
import { ToastContainer, toast } from 'react-toastify'


function Messagerie() {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const ecole = getEcoleStored()
  const user = getUserStored()
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({})
  const [messageUpdate, setMessageUpdate] = useState({})
  const headers = getHeaders()
  const handleClose = () => setShow(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => {
    getPersonnel().then()
    setShowMessage(true);
  }
  const [emetteur, setEmetteur] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [personnel, setPersonnel] = useState([])

  useEffect(() => {
    getMessages(ecole, user.id, headers).then((res) => {
      const filtered = res.filter(m => (m.receveur === null || m.receveur === user.id))
      setMessages(filtered)
      setLoading(false)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }, [])

  async function showName(emetteurId) {
    const nomComplet = await getUser(emetteurId);
    return nomComplet
  }

  async function getPersonnel() {
    await getAllEmployes(ecole, headers).then((res) => {
      const personnelFiltered = res.filter(p => p.role !== "Parent")
      setPersonnel(personnelFiltered)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  async function handleShow(mess, id) {
    setIsLoading(true);
    const nomComplet = await getUser(id);
    setEmetteur(nomComplet)
    setMessage(mess)
    setIsLoading(false);
    setShow(true)

    const data = {
      id: mess.id
    }
    setLoading(true)
    await readMessage(data, headers).then(() => {
      getMessages(ecole, user.id, headers).then((res) => {
        setMessages(res.filter(m => (m.receveur === null || m.receveur === user.id)))
        setLoading(false)
      })
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  const columns = [
    {
      name: 'Num',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Emetteur',
      selector: row => row.emetteur,
      sortable: true,
      cell: row => <Skeleton width={100} />
    },
    {
      name: 'Récepteur',
      selector: row => row.receveur === null ? 'Tout le monde' : 'Moi',
      sortable: true
    },
    {
      name: 'Contenu',
      selector: row => row.contenu.length > 30 ? row.contenu.substring(0, 30) + '...' : mes.contenu,
      sortable: true
    },
    {
      name: "Date d'envoi",
      selector: row => dateParser(row.created_at),
      sortable: true
    },
    {
      name: 'Action',
      selector: row => row.emetteur,
      cell: row => (
        <Button
          onClick={() => handleShow(row, row.emetteur)}
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : 'Voir'}
        </Button>
      )
    },
  ]

  async function getUser(id) {
    try {
      const res = await getInfoUser(id, headers);
      const emetteur = res;
      return emetteur.nom + ' ' + emetteur.prenom;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setMessageUpdate({...messageUpdate, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    messageUpdate.ecole_id = ecole
    messageUpdate.emetteur = user.id
    messageUpdate.receveur !== "NULL" && messageUpdate.receveur === parseInt(messageUpdate.receveur)
    await addMessage(messageUpdate, headers).then((res) => {
      toast.success(res.message)
      setLoading(false)
      handleCloseMessage()
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  return (
    <CCard className='mb-4'>
      <ToastContainer />
      <CCardHeader>Messagerie</CCardHeader>
      <CCardBody>
        <CTable>
          <CRow className="mb-3">
            <Col xs={4}>
              <Button onClick={handleShowMessage} className='bg-primary text-white'>Envoyer un message</Button>
            </Col>
          </CRow>
          <Row>
            {loading ? <CSpinner color='primary' /> :
              <DataTable
                columns={columns}
                data={messages}
                fixedHeader
                pagination
                selectableRowsHighlight
                highlightOnHover
              >
              </DataTable>
            }
          </Row>
        </CTable>
      </CCardBody>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Flash Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5><b>{emetteur}</b></h5>
          <p style={{fontSize: '18px'}}>{message.contenu}</p>
          <p>le <b>{dateParser(message.created_at)}</b> à <b>{message.receveur === null ? 'tout le monde' : 'moi'}</b></p>
        </Modal.Body>
      </Modal>

      <Modal show={showMessage} onHide={handleCloseMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Enregistrer un message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Choisissez le destinataire</Form.Label>
                <Form.Select className="form-control" name='receveur' onChange={handleChange} required>
                  <option>-- choisir --</option>
                  <option value="NULL">A tout le monde</option>
                    {personnel.map((personne, index) => (
                        <option key={index} value={personne.id}>{personne.nom +' '+ personne.prenom}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="form-group mt-4">
                <Form.Label className="control-label">Entrer le message</Form.Label>
                <textarea row="3" class="form-control" name='contenu' onChange={handleChange} required></textarea>
            </Form.Group>
            <br/>
            <Button size='lg' type='submit' className='text-white' disabled={loading}>
                {loading ? <CSpinner /> : 'Envoyer'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </CCard>
  )
}

export default Messagerie