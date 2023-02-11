// routes for pages
import React from 'react'
import Dashboard from '../components/Admin/Dashboard'
import MapOverview from '../components/MapOverview'
import { Route, Routes } from 'react-router-dom'

export default function PageContent({role}) {
  return (
    <> 
      {/* User */}
        {/* <Route path={'/'} element={ <Home role='admin'/> } /> */}
        {/* <Route path={'/gallery'} element={ <Gallery/> } /> */}
        {/* <Route path={'/map'} element={ <Map/> } /> */}
        {/* <Route path={'*'} element={ <PageNotFound/> } />  */}

      {/* Admin */}
      <Routes>
        {/* <Route path={'/admin/'} element={<Home/>} /> */}
        <Route path={'/admin/dashboard'} element={<Dashboard/>} />
        <Route path={'/admin/mapoverview'} element={<MapOverview/>} />
        {/* <Route path={'*'} element={ <PageNotFound/> } />  */}
      </Routes>
    </>
  )
}
