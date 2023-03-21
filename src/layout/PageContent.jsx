// routes for pages
import React from 'react'
import MapOverview from '../components/MapOverview'
import {Route, Routes} from 'react-router-dom'
import Home from '../components/User/Home'
import Gallery from '../components/User/Gallery'
import GalleryAdmin from '../components/Admin/Gallery'
import HomeAdmin from '../components/Admin/Home'
import {ROLES} from '../helper/userRoles'
import RequireAuth from '../components/Authentication/RequireAuth'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import useToggleModalScrollLock from '../components/hooks/useToggleModalScrollLock'
import {useAuthContext} from '../components/contexts/AuthenticationContext'

// set up context with role here
export default function PageContent() {
  // HOOK
  useToggleModalScrollLock();
  // CONTEXT
  const { auth } = useAuthContext();
  return (
    <> 
      {/* public routes */}
      {/* Unauth */}
      <Routes>
        {/* public routes */}
        <Route path={'/'} element={ <Home/> } />
        <Route path={'/login'} element={ <Login/> } />
        <Route path={'/register'} element={ <Register/> } />
      </Routes>
      {/* protected routes */}
      {/* User */}
      <Routes> 
         {/* gallery */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path={'/gallery'} element={ <Gallery/> } />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path={'/map'} element={<MapOverview/>}/>
        </Route>
        {/* user collection */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path={`/${auth.username}/collection`} element={ <Gallery isUserCollection={true} /> } />
        </Route>
        {/* <Route path={'/map'} element={ <Map/> } /> */}
      </Routes>
      {/* Admin */}
      <Routes>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/'} element={<HomeAdmin/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/gallery'} element={<GalleryAdmin/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/mapoverview'} element={<MapOverview/>}/>
        </Route>
        {/* <Route path={'*'} element={ <PageNotFound/> } /> */}
        {/* <Route path={'*'} element={ <PageNotFound/> } />  */}
      </Routes>
      {/* Shared??? */}
    </>
  )
}
