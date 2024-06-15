import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate, useNavigate } from 'react-router-dom'
import { getItem } from '../services/LocalStorage'

const DefaultLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const data = getItem('gesco')
    const json = JSON.parse(data)
    if (!json.user) {
      navigate("/login")
    }
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
