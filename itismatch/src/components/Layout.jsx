import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
