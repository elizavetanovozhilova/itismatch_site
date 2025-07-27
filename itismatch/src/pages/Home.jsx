import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/home-layout.css'
import Illustration from '../assets/Illustration.svg'

function Home() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) {
      setUsername(storedName)
    }
  }, [])

  return (
    <div className="home-container">
      <img src="/logo.svg" alt="ItIsMatch Logo" style={{ height: '48px', width: 'auto' }} />
      <div className="header-buttons">
        {username ? (
          <>
            <span className="username">👤 {username}</span>
            <Link to="/profile"><button>Личный кабинет</button></Link>
            <Link to="/matches"><button>❤️ Мои мэтчи</button></Link>
            <button onClick={() => {
              localStorage.removeItem('username')
              setUsername(null)
            }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login"><button>Войти</button></Link>
            <Link to="/register"><button>Регистрация</button></Link>
          </>
        )}
      </div>

      <div className="main-layout">
        <div className="left-text">
          <h1>Добро пожаловать!</h1>
          <p>Найдите друзей, отношения или команду — всё в одном месте.</p>
          <Link to="/explore">
            <button className="explore-button">🔍 Найти людей</button>
          </Link>
        </div>

        <div className="right-image">
          <img src={Illustration} alt="Иллюстрация" style={{ width: '420px', height: '420px', objectFit: 'contain', marginLeft: '220px' }} />
        </div>
      </div>

      <div className="divider-vertical" />
      <div className="divider-horizontal" />
    </div>
  )
}

export default Home
