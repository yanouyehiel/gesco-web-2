import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Classes = React.lazy(() => import('./views/classes/Classes'))
const ViewClasse = React.lazy(() => import('./views/classes/Classe'))
const Pensions = React.lazy(() => import('./views/pensions/Pensions'))
const Tarifs = React.lazy(() => import('./views/tarifs/Tarifs'))
const Documents = React.lazy(() => import('./views/documents/Documents'))
const Livres = React.lazy(() => import('./views/livres/Livres'))
const Matieres = React.lazy(() => import('./views/matieres/Matieres'))
const Cours = React.lazy(() => import('./views/cours/Cours'))
const Presences = React.lazy(() => import('./views/presences/Presences'))
const Devoirs = React.lazy(() => import('./views/devoirs/Devoirs'))
const Notes = React.lazy(() => import('./views/notes/Notes'))
const Calendrier = React.lazy(() => import('./views/calendrier/Calendrier'))
const Administration = React.lazy(() => import('./views/administration/Administration'))
const Enseignants = React.lazy(() => import('./views/enseignants/Enseignants'))
const Eleves = React.lazy(() => import('./views/eleves/Eleves'))
const ViewEleve = React.lazy(() => import('./views/eleves/ViewEleve'))
const Parents = React.lazy(() => import('./views/parents/Parents'))
const Planning = React.lazy(() => import('./views/planning/Planning'))
const Events = React.lazy(() => import('./views/events/Events'))
const Messagerie = React.lazy(() => import('./views/messagerie/Messagerie'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/classes', name: 'Classes', element: Classes },
  { path: '/classes/:id', name: 'Classe', element: ViewClasse },
  { path: '/pensions', name: 'Pensions', element: Pensions },
  { path: '/tarifs', name: 'Tarifs', element: Tarifs },
  { path: '/documents', name: 'Documents', element: Documents },
  { path: '/livres', name: 'Livres', element: Livres },
  { path: '/matieres', name: 'Matières', element: Matieres },
  { path: '/lessons', name: 'Cours', element: Cours },
  { path: '/presences', name: 'Présences', element: Presences },
  { path: '/devoirs', name: 'Devoirs', element: Devoirs },
  { path: '/notes', name: 'Notes', element: Notes },
  { path: '/calendar', name: 'Calendrier', element: Calendrier },
  { path: '/administration', name: 'Administration', element: Administration },
  { path: '/teachers', name: 'Enseignants', element: Enseignants },
  { path: '/students', name: 'Elèves', element: Eleves },
  { path: '/students/:id', name: 'Elèves', element: ViewEleve },
  { path: '/parents', name: 'Parents', element: Parents },
  { path: '/planning', name: 'Emploi du temps', element: Planning },
  { path: '/events', name: 'Evènements', element: Events },
  { path: '/messages', name: 'Messagerie', element: Messagerie },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
