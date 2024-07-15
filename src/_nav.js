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
  cilCalendarCheck
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    badge: {
      color: 'info',
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
    name: 'Les notes',
    to: '/notes',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
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
  /*{
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },*/
]

export default _nav
