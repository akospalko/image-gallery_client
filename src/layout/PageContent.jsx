// routes for pages
import React from 'react'
import Dashboard from '../components/Admin/Dashboard'
import MapOverview from '../components/MapOverview'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/User/Home'
import Authentication from '../components/User/Authentication/Authentication'
import {ROLES} from '../helper/userRoles'
import RequireAuth from '../components/User/Authentication/RequireAuth'

// set up context with role here
export default function PageContent({role}) {
  return (
    <> 
      {/* User */}
      <Routes>
      {/* public routes */}
      <Route path={'/'} element={ <Home/> } />
      <Route path={'/authentication'} element={ <Authentication /> } />
      {/* protected routes */}
        {/* <Route path={'/gallery'} element={ <Gallery/> } /> */}
        {/* <Route path={'/map'} element={ <Map/> } /> */}
        {/* <Route path={'*'} element={ <PageNotFound/> } />  */}
      </Routes>
      {/* Admin */}
      <Routes>
        {/* <Route path={'/admin/'} element={<Home role='admin'/>} /> */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/dashboard'} element={<Dashboard/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={'/admin/mapoverview'} element={<MapOverview/>}/>
        </Route>
        {/* <Route path={'*'} element={ <PageNotFound/> } /> */}
      </Routes>
    </>
  )
}
