import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/auth.css'

function Home() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) {
      setUsername(storedName)
    }
  }, [])

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <div>It Is Match</div>
        <div>
          {username ? (
            <>
            <span>👤 {username}</span>
            <Link to="/profile">
              <button style={{ marginLeft: '1rem' }}>Личный кабинет</button>
            </Link>
            <button style={{ marginLeft: '1rem' }} onClick={() => {
              localStorage.removeItem('username')
              setUsername(null)
            }}>
              Выйти
            </button>
          </>
          
            
          ) : (
            <>
              <Link to="/login">
                <button>Войти</button>
              </Link>
              <Link to="/register" style={{ marginLeft: '1rem' }}>
                <button>Регистрация</button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <h1>Добро пожаловать на платформу знакомств и поиска тиммейтов!</h1>
        <p>Найдите друзей, отношения или команду — всё в одном месте.</p>
      </main>
    </div>
  )
}

export default Home
