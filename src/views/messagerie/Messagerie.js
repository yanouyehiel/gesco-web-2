import { CCard, CCardBody, CCardHeader, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders, getUserStored } from '../../services/LocalStorage'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { dateParser } from '../../utils/functions'
import { getMessages, readMessage } from '../../services/MainControllerApi'
import { getInfoUser } from '../../services/UserController'
import Skeleton from 'react-loading-skeleton'


function Messagerie() {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const ecole = getEcoleStored()
  const user = getUserStored()
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({})
  const headers = getHeaders()
  const handleClose = () => setShow(false);
  const [emetteur, setEmetteur] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getMessages(ecole, user.id, headers).then((res) => {
      const filtered = res.filter(m => (m.receveur === null || m.receveur === user.id))
      setMessages(filtered)
      setLoading(false)
    })
  }, [])

  async function showName(emetteurId) {
    const nomComplet = await getUser(emetteurId);
    return nomComplet
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

  return (
    <CCard className='mb-4'>
      <CCardHeader>Messagerie</CCardHeader>
      <CCardBody>
        <CTable>
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
    </CCard>
  )
}

export default Messagerie