// routes for pages
import React from 'react'
import Gallery from '../components/Admin/Gallery'
import MapOverview from '../components/MapOverview'
import {Route, Routes} from 'react-router-dom'
import Home from '../components/User/Home'
import HomeAdmin from '../components/Admin/Home'
import {ROLES} from '../helper/userRoles'
import RequireAuth from '../components/Authentication/RequireAuth'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import useToggleModalScrollLock from '../components/hooks/useToggleModalScrollLock'

// set up context with role here
export default function PageContent({role}) {
  // HOOK
  useToggleModalScrollLock();
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
        {/* <Route path={'/gallery'} element={ <Gallery/> } /> */}
        {/* <Route path={'/map'} element={ <Map/> } /> */}
        {/* <Route path={'*'} element={ <PageNotFound/> } />  */}
      </Routes>
      {/* Admin */}
      <Routes>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/'} element={<HomeAdmin/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/gallery'} element={<Gallery/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/mapoverview'} element={<MapOverview/>}/>
        </Route>
        {/* <Route path={'*'} element={ <PageNotFound/> } /> */}
      </Routes>
      {/* Shared??? */}
    </>
  )
}
