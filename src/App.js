import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const EmailVerify = React.lazy(() => import('./views/pages/register/EmailVerify'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const SaveDirector = React.lazy(() => import('./views/pages/register/SaveDirector'))
const PasswordForgot = React.lazy(() => import('./views/pages/password/PasswordForgot'))
const PasswordReset = React.lazy(() => import('./views/pages/password/PasswordReset'))
const Home = React.lazy(() => import('./views/pages/home/home'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const [gesco, setGesco] = useState(null);

  useEffect(() => {
    const storedGesco = localStorage.getItem('gesco');
    const newData = JSON.parse(storedGesco)
    if (newData === null) {
      setGesco(newData);
      return <Route path="/login" element={<Navigate to="login" replace />} />
    }
  }, []);

  const protectedRoutes = [
    '/login',
    '/register',
    '/save-director',
    '/auth/email/verify/:email/:expires/:signature',
    '/password-forgot',
    '/auth/password/reset/:email/:expires/:signature',
  ];

  const checkGesco = (path) => {
    if (protectedRoutes.includes(path)) {
      if (gesco === null) {
        <Route path='/login' element={<Login />}/>;
      }
    }
    return <Route path={path} element={<DefaultLayout />}/>;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/save-director" element={<SaveDirector />}/>
          <Route exact path="/auth/email/verify/:email/:expires/:signature" element={<EmailVerify />}/>
          <Route exact path="/password-forgot" element={<PasswordForgot />}/>
          <Route exact path="/auth/password/reset/:email/:expires/:signature" element={<PasswordReset />}/>
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="*" name="Dashboard" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
