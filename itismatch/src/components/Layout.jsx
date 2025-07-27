import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100vh', background: 'var(--white)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
