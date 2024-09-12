import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilStar,
  cilCash,
  cilDoor,
  cilMoney,
  cilClipboard,
  cilBook,
  cilContact,
  cilCheckCircle,
  cilAddressBook,
  cilColumns,
  cilCalendar,
  cilInstitution,
  cilPeople,
  cilUser,
  cilAudioDescription,
  cilHistory,
  cilSchool,
  cilEnvelopeLetter,
  cilCalendarCheck,
  cilGroup,
  cilObjectGroup,
  cilAvTimer,
  cilFile,
  cilLinkAlt,
  cilIndustry,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: "Gestion de l'établissement",
  },
  {
    component: CNavItem,
    name: 'Les salles de classe',
    to: '/classes',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les pensions',
    to: '/pensions',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les tarifs',
    to: '/tarifs',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les requêtes',
    to: '/documents',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les livres',
    to: '/livres',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion des enseignements',
  },
  {
    component: CNavItem,
    name: 'Les modules',
    to: '/modules-matieres',
    icon: <CIcon icon={cilObjectGroup} customClassName="nav-icon" />,
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Les matières',
    to: '/matieres',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les cours enseignés',
    to: '/lessons',
    icon: <CIcon icon={cilAudioDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les présences',
    to: '/presences',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les devoirs',
    to: '/devoirs',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion des évaluations',
  },
  {
    component: CNavItem,
    name: 'Les trimestres et séquences',
    to: '/trimestres-sequences',
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les notes',
    to: '/notes',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les bulletins',
    to: '/bulletins',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Le calendrier',
    to: '/calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion du personnel',
  },
  {
    component: CNavItem,
    name: 'Administration',
    to: '/administration',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Enseignants',
    to: '/teachers',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Elèves',
    to: '/students',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Parents',
    to: '/parents',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion de la communication',
  },
  {
    component: CNavItem,
    name: 'Emplois de temps',
    to: '/planning',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Planning',
    to: '/events',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Messagerie',
    to: '/messages',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
]

const _navUniversity = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: "Gestion de l'établissement",
  },
  {
    component: CNavItem,
    name: 'Les Départements',
    to: '/departements',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les Cursus',
    to: '/cursus',
    icon: <CIcon icon={cilLinkAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les filières',
    to: '/filieres',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les types de classe',
    to: '/type-classes',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les salles de classe',
    to: '/classes',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les pensions',
    to: '/pensions',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les tarifs',
    to: '/tarifs',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les requêtes',
    to: '/documents',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  /*{
    component: CNavItem,
    name: 'Les livres',
    to: '/livres',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },*/
  {
    component: CNavTitle,
    name: 'Gestion des enseignements',
  },
  {
    component: CNavItem,
    name: 'Les modules',
    to: '/modules-matieres',
    icon: <CIcon icon={cilObjectGroup} customClassName="nav-icon" />,
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Les matières',
    to: '/matieres',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les cours enseignés',
    to: '/lessons',
    icon: <CIcon icon={cilAudioDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les présences',
    to: '/presences',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  /*{
    component: CNavItem,
    name: 'Les devoirs',
    to: '/devoirs',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },*/
  {
    component: CNavTitle,
    name: 'Gestion des évaluations',
  },
  /*{
    component: CNavItem,
    name: 'Les trimestres et séquences',
    to: '/trimestres-sequences',
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
  },*/
  {
    component: CNavItem,
    name: 'Les notes',
    to: '/notes',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les procès verbaux',
    to: '/bulletins',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Le calendrier',
    to: '/calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion du personnel',
  },
  {
    component: CNavItem,
    name: 'Administration',
    to: '/administration',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Enseignants',
    to: '/teachers',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Etudiants',
    to: '/students',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Parents',
    to: '/parents',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion de la communication',
  },
  {
    component: CNavItem,
    name: 'Emplois de temps',
    to: '/planning',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Planning',
    to: '/events',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Messagerie',
    to: '/messages',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
]

export default [_nav, _navUniversity]
