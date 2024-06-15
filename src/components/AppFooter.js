import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          Gesco
        </a>
        <span className="ms-1">&copy; 2024 Progiciel de gestion scolaire.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Développé par</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          Yehiel Yanou
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
