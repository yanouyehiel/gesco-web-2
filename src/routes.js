import { element } from 'prop-types'
import React from 'react'

const TypeClasses = React.lazy(() => import('./views/type_classes/TypeClasses'))
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
const Groupes = React.lazy(() => import('./views/groupes_matiere/Groupes'))
const Bulletins = React.lazy(() => import('./views/bulletins/Bulletins'))
const TrimestreSequences = React.lazy(() => import('./views/trimestres_sequences/TrimestreSequences'))
const Filieres = React.lazy(() => import('./views/filieres/Filieres'))
const Curcus = React.lazy(() => import('./views/cursus/Cursus'))
const Departements = React.lazy(() => import('./views/departements/Departements'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard' },
  { path: '/type-classes', name: 'Type Classes', element: TypeClasses },
  { path: '/classes', name: 'Classes', element: Classes },
  { path: '/classes/:id', name: 'Classe', element: ViewClasse },
  { path: '/pensions', name: 'Pensions', element: Pensions },
  { path: '/tarifs', name: 'Tarifs', element: Tarifs },
  { path: '/documents', name: 'Requêtes', element: Documents },
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
  { path: '/students/:id', name: "Voir l'élève", element: ViewEleve },
  { path: '/parents', name: 'Parents', element: Parents },
  { path: '/planning', name: 'Emploi du temps', element: Planning },
  { path: '/events', name: 'Evènements', element: Events },
  { path: '/messages', name: 'Messagerie', element: Messagerie },
  { path: '/modules-matieres', name: 'Groupes de matières', element: Groupes },
  { path: '/bulletins', name: 'Gestion des bulletins', element: Bulletins },
  { path: '/trimestres-sequences', name: 'Gestion des trimestres et séquences', element: TrimestreSequences },
  { path: '/filieres', name: "Filières", element: Filieres},
  { path: '/cursus', name: "Cursus", element: Curcus },
  { path: '/departements', name: "Départements", element: Departements }
]

export default routes
