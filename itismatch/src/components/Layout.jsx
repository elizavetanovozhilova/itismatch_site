import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Layout() {
  const [toast, setToast] = useState(null)
  const toastTimeout = useRef(null)

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    if (!userId) return

    const fetchMatches = () => {
      fetch('https://lzznm.app.n8n.cloud/webhook/eb5fdb37-1fb8-4a17-bbe7-1098a592ec3c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
        .then(res => res.json())
        .then(newMatches => {
          const prevIds = JSON.parse(localStorage.getItem('matchIds') || '[]')
          const newIds = newMatches.map(u => u.user_id)
          const newOnes = newIds.filter(id => !prevIds.includes(id))
          if (prevIds.length && newOnes.length > 0) {
            setToast('У вас новый мэтч!')
            if (toastTimeout.current) clearTimeout(toastTimeout.current)
            toastTimeout.current = setTimeout(() => setToast(null), 4000)
          }
          localStorage.setItem('matchIds', JSON.stringify(newIds))
        })
    }
    fetchMatches()
    const interval = setInterval(fetchMatches, 30000)
    return () => {
      clearInterval(interval)
      if (toastTimeout.current) clearTimeout(toastTimeout.current)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100vh', background: 'var(--white)' }}>
      {toast && (
        <div className={`toast-notification show`}>
          <button className="toast-close-btn" onClick={() => setToast(null)} aria-label="Закрыть уведомление">×</button>
          {toast}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
