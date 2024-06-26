import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/4.jpg'
import { getEcoleStored, getHeaders, getUserStored, removeItem } from '../../services/LocalStorage'
import { getDocumentsAsked, getMessages } from '../../services/MainControllerApi'
import { ToastContainer, toast } from 'react-toastify'
import { logout } from '../../services/AuthApi'

const AppHeaderDropdown = () => {
  const [notifs, setNotifs] = useState([])
  const [messages, setMessages] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const user = getUserStored()

  useEffect(() => {
    getMessagesEcole().then()
    getDocuments().then()
  }, [])

  async function getMessagesEcole() {
    await getMessages(ecole_id, user.id, headers).then((res) => {
      const filtered = res.filter(m => (m.receveur === null || m.receveur === user.id))
      setMessages(filtered)
    })
  }

  async function getDocuments() {
    await getDocumentsAsked(ecole_id, headers).then((res) => {
        setNotifs(res)
    })
  }

  async function deconnexion() {
    try {
      toast.success('Déconnexion en cours...')
      logout(headers).then((res) => {
        toast.success(res.message)
        removeItem('gesco')
        setTimeout(() => {
          window.location.replace('../#/login')
        }, 2000)
      })
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <CDropdown variant="nav-item">
      <ToastContainer />
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Mon compte</CDropdownHeader>
        <CDropdownItem href="../#/documents">
          <CIcon icon={cilBell} className="me-2" />
            Notifications
          <CBadge color="info" className="ms-2">
            {notifs.length}
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="../#/messages">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Messages
          <CBadge color="success" className="ms-2">
            {messages.length}
          </CBadge>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Paramètres</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Mon Profile
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem onClick={deconnexion} style={{cursor: 'pointer'}} className='bg-danger text-white'>
          <CIcon icon={cilLockLocked} className="me-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
      <ToastContainer />
    </CDropdown>
  )
}

export default AppHeaderDropdown
