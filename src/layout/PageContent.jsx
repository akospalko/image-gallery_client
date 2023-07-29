// Routes for pages
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/User/Home'
import Gallery from '../components/User/Gallery'
import Collection from '../components/User/Collection'
import GalleryAdmin from '../components/Admin/Gallery'
import HomeAdmin from '../components/Admin/Home'
import MapOverview from '../components/Map/MapOverview'
import { ROLES } from '../helper/userRoles'
import RequireAuth from '../components/Authentication/RequireAuth'
import RequireUnauth from '../components/Authentication/RequireUnauth'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import useToggleModalScrollLock from '../components/hooks/useToggleModalScrollLock'
import { useAuthContext } from '../components/contexts/AuthenticationContext'
import PasswordResetSendEmailLink from '../components/Authentication/PasswordResetSendEmailLink'
import PasswordResetSaveNewPassword from '../components/Authentication/PasswordResetSaveNewPassword'
import ErrorPage from '../error/ErrorPage'
import Logout from '../components/Authentication/Logout'
import About from '../components/About/About'
import { ToastContainer } from 'react-toastify';
import { useThemeContext } from '../components/contexts/ThemeContext'

// set up context with role here
export default function PageContent() {
  // HOOK
  useToggleModalScrollLock();
  
  // CONTEXT
  const { auth } = useAuthContext();
  const { theme } = useThemeContext();

  return (
    <>
      <Routes>
        { /* public routes */ }
        { /* authentication routes */ }
        <Route element={ <RequireUnauth /> } >
          <Route path={ '/login' } element={ <Login /> } />
          <Route path={ '/register' } element={ <Register /> } />
          <Route path={ '/password-reset' } element={ <PasswordResetSendEmailLink /> } />
          <Route path={ '/password-forgot/:id/:token' } element={ <PasswordResetSaveNewPassword /> } />
        </ Route >
        { /* page routes */ }
        <Route path={ '/' } element={ <Home /> } />
        <Route path={ '/about' } element={ <About /> } />
        <Route path={ '*' } element={ <ErrorPage /> } />
        
        { /* user routes */ }
        <Route element={ <RequireAuth allowedRoles={ [ROLES.user] } /> }>
          <Route path={ `/${ auth.username }/gallery` } element={ <Gallery /> } />
          <Route path={ `/${ auth.username }/collection` } element={ <Collection /> } />
          <Route path={ `/${ auth.username }/mapoverview` } element={ <MapOverview /> } />
        </Route>
        
        { /* admin routes */ }
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/home'} element={<HomeAdmin />} />
          <Route path={`/admin/${auth.username}/gallery`} element={<GalleryAdmin />} />
          <Route path={'/admin/mapoverview'} element={<MapOverview />} />
        </Route>
        
        {/* shared routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.user]} />}>
          <Route path={`/${auth.username}/logout`} element={<Logout />} />
        </Route>
        
        {/* default route */}
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>

    {/* Toast */}
    <ToastContainer
        position="bottom-center"
        autoClose={ 5000 } 
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={ theme }
      />
    </>
  )
}